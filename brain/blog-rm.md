# Blog Feature Roadmap — MOTIF (wemotif.com) · Strapi edition

Created 2026-10-04. Updated 2026-10-04: switched from a custom-built backend to **Strapi 5 (headless CMS)**.
Status: **built locally (2026-10-04)**, not deployed. See "Implementation status" below.
Step-by-step setup instructions: [strapi-setup.md](strapi-setup.md).

## 0. Goal

Add a blog system to the site:

1. **Blogs** (collections, e.g. "Brand Strategy", "Ecommerce") that each contain **blog posts**.
2. Public pages: all posts, all blogs, a single blog (its posts + related blogs), and a single post.
3. An admin area to create, edit, publish and delete blogs and posts. This is **Strapi's admin panel**; `wemotif.com/admin/blog` redirects to it.
4. **5 post templates**. Each post stores a template number (1–5) chosen in the admin, and the post page renders with that template.

### Terms used in this file
| Term | Meaning |
|---|---|
| **Blog** | A collection that groups posts (like a category with its own page). |
| **Post** | One article. Belongs to exactly one blog. |
| **Template** | One of 5 layouts for the single post page, picked per post. |
| **Strapi** | Headless CMS: stores content, provides the admin panel and a REST API. |
| **Next app** | This repo (the existing wemotif.com site). Renders the public blog pages. |

---

## Implementation status (2026-10-04)

Decisions used: recommended defaults for D1–D7 (self-hosted Strapi, PostgreSQL, `cms.wemotif.com`, separate project at `D:/MOTIF/strapi/motif-cms`, local uploads, Blocks, nested URLs).

| Phase | Status | Notes |
|---|---|---|
| 1 Strapi setup | ✅ local | Content types, preview config, read-only API token, demo content (3 blogs, 10 posts, all 5 templates) via `motif-cms/scripts/seed-demo.js`. Admin roles (Editor/Author) still to create in the admin UI. |
| 2 Connect Next app | ✅ | `src/lib/strapi/*`, `/api/revalidate`, `/admin/blog` redirect, image `remotePatterns`, middleware rules for `/admin` and draft mode. Webhook `next-revalidate` registered (→ `http://localhost:3000/api/revalidate`); Strapi must be restarted to load it. |
| 3 Listing pages | ✅ | `/blog` (featured, filter chips, pagination), `/blogs`, `/blogs/[blogSlug]` (+ related blogs). `blog-card.tsx` rebuilt. |
| 4 Post page + templates | ✅ | 5 templates in `blogs/[blogSlug]/[postSlug]/~templates/`, fallback to 1, TOC, share, author, related posts. Draft preview via `/api/preview` + `/api/preview/exit`. |
| 5 SEO & rendering | 🟡 partial | Done: `generateMetadata`, JSON-LD (Blog, BlogPosting, Breadcrumb), `/blog-sitemap.xml`, `/blog/rss.xml`, robots.txt entries. **Not done:** server-HTML fix for `AnimationWrapper`/`PageTransition` (changes every page; needs approval, bots still get prerender.io snapshots), and static generation (blocked by `headers()` in `(public)/layout.tsx`; Strapi responses are cached by tag instead). Nav/footer links not added (visible change, needs approval). |
| 6 Production deploy | ⬜ | Needs VPS access. |
| 7 QA & launch | 🟡 | `npm run build` passes; all 5 templates + listings checked on desktop and 390px mobile; webhook/preview secrets and open-redirect guard tested. Full editor flow on production still to do. |

Known limitation: unknown blog/post slugs render the 404 page with `noindex` but HTTP status 200, because the async `(public)` layout has already started streaming.

---

## 1. Architecture

```
 Editors ──► cms.wemotif.com/admin  (Strapi admin panel)
                    │
                    ▼
            Strapi 5 (Node, PM2)  ──►  PostgreSQL
                    │   ▲
     REST API (read │   │ webhook on publish/update/delete
     with API token)│   │
                    ▼   │
 Visitors ──► wemotif.com/blog…  (Next.js app, renders templates 1–5)
```

