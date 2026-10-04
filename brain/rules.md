# Rules — MOTIF (wemotif.com) Optimisation

These rules apply to every change in this optimisation pass. If a change breaks any rule, don't make it.

## 1. Golden rule: zero visible change
- **Functionality must stay exactly the same.** Forms, navigation, page transitions, the loading animation, the cursor, marquees, sliders, the contact flow and tracking all keep working as they do today.
- **UI must stay pixel-identical.** No changes to layout, spacing, colours, fonts, copy, image crops or responsive behaviour.
- **Animations must look and feel the same.** Timing, easing, sequence, scroll behaviour (GSAP ScrollSmoother) and page-transition effects stay as they are. We optimise *how* they run (cleanup, passive listeners, fewer re-renders, no leaks), never *what* the user sees.
- When unsure whether something is visible, treat it as visible and don't change it.

## 2. Scope: allowed changes
- Code optimisation:
  - memoisation
  - cleanup of listeners, rAF loops, tickers and WebGL resources
  - passive event listeners
  - removing duplicate work
- Client/server rendering tweaks:
  - move non-interactive pieces to server components
  - keep `"use client"` only where hooks or browser APIs are needed
  - `next/dynamic` for heavy client-only pieces
  - remove needless dynamic rendering, for example an unused `headers()` call
- Asset delivery:
  - `preload`, `poster`, `playsInline` and lazy loading on videos
  - `priority` and `sizes` on images
  - lighter font files with the **same** font faces
  - compressed copies of images that are **visually identical**
- Script loading strategy for third-party tags, without removing any tracking.
- Config:
  - `next.config.ts` image formats, cache TTL, `optimizePackageImports`, cache headers
  - middleware matcher and ignore list
- Deleting dead code, unused files and unused dependencies, **only after grep confirms there are zero references**.

## 3. Out of scope: not allowed
- No redesigns. No new sections, components or features. No content or SEO copy changes.
- No architecture rewrites:
  - keep the App Router structure
  - keep GSAP + ScrollSmoother; don't swap to Lenis or anything else
  - keep the PageTransition/AnimationWrapper flow
- No upgrading or downgrading `next`, `react` or `gsap` major/minor versions in this pass.
- No changes to tracking IDs, event names, or HubSpot/Meta/GA/GTM/Clarity behaviour. Changing *when* a script loads is allowed only if it is approved in `change.md`.
- Don't touch the WordPress `childs/` directory or the server setup without explicit approval.
- Don't commit or push unless the user asks.

## 4. Process
1. **Analyse.** Findings go in `memory.md`.
2. **Propose.** Every candidate change goes in `change.md` with an ID, a risk level, files touched, and how we will verify it.
3. **Approve.** Nothing is executed until the user approves it by ID.
4. **Execute.** Do one change (or a small batch of related changes) at a time, and keep `task.md` current (running / next / done).
5. **Verify.** After each change:
   - Run `npm run build`; it must pass.
   - Visually check the affected pages on desktop and mobile, comparing before and after: animations, transitions, loading screen, cursor and forms.
   - Make sure there are no new console errors.
6. **Log.** Record each executed change in `log.md`: date, change ID, files, what changed, verification result, and how to revert.
7. If anything looks or behaves differently, **revert right away** and note it in `log.md`.

## 5. Safety
- Never print or copy secret values into these files or into chat.
- Before deleting a file or asset, grep `src/` for its name, including dynamically built paths. Record the deletion in `log.md`.
- Asset paths are case-sensitive in production (Linux). Keep the exact casing.
- Make small, reviewable diffs. One concern per change.
