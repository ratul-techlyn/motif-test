# Proposed Changes — awaiting approval

Every item follows `rules.md`: **no change to UI, functionality or how animations look.** Approve by ID (for example "approve P0, A1–A6, R1"). Status tags show what has been executed: see `log.md`.

**Risk levels:**
- 🟢 **Low:** mechanical change, no runtime behaviour change.
- 🟡 **Medium:** touches runtime code; needs a visual check.
- 🔴 **High:** touches the render or animation pipeline; needs careful before/after testing.

**Visible?** says whether a user could notice the change. Every item is "No" except those under "Visible bug fixes", which are listed separately.

---

## Phase 0: Baseline (required first)
- **P0** [✅ DONE (build fails at baseline, see log)] 🟢 Run `npm ci` and `npm run build` on the current code. Record bundle sizes and any build errors. Take a quick Lighthouse/screenshot baseline of `/`, `/about`, `/fashion-agency`, `/contact` and `/culture`.
  - *Why:* 13 pages are `"use client"` **and** export `metadata`, which Next.js normally rejects at build time, so the build may already be broken.

## Phase 1: Server/client rendering
- **R1** [✅ DONE] 🟢 `src/app/(public)/layout.tsx`:
  - remove the wrong `"use server"` directive
  - remove the server-side `gsap/all` import and `registerPlugin` (AnimationWrapper already registers these on the client)
- **R2** 🟡 `(public)/layout.tsx`: remove the `await headers()` / `x-is-bot` read. Pass `isBot={false}`, which is the value it always has today because nothing sets that header.
  - *Gain:* all pages become **static** and are pre-built once instead of rendered on every request.
  - *Verify:* build output shows routes as `○ Static`, and the pages look the same.
- **R3** 🟡 Move `useResponsiveSize()` from the pages into `MarqueeNavigation` itself. It is the only reason most pages are `"use client"`.
- **R4** [✅ DONE via page/page-client split] 🟡 Fix the client-page-with-metadata problem without changing the UI:
  - Turn the 13 page files into **server** components that export `metadata`.
  - Move each page's small client piece into a client component. For the 9 landing pages that is the SplitText `useEffect`, which becomes a shared `SplitTextReveal`, with the exact same animation code. For `/about`, the GSAP pin and SplitText block becomes a client component.
  - Add `"use client"` to the components that use hooks but lack it: BannerJB, Footer, SvgImagePath, AnimatedLines, HeadingAnmation, what-we-do Banner and RecommandationWhatDo, WorkMerger.
  - Do it page by page. The easiest pages go first: what-we-do, why-motif, the-motif-process.
- **R5** [✅ DONE] 🟢 `/faqs`: remove the unused `useResponsiveSize()` call and `"use client"`, and attach the existing (unused) `faqs.seo.ts` as metadata. **`/culture`:** remove the `console.log` `onButtonClick` prop, make the page a server component, and attach `culture.seo.ts`.
- **R6** [⏸ needs R3] 🟢 `InteractiveHome.tsx`: same idea as R3. Keep it, but it no longer needs to wrap everything once `iconSize` lives in `MarqueeNavigation`.
- **R7** [✅ DONE] 🟢 Remove imports that do nothing:
  - the unused `next/dynamic` import on every page
  - the unused `headers` import in home `page.tsx`
  - unused imports in contact `page.tsx` (`dynamic`, `LocationSlider`, `ContactMails`)
  - the unused `BotAwareWrapper`, `MasterGraphScript` and `GlobalFAQsScript` imports in the root layout
- **R8** 🟡 Render `MarketingProviders` **once**: keep the `<body>` instance, remove the `<head>` one. Tracking stays the same because `next/script` already dedupes by id, and this also removes the duplicate noscript pixel.
- **R9** 🔴 *(decision needed)* Server HTML is empty because `AnimationWrapper` and `PageTransition` return `null` until mounted.
  - *Option:* always render the children server-side and gate only the loader overlay and cursor.
  - *Gain:* faster first paint, and real HTML for SEO without relying on prerender.io.
  - *Risk:* it could cause a flash of content before the loading animation or page transition. It must be tested to confirm the intro looks identical. **Recommend doing it last, or skipping it.**

