# Project Memory: MOTIF (wemotif.com)

Analysed on 2026-10-03. Source: a full audit of the repo at commit `544c65f`. Use this as the project knowledge base; re-check a fact before acting on it.

## 1. What it is
- The marketing site for MOTIF®, an agency/incubator for luxury, fashion and beauty brands. Domain: https://wemotif.com
- About 20 public routes in `src/app/(public)/`:
  - home `/`
  - `/about`, `/contact`, `/culture`, `/faqs`, `/what-we-do`, `/why-motif`, `/the-motif-process`
  - 9 SEO landing pages: fashion, beauty, luxury, dtc, shopify-platinum, bigcommerce-elite, and 3 pulse-b2b pages
  - test/demo pages
- API routes in `src/app/api/`:
  - `email`: Resend
  - `hubspot/contact`
  - `meta/conversion`: Meta CAPI
  - `verify-captcha`: reCAPTCHA v3

## 2. Stack
- **Next.js `^15.5.1-canary.21`.** A canary build is running in production. App Router; `next dev --turbopack`.
- **React** `^18.2.0`, but `@types/react` is `^19` (mismatch). TypeScript, Tailwind 3, SCSS.
- **Animation:** GSAP 3.13 with ScrollTrigger, ScrollSmoother, SplitText, Draggable, Inertia, DrawSVG and CustomEase.
  - ScrollSmoother is the single smooth-scroll engine, created in `src/components/AnimationWrapper.tsx`.
  - Also used: framer-motion (loading animation), motion/react (SvgImagePath), split-type (HeroMobile files), swiper, react-fast-marquee, three (ImageShaderEffect, effectively unused), d3 (SvgImagePath, only `d3.create("svg")`).
- **Fonts:** `next/font/local`.
  - ClashDisplay: 6 `.woff` files. `.woff2` versions exist but are unused.
  - HelveticaNeue: `.ttf`, about 436 KB unique. Light is registered for both 300 and 400; BoldItalic for both 600 and 700.
- **Tracking:** `src/components/marketing/*`. GA4, GTM, Meta Pixel, HubSpot and Microsoft Clarity, all `next/script` `afterInteractive`. reCAPTCHA is a raw `<script async>` in the root `<head>`, loaded on every page.
- **Deploy (`deploy.sh`):**
  - rsync to a VPS, then `npm ci && npm run build`, then PM2 `wemotif-com` on port 3333 behind nginx. A WordPress install sits alongside in `childs/`.
  - The script kills the live process and deletes `.next`/`node_modules` *before* building, so there is downtime on every deploy.
- `node_modules` is **not installed** locally, so no build has been run yet.

## 3. Render architecture (most important)
- **Root layout** `src/app/layout.tsx` loads:
  - fonts and global CSS: `globals.css`, `fluid_style.css`, `_curve_chart.scss` and 4 swiper CSS files, all global
  - `SchemaInjector` (client, JSON-LD by pathname)
  - `MarketingProviders`, rendered **twice** (in `<head>` and in `<body>`)
  - `AnimationProvider` and `CursorProvider`
- **`(public)/layout.tsx`:**
  - Marked `"use server"` (wrong directive).
  - Imports `gsap/all` and registers plugins on the server.
  - Calls `await headers()` to read `x-is-bot`, a header **nothing sets**. That call forces **every page to render dynamically**, so none are built as static pages.
  - Wraps pages in `PageTransition` → `AnimationWrapper`.
- **`AnimationWrapper` returns `null` until mounted** (line ~192), and so does `PageTransition` (line ~226). So the **server HTML has no page content**; everything appears only after JavaScript runs. Search engines are served through prerender.io in middleware.
- **AnimationWrapper flow:**
  1. LoadingAnimation, on first visit only. This uses localStorage `hasVisitedMotif` and a cookie `hasSeenMotifAnimation`: two flags for the same thing.
  2. ScrollSmoother is created.
  3. TopBar, Footer, cursor (desktop) and FloatingSeal render.
  4. `ScrollTrigger.refresh` runs on init and on every route change.
- **19 of about 20 `page.tsx` files are `"use client"`.** Only home and contact are server components.
  - 13 client pages also `export const metadata` (added in `544c65f`). **Next.js normally rejects this at build time**, so the build may currently fail. Confirm with `npm run build`.
  - The reason most pages are client: `useResponsiveSize()` for `MarqueeNavigation` `iconSize`. Nine landing pages also have one GSAP SplitText `useEffect`, and about has useGSAP plus a pin.
  - Components that use hooks but have no `"use client"` (they work only because a client parent imports them): BannerJB, Footer, SvgImagePath, AnimatedLines, HeadingAnmation, what-we-do Banner and RecommandationWhatDo, WorkMerger.

