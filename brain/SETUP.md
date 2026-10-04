# Setup Guide: Using Your API Key

This guide shows how to send crawler traffic from your website to the pre-render service, using the API key you created in the dashboard.

> Keep your key secret. Put it in an environment variable such as `PRERENDER_API_KEY`, never in browser code or a public repo. The examples below use `YOUR_API_KEY` as a placeholder.

---

## 1. How it works

```text
Visitor ──▶ your site
              │
              ├─ human?  → serve your normal app (nothing changes)
              │
              └─ crawler? → GET {SERVICE}/api/render?url=<full page URL>
                              header  x-api-key: YOUR_API_KEY
                            ← static HTML (no JavaScript)
```

- The **first** request for a URL renders the page in a headless browser and caches it (`X-Render-Cache: MISS`, a few seconds).
- **Every later** request for that URL comes from the cache (`X-Render-Cache: HIT`, milliseconds).
- To refresh a page, delete it in the dashboard under **Cached pages**. The next request renders it again.

`{SERVICE}` is where the service runs: `http://localhost:3000` locally, or your deployed URL.

---

## 2. Start the service

```bash
cd web-app
npm install
npx playwright install chromium      # one-time
# set MONGODB_URI and MONGODB_DB in web-app/.env
npm run dev                          # or: npm run build && npm start
```

---

## 3. Test your key

```bash
curl -i -H "x-api-key: YOUR_API_KEY" \
  "http://localhost:3000/api/render?url=https://quotes.toscrape.com/js/"
```

Run it twice. The first response has `X-Render-Cache: MISS`, the second has `X-Render-Cache: HIT`. The page then shows up in the dashboard under your key.

For a quick check in the browser, you can also pass the key as a query parameter:
`http://localhost:3000/api/render?key=YOUR_API_KEY&url=https://example.com`
Use the header in real integrations so the key doesn't end up in logs.

**URL rules**
- Send the **full absolute URL**, including `https://`.
- URL-encode it when it has its own query string: `url=https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dshoes`.
- `#fragments` are ignored. Different query strings are cached as different pages.

---

## 4. Connect your website

Every integration follows the same four rules:

1. **Only forward crawlers.** Match the `User-Agent` against a bot list (below).
2. **Only forward page requests**, not `.js`, `.css`, images or `/api` calls.
3. **Skip requests that carry `X-Render-Request: 1`.** That header is our own headless browser loading your page. Forwarding it back to us would create a loop.
4. **Fall back to your normal page** if we return an error (`4xx` except 404/410, or `5xx`) or don't respond in time.

Bot pattern used in the examples:

```text
googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|applebot|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexitybot|ccbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot
```

### Option A: Next.js (v16, `proxy.ts`)

Create `proxy.ts` at the root of your Next.js app (next to `app/`). In Next.js 15 and older, name it `middleware.ts` and export `middleware` instead of `proxy`.

```ts
import { NextResponse, type NextRequest } from "next/server";

const BOTS = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|applebot|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexitybot|ccbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot/i;
const SERVICE = process.env.PRERENDER_URL!;      // e.g. https://render.yourdomain.com
const KEY = process.env.PRERENDER_API_KEY!;

export async function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (!BOTS.test(ua) || request.headers.get("x-render-request")) return NextResponse.next();

  try {
    const res = await fetch(`${SERVICE}/api/render?url=${encodeURIComponent(request.url)}`, {
      headers: { "x-api-key": KEY },
      signal: AbortSignal.timeout(25_000),
    });
    if (res.ok || res.status === 404 || res.status === 410) {
      return new Response(res.body, {
        status: res.status,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  } catch {}
  return NextResponse.next(); // fallback: normal page
}

export const config = {
  // pages only: skip Next internals, API routes and files with an extension
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Option B: Node / Express

Put this **before** your static files and SPA handler.

```js
const BOTS = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|applebot|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexitybot|ccbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot/i;