## Phase 2: Code-split heavy pieces (no visual change)
- **S1** 🟡 Load `LoadingAnimation` (framer-motion) through `next/dynamic` with `ssr:false`. It only shows on a first visit, so returning visitors don't download it.
- **S2** 🟡 Load `CursorDot`/`CursorLabel` through `next/dynamic` with `ssr:false`. They are desktop-only, and today render only after loading.
- **S3** [✅ DONE] 🟢 Remove the unused `ImageShaderEffect` (three.js) import from `~comp/TheCommitment.tsx`. Its usage is already commented out.
- **S4** [✅ DONE (named imports; d3 kept)] 🟢 Replace `import * as d3` in `SvgImagePath.tsx` with `document.createElementNS`. It is used for a single `d3.create("svg")` call, so the output is the same.
- **S5** [✅ DONE] 🟢 Replace `gsap/all` with per-plugin imports, for example `gsap/ScrollTrigger`, in the 8 files that use it. Same plugins, smaller bundle.
- **S6** [✅ DONE (d3 only; gsap excluded)] 🟢 Re-enable `experimental.optimizePackageImports` in `next.config.ts` for `gsap`, `framer-motion`, `react-icons`, `lucide-react` and `swiper`.
- **S7** [⏸ reclassified 🟡 (CSS order risk)] 🟢 Move the swiper CSS and `_curve_chart.scss` from the root layout into the components or pages that use them. Same styles, but only loaded where needed.
  - *Verify:* swiper sections and the curve chart look the same.

## Phase 3: Animation runtime cleanup (same look, less CPU, no leaks)
- **A1** 🟡 `CursorDot.tsx`: cancel the rAF loop on unmount. It currently runs forever and can stack up.
- **A2** 🟡 `GsapImageMarquee.tsx`: keep a reference to the `gsap.ticker` callback and the resize handler, and remove both on cleanup.
- **A3** 🟡 `ImageShaderEffect.tsx`: cancel the rAF and dispose the renderer, geometry and material on unmount. Only matters if it is still used; otherwise it is deleted under D-items.
- **A4** 🟡 `CursorLabel.tsx`:
  - make the scroll listener passive
  - call `setLabel` only when the label actually changes
  - reuse tweens with `gsap.quickTo` instead of creating 3 new tweens on every mousemove
  - same motion and easing values
- **A5** 🟡 `TopBar.tsx`:
  - passive scroll listener
  - update opacity and tween only when the state actually changes
  - remove the menu `mouseenter`/`mouseleave` listeners on close and unmount (they currently pile up)
- **A6** [✅ DONE] 🟢 `AnimationContext.tsx`: create the timeline lazily, once, and memoise the provider value. **`CursorContext.tsx`:** memoise the value. *Effect:* fewer re-renders across the whole tree.
- **A7** [✅ DONE] 🟢 Make the scroll listeners in `CaseStudyCarousel.tsx` and `FloatingSealEntrance.tsx` passive.
- **A8** [✅ PARTIAL (console.log only)] 🟢 Remove the 61 duplicate `gsap.registerPlugin` calls that sit in render or effect bodies, keeping module-level registration. Remove about 20 leftover `console.log`s.
- **A9** 🔴 *(optional)* `AnimationWrapper`: limit `will-change`/`translateZ(0)` on every `<section>`, and the full smoother re-create when `hasPageTransitionFinished` changes. **Only if the before/after scroll feel is identical.**

