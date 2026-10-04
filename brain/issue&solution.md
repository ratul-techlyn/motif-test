# Issues & Solutions

Log of problems hit while moving the site from prerender.io to our own pre-render service (`D:\MOTIF\pre-render-v02\web-app`, deployed at `https://pre-render-seven.vercel.app`). See `brain/SETUP.md` for how the service works.

---

## 1. Switch from prerender.io to our pre-render service

**Issue**
Bot traffic went to prerender.io with a token hardcoded in `src/lib/prerender-middleware.ts`, and a 500 ms timeout that failed any page not already cached.

**Solution**
Rewrote `src/lib/prerender-middleware.ts` to follow SETUP.md (Option A):
- Calls `${PRERENDER_URL}/api/render?url=<encoded page URL>` with header `x-api-key: PRERENDER_API_KEY`, 25 s timeout.
- Bot detection = SETUP.md bot regex **or** `isbot()` (note: the export is `isbot`, lowercase. `isBot` does not exist in isbot v5).
- Skips: requests with `X-Render-Request` (our own headless browser, prevents a render loop), non-GET, `/api`, `/_next`, any path with a file extension, and dev tools (Lighthouse, Playwright, etc.).
- Serves `200`, `404` and `410` from the service with the real status; any other error or a timeout falls back to the normal page.
- Passes `X-Render-Cache` (HIT/MISS) through; `X-Prerendered: true/false` shows which path ran.
- Removed the hardcoded prerender.io token.

Env vars (local `.env` and the server/Vercel env, `deploy.sh` does not copy `.env`):
```
PRERENDER_URL=https://pre-render-seven.vercel.app
PRERENDER_API_KEY=<key from the dashboard>
```

---

## 2. Service received `localhost:3333` instead of the real URL

**Issue**
The site runs behind a reverse proxy on port 3333, so `request.url` is `http://localhost:3333/...`. The service refuses private addresses (`400 BLOCKED_ADDRESS`).

**Solution**
`getPublicUrl()` rebuilds the URL from `X-Forwarded-Host` and `X-Forwarded-Proto`. The proxy (nginx) must send these headers (or the correct `Host`).

---

## 3. `PRERENDER_URL` with a trailing slash → `308` redirect

**Issue**
`PRERENDER_URL=https://pre-render-seven.vercel.app/` produced `//api/render`, which Vercel answers with a `308` redirect.

**Solution**
The middleware strips trailing slashes from `PRERENDER_URL`. Prefer setting it without the slash anyway.

---

## 4. GitHub push blocked: Resend API key in history

**Issue**
`git push` to `ratul-techlyn/motif-test` was rejected by GitHub Push Protection. Two local commits (`b712475`, `b44b45f`) had the Resend key hardcoded in `src/app/api/email/route.ts`. The current file was already clean (`process.env.RESEND_API_KEY`).

**Solution**
The remote was empty, so the local commits were replaced with one clean commit built from the current files:
```bash
git branch backup-before-secret-fix
NEW=$(git commit-tree "HEAD^{tree}" -m "first commit")
git reset --soft "$NEW"
git log -p | grep -c "re_[A-Za-z0-9]\{8,\}"   # must print 0
git push -u origin main
```
- Do **not** use GitHub's "allow the secret" link, it publishes the key.
- Rotate the Resend key (new key in Resend → update `.env` locally and on the server → delete the old key).
- Rule: secrets only in `.env` (already in `.gitignore`), never as a fallback value in code.

---

## 5. Vercel: "Vulnerable version of Next.js detected"

**Issue**
Site was on Next.js 15.5.2, which has known security vulnerabilities.

**Solution**
Upgraded to the latest 15.5 patch (no code changes needed):
```bash
npm install next@15.5.27 eslint-config-next@15.5.27
```
Commit both `package.json` and `package-lock.json`. Other `npm audit` findings (mostly build tooling, plus `sharp` and `swiper`) are still open; fixing them needs `npm audit fix --force`, which may bring major-version updates.

---

## 6. Pre-render service returns `500` on `/api/render`

**Symptoms**
- Site log: `Prerender request failed with status: 500`.
- Even a request **without a key** returned `500` with an empty body (should be `401 MISSING_KEY`), so the function crashed while loading, before the handler ran.
- `/api/keys` worked, so MongoDB was fine.
- Not a CORS problem: CORS only applies to browsers, and the middleware calls the service server-to-server.
- Vercel log:
  ```
  Error: Failed to load external module playwright-...: Error: Cannot find module
  '/var/task/node_modules/playwright-core/browsers.json'
  ```

**Cause**
1. The full `playwright` package expects a browser downloaded with `npx playwright install`, which doesn't exist in a Vercel function.
2. Vercel's file tracing doesn't include `playwright-core/browsers.json` (loaded by a computed path), so the module fails to load.

**Solution** (in `D:\MOTIF\pre-render-v02\web-app`)
- Packages, pinned to matching versions (both use Chromium 153):
  - `playwright-core@1.63.0` and `@sparticuz/chromium@153.0.0` (serverless Chromium) in dependencies
  - `playwright@1.63.0` moved to devDependencies (only for local browser install)
- `src/lib/renderer.ts`: on Vercel (`process.env.VERCEL`) launch with `@sparticuz/chromium` (`args` + `executablePath()`); locally launch the browser installed by `npx playwright install chromium`.
- `next.config.ts`:
  ```ts
  serverExternalPackages: ["@sparticuz/chromium", "playwright-core"],
  outputFileTracingIncludes: {
    "/api/render": [
      "./node_modules/playwright-core/**/*",
      "./node_modules/@sparticuz/chromium/bin/**/*",
    ],
  },
  ```
- `src/app/api/render/route.ts`: `export const maxDuration = 60;` (a cache MISS starts Chromium and renders for up to 20 s).
- Vercel project settings: **Node.js 22.x or newer** (`@sparticuz/chromium` 153 needs Node 22.17+); `MONGODB_URI` and `MONGODB_DB` set.

When upgrading Playwright, upgrade `@sparticuz/chromium` to the matching Chromium major version (check `node_modules/playwright-core/browsers.json` → `browserVersion`).

---

## How to test as a bot

Use `curl.exe` in PowerShell (`curl` is an alias for `Invoke-WebRequest`).

```powershell
# Service directly. No key → expect 401 MISSING_KEY (proves the route loads)
curl.exe -i "https://pre-render-seven.vercel.app/api/render?url=https://example.com"

# Service with key → 200, X-Render-Cache: MISS first, HIT after
curl.exe -i -H "x-api-key: YOUR_KEY" "https://pre-render-seven.vercel.app/api/render?url=https://wemotif.com/"

# Site as Googlebot → X-Prerendered: true
curl.exe -s -D - -o NUL -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://wemotif.com/

# Site as a browser → X-Prerendered: false
curl.exe -s -D - -o NUL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36" https://wemotif.com/
```

Notes:
- Plain `curl` without `-A` counts as a bot (`isbot` matches it), so always pass a browser User-Agent for the "normal visitor" check.
- `X-Prerendered: false` + `X-Bot-Detected: true` = bot detected but the service failed; check the service logs.
- Locally, the service refuses `localhost` URLs. Send `-H "X-Forwarded-Host: wemotif.com" -H "X-Forwarded-Proto: https"` so the middleware asks for the live page.
- Other checks: Chrome DevTools → Network conditions → User agent "Googlebot"; Google Search Console → URL Inspection → Test live URL.
- Prefer the `x-api-key` header over `?key=` in the URL so the key doesn't end up in logs or screenshots.