## 4. Middleware (`src/middleware.ts` + `src/lib/prerender-middleware.ts`)
- The matcher `/((?!_next|favicon.ico|api/).*)` also runs on every `/assets/*` request.
- The ignore list is missing webp, svg, avif, woff/woff2, json and webm.
- For bots, it fetches prerender.io with a 500 ms timeout. The prerender token is hardcoded.
- `nextUrl` may be `http://localhost:3333` behind nginx.
- It sets `Cache-Control: public, max-age=3600` on page responses, which conflicts with the pages being dynamic.
- Dead code: `prerender-config.ts`, `isBotRequest`, and the `prerender-node` dependency.

## 5. Performance problems found
- **Assets** (`public/` is 100 MB):
  - About 32 MB is unused: `footerexplo/` (8.2 MB), `video/motif.mp4` (7 MB), duplicate 3.5 MB PNGs, and more (full list in `change.md`).
  - `culture/cultureCareearImage.jpg` is 14 MB. Its component `JoinOurTeam` is unused.
  - Many hero PNGs are 1.5–3.7 MB.
  - The home hero is built from CSS `background-image` (`TitleMixImg`, `fluid_style.css`), so next/image is bypassed. `hero4.webp` is 1.3 MB.
  - **Case bug:** code uses `/assets/pulseb2b/...` but the folder is `pulseB2B`, so those images 404 on Linux.
- **Video:** the 7.7 MB `morif-incubation-not-an-agency.mp4` is used on `/about` (MadeToBreak) and `/the-motif-process`. Its tags have no `preload`, `poster` or `playsInline`, and it downloads immediately even though it sits below the fold.
- **Images:** 112 next/image usages, but `sizes` is set on only 10. The `priority` flags are mostly on non-LCP marquee images. The mobile hero capsules have no priority. The `images` block in `next.config.ts` is commented out (no AVIF).
- **JavaScript:**
  - `gsap/all` is imported in 8 files; there are 61 `registerPlugin` calls.
  - `three` is imported in TheCommitment even though its usage is commented out.
  - d3 is imported in full for a single call.
  - The only `next/dynamic` usage is on home. There is no lazy loading for LoadingAnimation, cursor or swiper sections.
- **Runtime leaks and jank:**
  - `CursorDot`: a rAF loop that is never cancelled.
  - `GsapImageMarquee`: a `gsap.ticker` callback and a resize listener that are never removed.
  - `ImageShaderEffect`: rAF and WebGL resources never disposed.
  - `CursorLabel`: does `setLabel` plus 3 tweens on every mousemove; its scroll listener is not passive.
  - `TopBar`: creates a new tween on every scroll event (listener not passive), and its menu hover listeners pile up.
  - `AnimationContext`: builds a new `gsap.timeline` on every render, and its value is not memoised. `CursorContext` value is not memoised either.
  - `AnimationWrapper`: puts `will-change` and `translateZ(0)` on every `<section>`.
- **Dependencies imported nowhere:**
  - jquery, jquery-ui, lenis, @studio-freight/lenis
  - react-use-gesture, re-resizable, auto-text-size
  - next-view-transitions, next-transition-router, next-auth, next-hubspot, next-navigation
  - prerender-node, react-draggable, react-google-recaptcha, dotenv, @heroicons/react
- **Dead files:** about 45, including backups/"copy"/XX files, 10 ImageSlider copies, unused hooks and context, unused libs, and 14 unused per-page schema files.
- **Test routes are public:** `/test`, `/test/steps` (loads jQuery and Bootstrap from CDNs), `/special-page` and `/marketing-demo`.
- **SEO and schema:**
  - `MasterGraphScript` and `GlobalFAQsScript` are commented out, so the Organization graph is missing.
  - On home, `HomePageSchemaScript` and `SchemaInjector` duplicate WebPage and breadcrumb.
  - `public/sitemap.xml` contains `yourdomain.com/contact` and lists the beauty page twice.

## 6. Security (flag only; it's the user's call)
- `.env` and `.env.local` are **committed to git** with real secrets: Resend, HubSpot, Meta CAPI and the reCAPTCHA secret. `.gitignore` doesn't list them.
- A Resend API key is **hardcoded** in `src/app/api/email/route.ts:5`.
- Captcha is enforced only on the client. `/api/email` and `/api/hubspot/contact` accept direct POSTs, and the email HTML does not escape user input.
- `deploy.sh` runs `chmod -R 777` on the WordPress directory.
- → Rotate the keys. Fixing these is outside the "optimise only" scope unless approved.

## 7. Root docs vs reality
- `PERFORMANCE_OPTIMIZATIONS.md` claims `optimizePackageImports`, an image TTL and cache headers. **All of these are commented out** in `next.config.ts`.
- `BotAwareWrapper` is described as active but is commented out in the layout. Its helpers `connection-awareness.ts` and `page-load-detection.ts` are therefore dead.
- `PRERENDER_FIX.md` says the timeout is 5 s and mentions an `X-Bot` header. The code uses 500 ms and never sets that header.
- The README mentions `.nvmrc`, `typecheck` and `ops/DEPLOY.md`, none of which exist.

## 8. Brain files
- `rules.md`: constraints (zero UI or functional change).
- `change.md`: proposed changes with IDs, awaiting approval.
- `task.md`: running, next and done.
- `log.md`: executed changes and how to revert them.