## Phase 4: Assets (same visuals, fewer bytes)
- **I1** 🟡 Videos on `/the-motif-process/page.tsx:118` and `MadeToBreak.tsx:194`:
  - add `playsInline`, `preload="none"` or `"metadata"`
  - start loading when the video scrolls near the viewport (IntersectionObserver)
  - autoplay, mute and loop exactly as now
  - *Saves:* a 7.7 MB download on page load.
- **I2** [✅ DONE] 🟢 Fonts:
  - switch ClashDisplay from `.woff` to the `.woff2` files already in the repo (same font, about 20% smaller)
  - convert HelveticaNeue `.ttf` to `.woff2` (same glyphs, about 50–60% smaller)
- **I3** 🟡 Fonts: set `preload: false` on rarely used faces (BoldItalic) so about 10 font files are no longer preloaded on every page.
- **I4** [✅ DONE] 🟢 `next.config.ts`: re-enable the `images` block with `formats: ['image/avif','image/webp']` and `minimumCacheTTL: 31536000`.
- **I5** 🟡 Add `sizes` to `<Image>` usages that use `fill` or are full width. Add `priority` to the real LCP images (the mobile hero capsules) and drop it from below-the-fold marquee images.
- **I6** 🟡 Losslessly or near-losslessly recompress the oversized source images, keeping the same filenames and dimensions. Examples: BigCommercePartner.png (3.7 MB), the fashion/luxury/dtc/beauty hero PNGs, `hero4.webp` (1.3 MB). This also makes the first image optimisation on the server faster.
  - *Verify:* side-by-side visual diff.
- **I7** 🔴 *(optional)* Home hero: preload `hero1.webp` or switch to next/image. It is currently a CSS background, which next/image can't optimise. Must render identically.

## Phase 5: Third-party scripts (same tracking, later loading)
- **T1** 🟡 Move the reCAPTCHA `<script>` out of the root `<head>` and into `ContactForm` as `next/script` `lazyOnload` (or `afterInteractive`). Only `/contact` uses it.
  - *Verify:* the contact form still submits and the captcha passes.
- **T2** 🟡 Switch Microsoft Clarity and HubSpot tracking to `strategy="lazyOnload"`. They still load and track, just after the page is idle. GA, GTM and Meta stay as they are.
- **T3** [✅ DONE] 🟢 Add preconnect hints for `www.google.com` and `www.gstatic.com` (on /contact only) and for `www.clarity.ms`.
- **T4** 🟢 `ContactForm`: give the `checkRecaptcha` polling a maximum number of attempts and clear it on unmount. *(Optional)* run the HubSpot, Meta and email `fetch` calls in parallel with `Promise.all`; same requests and same result handling.

## Phase 6: Middleware & config
- **M1** [✅ DONE] 🟢 Narrow the middleware matcher to skip static files: `'/((?!_next|api|favicon.ico|.*\\..*).*)'`. Add webp, svg, avif, woff, woff2, json and webm to the ignore list. *Gain:* no middleware work on every image or font request.
- **M2** [✅ DONE] 🟢 Middleware: check the bot list before calling `isbot()`, and remove the duplicate `baiduspider` entry.
- **M3** 🟡 Build the prerender.io URL from `https://wemotif.com` + pathname + search instead of `nextUrl`, which can be `localhost:3333` behind nginx.
- **M4** [✅ DONE] 🟢 Re-enable static asset cache headers in `next.config.ts` (`/_next/static` immutable, `/assets/*` long cache).

## Phase 7: Dead code & dependencies (grep-verified before each delete)
- **D1** [✅ DONE (+ three)] 🟢 Uninstall unused packages:
  - jquery, jquery-ui, @types/jqueryui, @types/jquery
  - lenis, @studio-freight/lenis
  - react-use-gesture, re-resizable, auto-text-size
  - next-view-transitions, next-transition-router, next-auth, next-hubspot, next-navigation
  - prerender-node, react-draggable, react-google-recaptcha, dotenv, @heroicons/react
  - also move `@types/d3` to devDependencies (or remove it after S4) and remove `@types/next`