- **Strapi** runs as a **separate app** on the same VPS, on its own port (e.g. 1337), behind nginx at `cms.wemotif.com`.
- **Next app** fetches content server-side from Strapi's REST API using a read-only API token. Content is cached (ISR) and refreshed when Strapi sends a webhook.
- `wemotif.com/admin/blog` → simple redirect to `https://cms.wemotif.com/admin`.
- The 5 templates are **React components in the Next app**. Strapi only stores which number a post uses.

---

## 2. Current state (what we start from)

- Next.js 15 App Router, React 18, Tailwind 3, SCSS, GSAP + ScrollSmoother. Deployed on a VPS with PM2 + nginx (`deploy.sh`). A WordPress install sits in `childs/`.
- No database, CMS or auth in the Next app today.
- `src/components/blog-card.tsx` exists but is unused (built for WordPress GraphQL data, links to `/blog/[slug]`). It will be adapted to Strapi data.
- `src/app/(public)/layout.tsx` wraps pages in `PageTransition` → `AnimationWrapper`, which return `null` until mounted, so **server HTML has no page content**. Blog SEO depends on fixing this for blog routes (Phase 5).
- `brain/rules.md` restricts the *optimisation pass* (no new features). The blog is a separate feature track and must not change existing pages.

---

## 3. Key decisions (need sign-off before Phase 1)