app.use(async (req, res, next) => {
  const isPage = req.method === "GET" && !/\.[a-z0-9]+$/i.test(req.path) && !req.path.startsWith("/api");
  if (!isPage || !BOTS.test(req.get("user-agent") || "") || req.get("x-render-request")) return next();

  const pageUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  try {
    const r = await fetch(`${process.env.PRERENDER_URL}/api/render?url=${encodeURIComponent(pageUrl)}`, {
      headers: { "x-api-key": process.env.PRERENDER_API_KEY },
      signal: AbortSignal.timeout(25000),
    });
    if (r.ok || r.status === 404 || r.status === 410) {
      return res.status(r.status).type("html").send(await r.text());
    }
  } catch {}
  next(); // fallback
});
```

Behind a proxy or load balancer, call `app.set("trust proxy", true)` so `req.protocol` is `https`.

### Option C: Cloudflare Worker

Put the worker on your site's route and add `PRERENDER_URL` and `PRERENDER_API_KEY` as Worker secrets.

```js
const BOTS = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|applebot|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexitybot|ccbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";
    const isPage = request.method === "GET" && !/\.[a-z0-9]+$/i.test(url.pathname);

    if (isPage && BOTS.test(ua) && !request.headers.get("x-render-request")) {
      try {
        const r = await fetch(`${env.PRERENDER_URL}/api/render?url=${encodeURIComponent(request.url)}`, {
          headers: { "x-api-key": env.PRERENDER_API_KEY },
        });
        if (r.ok || r.status === 404 || r.status === 410) return r;
      } catch {}
    }
    return fetch(request); // normal site
  },
};
```

### Option D: Nginx

```nginx
map $http_user_agent $is_bot {
  default 0;
  "~*(googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|applebot|gptbot|chatgpt-user|oai-searchbot|claudebot|perplexitybot|ccbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot)" 1;
}

server {
  # ...your existing config...

  location / {
    set $prerender $is_bot;
    if ($http_x_render_request) { set $prerender 0; }
    if ($uri ~* "\.[a-z0-9]+$")  { set $prerender 0; }
    if ($prerender = 1) { rewrite .* /__prerender last; }

    try_files $uri /index.html;   # your normal SPA handling
  }

  location = /__prerender {
    internal;
    proxy_set_header x-api-key YOUR_API_KEY;
    proxy_pass http://127.0.0.1:3000/api/render?url=$scheme://$host$request_uri;
    proxy_read_timeout 30s;
    proxy_intercept_errors on;
    error_page 401 403 429 500 502 503 504 = /index.html;   # fallback
  }
}
```

The Nginx example passes `$request_uri` without URL-encoding. That's fine for simple paths. Use options A–C if your pages have complex query strings.

---

## 5. Check that it works

Pretend to be Googlebot against **your** site:

```bash
curl -s -A "Googlebot" https://yoursite.com/some-page | grep -c "<script"
```

- The count should be `0`. JSON-LD blocks are kept, so a few `ld+json` scripts are fine.
- The real page text should be in the HTML.
- A normal request (`curl -s https://yoursite.com/some-page`) should still return your usual app.
- The page appears in the dashboard under your key, and the key's request count goes up.

---

## 6. Responses and errors

| Status | Meaning | What your site should do |
|---|---|---|
| `200` | Static HTML (`X-Render-Cache: HIT` or `MISS`) | Serve it |
| `404` / `410` | The original page is 404/410 too | Serve it (crawlers should see the real status) |
| `400 INVALID_URL` | Missing, malformed or non-http(s) URL | Fall back |
| `400 BLOCKED_ADDRESS` | URL points to localhost or a private network | Fall back |
| `401 MISSING_KEY` / `INVALID_KEY` | No key, or the key was deleted | Fall back, check the key |
| `502 RENDER_FAILED` / `TOO_LARGE` | Page couldn't be rendered, or is over 5 MB | Fall back |

Error bodies are JSON: `{ "error": { "code": "INVALID_KEY", "message": "..." } }`.

---

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| `INVALID_KEY` | Copy the key again from the dashboard. Deleted keys stop working immediately |
| Content missing from the HTML | Content that loads more than 20 s after page load isn't captured. Raise `RENDER_TIMEOUT_MS` in `web-app/.env` |
| Old content is being served | Pages are cached until deleted. Delete the page in the dashboard |
| First request is slow | Normal for a `MISS`. Warm important pages by requesting them once yourself |
| Every request is a `MISS` | The URL changes between requests (e.g. tracking params). Each distinct URL is cached separately |
| `BLOCKED_ADDRESS` while testing locally | Rendering `localhost` sites is blocked on purpose. Test with a public URL |
| Render loop or very slow responses | Make sure your rule skips requests with the `X-Render-Request` header |