- **D2** [✅ DONE] 🟢 Delete backup and unused source files:
  - `CurveChartAnimation copy.tsx`, `CurveChartAnimationBackup.tsx`, the `XXcurve_chart.tsx` files, both `Curve3dChart.tsx`, `transitions/Copy.tsx`
  - the 10 unused `ImageSlider.tsx` copies
  - `HeroMobileNew`, `WeAre`, `WeAreMotif`, `Apply`, `JoinOurTeam`, `MotifVideShow`, `WhyBanner`, `WhyChooseCart`, `~comp/Approach`, `~comp/CaseStudiesCarousel`, `~comp/Hero`
  - `blog-carousel`, `CaseStudyCarousel`, `DynamicHeadline`, `SectionPartner`, `SwiperMarquee`, `MagneticLink`, `HighlightStatement`, `BusinessPageTemplate`, `scroll-effects`, `ExplosionContainerNew`, `HomeTitleMixImg`, `MobileGuidePortal`, `TitleSideShort`, `StaticPage`, `HeadingAnmation`
  - unused hooks: scrollbar-test, scrollbar-usage-example, useLenis, usePageTransitionAnimation, useScrollTriggerGate
  - `MobileGuideContext`
  - unused libs: fetch-posts, isAnimating, prerender-config, seo-utils, transition, connection-awareness, page-load-detection
  - `BotAwareWrapper`
  - *Each one is re-checked with grep first.*
- **D3** [✅ DONE (footerexplo img1–15 kept, they are used)] 🟢 Delete unused public assets, about 32 MB:
  - `assets/footerexplo/`, `video/motif.mp4`
  - `shopifyplus/luxury-lifestyle-hero.png`, `luxuryLifestyle/luxuryFashionTitleImage.png`, `fashion_agency/fashionTitleImage.png`, `beauty/beautyBannerImage.png`
  - unreferenced brand_profile, about/slide and instagram images
  - `process/graph.png`, `lets-talk-bg.png`, `Lets-talk.png`, the `specialize-*` images, `check-logo.jpeg`
  - Next.js boilerplate SVGs, `public/js/DrawSVGPlugin.min.js`, `public/js/unicorn_3d_file.json`, and all `.DS_Store` files
  - (`cultureCareearImage.jpg`, 14 MB, goes too once `JoinOurTeam` is deleted.)
- **D4** 🟡 *(decision needed)* Test/demo routes `/test`, `/test/steps`, `/special-page` and `/marketing-demo` are publicly reachable. Either delete them, or add server `metadata.robots = { index:false }`.
- **D5** [✅ PARTIAL (.env still tracked, see X1)] 🟢 Add `.DS_Store`, `.env`, `.env.local` and `.env*.local` to `.gitignore` (files stay on disk), and untrack `.DS_Store`.

## Visible bug fixes (these change what users see, so they need separate approval)
- **B1** 🟡 Case bug: `/assets/pulseb2b/...` → `/assets/pulseB2B/...` in the 3 pulse-b2b pages. Those images currently **404 on the Linux server**.
- **B2** 🟢 `public/sitemap.xml`: fix `https://yourdomain.com/contact` → `https://wemotif.com/contact` and remove the duplicate beauty URL. This affects SEO only, not the UI.
- **B3** 🟢 Home: remove the duplicate WebPage and breadcrumb JSON-LD emitted by both `HomePageSchemaScript` and `SchemaInjector`.

## Out of scope: flagged only, needs your decision
- **X1** Rotate the secrets committed in git (`.env`, `.env.local`) and the Resend key hardcoded in `api/email/route.ts:5`, then read the key from env.
- **X2** Enforce captcha on the server in `/api/email` and `/api/hubspot/contact`, and escape the HTML in the notification email.
- **X3** `deploy.sh`: build before swapping (zero downtime), and remove `chmod -R 777`.
- **X4** Move off the Next canary build (`15.5.1-canary.21`) to a stable 15.x release.