| # | Decision | Recommendation | Alternatives |
|---|---|---|---|
| D1 | Hosting Strapi | **Self-host on the existing VPS** (PM2 + nginx) | Strapi Cloud (paid, nothing extra on our VPS) |
| D2 | Strapi database | **PostgreSQL** on the VPS | SQLite (Strapi's default; OK for local dev only) |
| D3 | Admin URL | **`cms.wemotif.com/admin`** + redirect from `wemotif.com/admin/blog` | Proxy Strapi under `wemotif.com/cms` via nginx (more config, cookie path issues) |
| D4 | Where Strapi code lives | **Separate repo** (`motif-cms`) | `cms/` folder in this repo (must then be excluded from the Next build and `deploy.sh` rsync) |
| D5 | Media storage | **Local uploads on the VPS** to start (back them up) | S3 / Cloudflare R2 upload provider |
| D6 | Post body field | **Blocks** (Strapi's rich text, rendered with `@strapi/blocks-react-renderer`) | Rich text (Markdown) / Dynamic Zone of custom sections |
| D7 | URL structure | See §4 | Flat `/blog/[post]` |

> **Assumption:** the 5 templates are for the **single post page**. If you also want templates on blog listing pages, add the same `template` field to Blog (small extra task in Phase 4).

**Check before starting:** Strapi 5 needs **Node.js 22 or newer** (even-numbered LTS only). Check the VPS Node version, and that the VPS has enough free RAM for a second Node app plus PostgreSQL.

---

## 4. Routes

### Public (Next app)
| Route | Page | Content |
|---|---|---|
| `/blog` | **All posts** | Every published post, newest first. Featured post on top, pagination, filter by blog. |
| `/blogs` | **All blogs** | Grid of all blogs with cover, description, post count. |
| `/blogs/[blogSlug]` | **Single blog + related blogs** | Blog header, its posts (paginated), "Related blogs" section. |
| `/blogs/[blogSlug]/[postSlug]` | **Single post** | Rendered with the post's template (1–5), plus related posts. |

### Admin
| URL | Purpose |
|---|---|
| `cms.wemotif.com/admin` | Strapi admin: Content Manager (blogs, posts, tags, authors), Media Library, users and roles |
| `wemotif.com/admin/blog` | Redirect to the URL above |

### Next app API routes (new)
| Route | Purpose |
|---|---|
| `/api/revalidate` | Receives the Strapi webhook (checks a secret header) and refreshes the affected pages |
| `/api/preview` | Turns on Next.js draft mode so editors can preview unpublished posts from the Strapi admin |

---

## 5. Strapi content model

Built with the Content-Type Builder (dev mode), committed as `schema.json` files in the Strapi repo.

### Blog (collection type, Draft & Publish on)
| Field | Type | Notes |
|---|---|---|
| `title` | Text | required |
| `slug` | UID (from `title`) | required, unique |
| `description` | Text (long) | |
| `cover` | Media (single image) | |
| `order` | Integer | manual sort on `/blogs` |
| `posts` | Relation: Blog **has many** Posts | inverse of `Post.blog` |
| `relatedBlogs` | Relation: Blog ↔ many Blogs | chosen by hand in admin |
| `seo` | Component `shared.seo` | |

### Post (collection type, Draft & Publish on)
| Field | Type | Notes |
|---|---|---|
| `title` | Text | required |
| `slug` | UID (from `title`) | required, unique |
| `blog` | Relation: Post **belongs to one** Blog | required |
| `excerpt` | Text (long) | used on cards and meta description fallback |
| `content` | Blocks | the article body (D6) |
| `cover` | Media (single image) | alt text set in Media Library |
| `template` | Enumeration: `template_1` … `template_5` | required, default `template_1`; shown as a dropdown |
| `isFeatured` | Boolean | featured slot on `/blog` |
| `author` | Relation: Post belongs to one Author | |
| `tags` | Relation: Post ↔ many Tags | used for related posts |
| `seo` | Component `shared.seo` | |

`publishedAt` comes from Draft & Publish; Strapi also adds `documentId`, `createdAt`, `updatedAt`.

### Supporting types
- **Tag** (collection): `name`, `slug`.
- **Author** (collection): `name`, `slug`, `avatar`, `bio`.
- **Component `shared.seo`**: `metaTitle`, `metaDescription`, `ogImage`, `noIndex` (boolean), `canonicalUrl`.

### Template field: enumeration vs. number
An enumeration gives editors a clean dropdown and stops invalid values. If you prefer a plain number, use an Integer field with min 1 / max 5. The Next app maps either form to 1–5 and falls back to 1.

### Related content logic (in the Next app)
- **Related posts:** same blog first, then shared tags, newest first, exclude current, limit 3.
- **Related blogs:** `relatedBlogs` picked in admin; if empty, other blogs ordered by `order`, limit 3.

---

## 6. The 5 post templates (Next app)

All templates take the same props (`post`, `blog`, `relatedPosts`), so changing a post's template never breaks it.

```
src/app/(public)/blogs/[blogSlug]/[postSlug]/~templates/
  index.ts              // registry: { 1: TemplateClassic, ... 5: TemplateMinimal }
  TemplateClassic.tsx
  TemplateMagazine.tsx
  TemplateFullBleed.tsx
  TemplateSplit.tsx
  TemplateMinimal.tsx
  shared/               // PostBody (Blocks renderer), AuthorBox, ShareBar, RelatedPosts, TOC
```

| # | Name | Layout idea | Good for |
|---|---|---|---|
| 1 | **Classic** (default) | Title, meta, cover, single centred reading column, related posts at the end | Standard articles |
| 2 | **Magazine** | Large hero with title over image, two-column body with sticky sidebar (TOC, share, related) | Long-form guides |
| 3 | **Full-bleed Visual** | Full-screen hero, wide images, big pull quotes, GSAP reveal on scroll | Case studies, brand stories |
| 4 | **Split Hero** | Hero split 50/50 (image left, title + excerpt right), numbered sections below | Thought leadership, lists |
| 5 | **Minimal / Editorial** | Typography only, large ClashDisplay headline, narrow column | Opinion pieces, manifestos |

Rules:
- Unknown or missing template → **template 1**.
- Use existing brand fonts (ClashDisplay, HelveticaNeue) and Tailwind tokens. No new design system.
- Templates appear in the Strapi dropdown by number. Keep a short description of each in the field's admin description so editors know what they pick.

---

## 7. Next app code layout

```
src/lib/strapi/
  client.ts       // fetch wrapper: base URL, API token, cache tags, draft mode support
  queries.ts      // getPosts, getPost, getBlogs, getBlog, getRelatedPosts, getRelatedBlogs
  types.ts        // Blog, Post, Tag, Author, Media, Seo
  media.ts        // build absolute image URLs for next/image
src/app/(public)/blog/page.tsx
src/app/(public)/blogs/page.tsx
src/app/(public)/blogs/[blogSlug]/page.tsx
src/app/(public)/blogs/[blogSlug]/[postSlug]/page.tsx
src/app/api/revalidate/route.ts
src/app/api/preview/route.ts
src/app/admin/blog/page.tsx      // redirect to cms.wemotif.com/admin
```

New env vars in the Next app (names only): `STRAPI_URL`, `STRAPI_API_TOKEN`, `STRAPI_WEBHOOK_SECRET`, `PREVIEW_SECRET`.
`next.config.ts`: add `cms.wemotif.com` to `images.remotePatterns`.

---

## 8. Phased roadmap

### Phase 1 — Strapi setup (local)
- [ ] Sign off decisions D1–D7.
- [ ] Create the Strapi project: `npx create-strapi@latest motif-cms` (TypeScript, PostgreSQL).
- [ ] Run locally (`npm run develop`), create the first admin user.
- [ ] Build content types from §5: Blog, Post, Tag, Author, `shared.seo` component.
- [ ] Turn on Draft & Publish for Blog and Post.
- [ ] Roles: **Public** role gets no access; create a **read-only API token** for the Next app (find/findOne on Blog, Post, Tag, Author).
- [ ] Admin roles: Super Admin (you), Editor (create/publish), Author (own drafts) as needed.
- [ ] Seed content: 3 blogs, ~10 posts spread over templates 1–5.

**Done when:** you can create a blog and a post with a template number in the Strapi admin, and fetch it from `/api/posts` with the token.

### Phase 2 — Connect the Next app
- [ ] `src/lib/strapi/*` (§7): typed fetch client and queries (with `populate` for blog, cover, tags, author, seo).
- [ ] `next.config.ts` image `remotePatterns` for Strapi media.
- [ ] `/api/revalidate`: verify secret, then refresh `/blog`, `/blogs`, the blog page and the post page from the webhook payload.
- [ ] In Strapi admin → Settings → Webhooks: point `entry.publish`, `entry.unpublish`, `entry.update`, `entry.delete` to `/api/revalidate`.
- [ ] `/admin/blog` redirect route.
- [ ] `src/middleware.ts`: skip the prerender/bot logic and the `Cache-Control` header for `/api/revalidate`, `/api/preview` and `/admin`.

### Phase 3 — Public listing pages
- [ ] Rebuild `blog-card.tsx` for Strapi data (link → `/blogs/[blogSlug]/[postSlug]`).
- [ ] `/blog`: featured hero, grid, pagination (`?page=`), blog filter chips.
- [ ] `/blogs`: blogs grid.
- [ ] `/blogs/[blogSlug]`: blog header, its posts, related blogs.
- [ ] Empty states; `notFound()` for unknown or unpublished slugs.
- [ ] Existing TopBar, Footer, cursor and page transitions keep working on blog pages.

### Phase 4 — Single post page + 5 templates
- [ ] Shared pieces: Blocks renderer (`@strapi/blocks-react-renderer`) styled for the site, TOC from headings, AuthorBox, ShareBar, RelatedPosts, reading time.
- [ ] Build templates 1 → 5 (§6), one at a time, each reviewed on desktop + mobile.
- [ ] Template registry + fallback to 1.
- [ ] **Preview:** set up Strapi's Preview feature (`config/admin.ts` → `preview`, with the Next app URL and `PREVIEW_SECRET`) + `/api/preview` route using Next.js draft mode, so editors see drafts in the right template.
- [ ] *(Optional)* `template` field on Blog if listing-page templates are wanted.

### Phase 5 — SEO & rendering
- [ ] **Make blog content appear in server HTML.** `AnimationWrapper`/`PageTransition` return `null` before mount. Either render `children` on the server and gate only the animations, or give blog routes a layout that bypasses the gate. Existing pages must look the same.
- [ ] Let blog routes be statically generated/ISR (the `headers()` call in `(public)/layout.tsx` currently forces dynamic rendering). Add `generateStaticParams` for published posts.
- [ ] `generateMetadata` on every blog route from the `seo` component (title, description, canonical, OG image, `noIndex`).
- [ ] JSON-LD: `BlogPosting` on posts, `Blog`/`CollectionPage` on blog pages, `BreadcrumbList`. Hook into `SchemaInjector` / `src/app/datas/schema`.
- [ ] Sitemap entries for all published blogs and posts; RSS feed at `/blog/rss.xml`.
- [ ] next/image with `sizes` + `priority` on each template's hero image; lazy-load template 3's GSAP effects.
- [ ] Add Blog to `internal-links.ts`, TopBar menu and Footer (**needs approval** — visible change).

### Phase 6 — Production deploy
- [ ] VPS: confirm Node 22+, install PostgreSQL, create DB + user for Strapi.
- [ ] Deploy Strapi: `npm run build` → `npm run start` under PM2 (e.g. app `motif-cms`, port 1337).
- [ ] nginx: `cms.wemotif.com` → Strapi, SSL certificate, upload size limit (`client_max_body_size`).
- [ ] Strapi production env: `DATABASE_*`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, public URL.
- [ ] Next app production env: vars from §7, pointing at `https://cms.wemotif.com`.
- [ ] Backups: nightly PostgreSQL dump + `public/uploads` folder (or move uploads to S3/R2).
- [ ] Deploy script for Strapi (separate from `deploy.sh`), without downtime where possible.
- [ ] Recreate webhooks and API token in production; move content from local with `strapi transfer` or re-enter it.

### Phase 7 — QA & launch
- [ ] `npm run build` passes in both apps.
- [ ] Every template tested on desktop + mobile; transitions, cursor and ScrollSmoother work on blog pages.
- [ ] Editor flow: create → preview → publish → page updates on the live site within seconds; unpublish → page returns 404; delete → removed from listings and sitemap.
- [ ] Security: Public role has no access, token is read-only and server-side only, webhook and preview secrets checked, admin rate limit on, Strapi admin not indexed.
- [ ] Log changes in `brain/log.md`.

---

## 9. Later (not in the first release)
- Scheduled publishing (Strapi Releases / scheduling).
- Search across posts.
- Author pages.
- Newsletter signup on posts (Resend / HubSpot already integrated).
- Popular posts / view counts.
- Import old posts from the WordPress install in `childs/`.
- Move media to S3/R2 + CDN.

---

## 10. Open questions
1. Self-host Strapi on the VPS, or pay for Strapi Cloud (D1)? Does the VPS run Node 22+ and have spare RAM?
2. Is `cms.wemotif.com` OK for the admin, with `wemotif.com/admin/blog` redirecting to it (D3)?
3. Separate repo for Strapi, or a `cms/` folder in this repo (D4)?
4. Who will use the admin: just you, or a team with Editor/Author roles?
5. Templates only for the **single post page**, or also for blog listing pages?
6. URL preference: nested `/blogs/[blog]/[post]` or flat `/blog/[post]`?
7. Do you have designs or references for the 5 templates?
8. Should "Blog" appear in the main navigation and footer at launch?
