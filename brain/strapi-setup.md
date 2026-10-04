# Strapi Setup Guide — MOTIF Blog

Created 2026-10-04. Companion to [blog-rm.md](blog-rm.md) (the roadmap). This file covers **how** to set up Strapi 5 and connect it to the Next.js app.

Based on the Strapi 5 docs: https://docs.strapi.io/cms/quick-start. Re-check the docs if a command fails; Strapi changes often.

---

## 0. What you end up with

| Piece | Local | Production |
|---|---|---|
| Strapi app (`motif-cms`) | http://localhost:1337 | https://cms.wemotif.com |
| Strapi admin panel | http://localhost:1337/admin | https://cms.wemotif.com/admin |
| Strapi REST API | http://localhost:1337/api | https://cms.wemotif.com/api |
| Database | PostgreSQL (local) | PostgreSQL on the VPS |
| Next app (this repo) | http://localhost:3000 | https://wemotif.com |

---

## 1. Requirements

- **Node.js 22 or 24** (Active/Maintenance LTS; odd versions are not supported). Check with `node -v`.
- **npm** (comes with Node).
- **PostgreSQL 14+**. Local options:
  - Windows installer from postgresql.org, or
  - Docker: `docker run --name motif-pg -e POSTGRES_USER=strapi -e POSTGRES_PASSWORD=strapi -e POSTGRES_DB=motif_cms -p 5432:5432 -d postgres:16`
- **Git**.
- On the VPS: same Node version, PostgreSQL, PM2, nginx, and enough free RAM for a second Node app.

> SQLite (Strapi's default) is fine for a quick try-out, but use PostgreSQL locally too so local and production behave the same.

---

## 2. Create the database (local)

Skip if you used the Docker command above.

```sql
-- run in psql as the postgres superuser
CREATE USER strapi WITH PASSWORD 'change-me';
CREATE DATABASE motif_cms OWNER strapi;
```

---

## 3. Create the Strapi project

Create it **outside** this repo (separate repo `motif-cms`, decision D4 in the roadmap):

```bash
cd D:/MOTIF
npx create-strapi@latest motif-cms \
  --typescript \
  --dbclient postgres \
  --dbhost 127.0.0.1 --dbport 5432 \
  --dbname motif_cms --dbusername strapi --dbpassword change-me \
  --skip-cloud --no-example --use-npm --install --git-init
```

Then start it in development mode:

```bash
cd motif-cms
npm run develop
```

1. The admin opens at http://localhost:1337/admin.
2. Create the **first admin user** (this becomes Super Admin). Use a real email and a strong password.

> `npm run develop` = dev mode, the Content-Type Builder can edit schemas.
> `npm run start` = production mode, schemas are locked. Always change content types **locally**, commit, then deploy.

### Project files you'll touch

```
motif-cms/
  config/
    admin.ts        // admin URL, preview config
    database.ts     // reads DATABASE_* env vars (generated)
    server.ts       // host, port, public URL, proxy
    middlewares.ts  // security / CSP
    plugins.ts      // upload provider (later)
  src/
    api/blog/content-types/blog/schema.json
    api/post/content-types/post/schema.json
    api/tag/content-types/tag/schema.json
    api/author/content-types/author/schema.json
    components/shared/seo.json
  .env              // secrets, never commit
```

---

## 4. Build the content types

Use the **Content-Type Builder** in the admin (dev mode). It writes the `schema.json` files for you. The JSON below is the target result, useful for review or for pasting directly.

Order: create `shared.seo` component → Tag → Author → Blog → Post (Post last because it links to everything).

### 4.1 Component: `shared.seo`
Content-Type Builder → **Create new component** → category `shared`, name `seo`.

| Field | Type |
|---|---|
| `metaTitle` | Text (short) |
| `metaDescription` | Text (long), max 160 |
| `ogImage` | Media, single, images only |
| `noIndex` | Boolean, default false |
| `canonicalUrl` | Text (short) |

### 4.2 Tag (collection type)
| Field | Type |
|---|---|
| `name` | Text, required, unique |
| `slug` | UID, attached to `name`, required |

### 4.3 Author (collection type)
| Field | Type |
|---|---|
| `name` | Text, required |
| `slug` | UID from `name` |
| `avatar` | Media, single image |
| `bio` | Text (long) |

### 4.4 Blog (collection type, Draft & Publish **on**)
`src/api/blog/content-types/blog/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "blogs",
  "info": { "singularName": "blog", "pluralName": "blogs", "displayName": "Blog" },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title":       { "type": "string", "required": true },
    "slug":        { "type": "uid", "targetField": "title", "required": true },
    "description": { "type": "text" },
    "cover":       { "type": "media", "multiple": false, "allowedTypes": ["images"] },
    "order":       { "type": "integer", "default": 0 },
    "posts": {
      "type": "relation", "relation": "oneToMany",
      "target": "api::post.post", "mappedBy": "blog"
    },
    "relatedBlogs": {
      "type": "relation", "relation": "manyToMany",
      "target": "api::blog.blog"
    },
    "seo": { "type": "component", "repeatable": false, "component": "shared.seo" }
  }
}
```

### 4.5 Post (collection type, Draft & Publish **on**)
`src/api/post/content-types/post/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "posts",
  "info": { "singularName": "post", "pluralName": "posts", "displayName": "Post" },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title":   { "type": "string", "required": true },
    "slug":    { "type": "uid", "targetField": "title", "required": true },
    "blog": {
      "type": "relation", "relation": "manyToOne",
      "target": "api::blog.blog", "inversedBy": "posts"
    },
    "excerpt": { "type": "text", "maxLength": 300 },
    "content": { "type": "blocks" },
    "cover":   { "type": "media", "multiple": false, "allowedTypes": ["images"] },
    "template": {
      "type": "enumeration",
      "enum": ["template_1", "template_2", "template_3", "template_4", "template_5"],
      "default": "template_1",
      "required": true
    },
    "isFeatured": { "type": "boolean", "default": false },
    "author": {
      "type": "relation", "relation": "manyToOne",
      "target": "api::author.author"
    },
    "tags": {
      "type": "relation", "relation": "manyToMany",
      "target": "api::tag.tag"
    },
    "seo": { "type": "component", "repeatable": false, "component": "shared.seo" }
  }
}
```

Notes:
- Enumeration values must **start with a letter** (`template_1`, not `1`), or Strapi can crash when GraphQL is added.
- Strapi can't make a relation "required" in the schema the way it does for text. Enforce "a post must have a blog" in a lifecycle hook or just in the editor workflow (the Next app skips posts without a blog).
- After saving, Strapi restarts and the types show up in **Content Manager**.

### 4.6 Make the editor friendly
Content Manager → Post → **Configure the view**:
- Put `title`, `slug`, `blog`, `template` at the top.
- Add a description to `template`: *"1 Classic · 2 Magazine · 3 Full-bleed · 4 Split hero · 5 Minimal"*.
- Set list view columns: title, blog, template, status, updatedAt.

---

## 5. Permissions & API token

### 5.1 Lock the public API
Settings → Users & Permissions plugin → Roles → **Public**: leave every permission **unticked**. The Next app uses a token instead, so nothing is public.

### 5.2 Create a read-only API token for the Next app
Settings → API Tokens → **Create new API token**:
- Name: `next-app-read`
- Duration: Unlimited
- Type: **Custom** → tick only `find` and `findOne` on Blog, Post, Tag, Author (and Upload `find` if needed).

Copy the token **once** (it is shown only at creation) into the Next app's `.env` as `STRAPI_API_TOKEN`. Never expose it to the browser (no `NEXT_PUBLIC_` prefix).

### 5.3 Admin users and roles
Settings → Administration panel → Users / Roles:
- **Super Admin**: you.
- **Editor**: create, edit, publish everything.
- **Author**: create and edit own drafts, cannot publish.

---

## 6. Test the API

Strapi 5 returns flat objects (no `attributes` wrapper) with a `documentId`.

```bash
# list published posts with their blog and cover
curl -H "Authorization: Bearer $STRAPI_API_TOKEN" \
  "http://localhost:1337/api/posts?populate[blog]=true&populate[cover]=true&sort=publishedAt:desc"

# one post by slug, everything needed for the post page
curl -H "Authorization: Bearer $STRAPI_API_TOKEN" \
  "http://localhost:1337/api/posts?filters[slug][\$eq]=my-first-post&populate[blog]=true&populate[cover]=true&populate[author][populate]=avatar&populate[tags]=true&populate[seo][populate]=ogImage"

# drafts (used only in preview mode)
curl -H "Authorization: Bearer $STRAPI_API_TOKEN" \
  "http://localhost:1337/api/posts?status=draft"
```

Expected shape (trimmed):

```json
{
  "data": [
    {
      "id": 3,
      "documentId": "w7vfs319acmaxnurjk5vaaza",
      "title": "My first post",
      "slug": "my-first-post",
      "template": "template_2",
      "blog": { "title": "Brand Strategy", "slug": "brand-strategy" },
      "publishedAt": "2026-10-04T10:00:00.000Z"
    }
  ],
  "meta": { "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 1 } }
}
```

Tip: install `qs` in the Next app to build these query strings from objects.

---

## 7. Connect the Next app (this repo)

### 7.1 Env vars (`.env` in this repo)
```bash
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=            # from step 5.2
STRAPI_WEBHOOK_SECRET=       # any long random string, also set in Strapi webhook (step 8)
PREVIEW_SECRET=              # any long random string, also set in Strapi .env (step 9)
```

### 7.2 Images
`next.config.ts` → `images`:
```ts
remotePatterns: [
  { protocol: "http",  hostname: "localhost", port: "1337", pathname: "/uploads/**" },
  { protocol: "https", hostname: "cms.wemotif.com", pathname: "/uploads/**" },
],
```
Strapi returns media URLs like `/uploads/abc.webp` (relative). Prefix them with `STRAPI_URL` in `src/lib/strapi/media.ts`.

### 7.3 Fetch client sketch (`src/lib/strapi/client.ts`)
```ts
import qs from "qs";
import { draftMode } from "next/headers";

export async function strapiFetch<T>(path: string, query: object = {}, tags: string[] = []) {
  const { isEnabled: isDraft } = await draftMode();
  const params = qs.stringify(isDraft ? { ...query, status: "draft" } : query, { encodeValuesOnly: true });

  const res = await fetch(`${process.env.STRAPI_URL}/api/${path}?${params}`, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    next: isDraft ? { revalidate: 0 } : { tags: ["strapi", ...tags] },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status} on ${path}`);
  return (await res.json()) as T;
}
```

### 7.4 Template mapping
```ts
const n = Number(post.template?.replace("template_", "")) || 1;
const Template = TEMPLATES[n] ?? TEMPLATES[1];
```

---

## 8. Webhook → refresh pages after publishing

### 8.1 Next app route `src/app/api/revalidate/route.ts`
```ts
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  if (req.headers.get("x-webhook-secret") !== process.env.STRAPI_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await req.json();             // { event, model, entry, ... }
  revalidateTag("strapi");                   // simple: refresh all blog data
  return Response.json({ revalidated: true, event: body.event, model: body.model });
}
```
Start simple (one tag for everything). Later, use `body.model` + `body.entry.slug` to refresh only the affected pages.

### 8.2 Strapi side
Settings → **Webhooks** → Create:
- Name: `next-revalidate`
- URL: `http://localhost:3000/api/revalidate` (prod: `https://wemotif.com/api/revalidate`)
- Header: `x-webhook-secret` = same value as `STRAPI_WEBHOOK_SECRET`
- Events: Entry → **create, update, delete, publish, unpublish**; Media → update, delete.
- Click **Trigger** to test; expect a 200.

Also: in `src/middleware.ts` of this repo, exclude `/api/revalidate` and `/api/preview` from the prerender/bot logic (the matcher already skips `api/`, double-check).

---

## 9. Draft preview (see a draft in its template)

> Check that the Preview feature is available on your Strapi plan/version before relying on it. Without it, editors can still preview by opening `/api/preview?...` links manually.

### 9.1 Strapi `.env`
```bash
CLIENT_URL=http://localhost:3000      # prod: https://wemotif.com
PREVIEW_SECRET=                       # same as Next app
```

### 9.2 Strapi `config/admin.ts` (add the `preview` block)
```ts
const getPreviewPathname = (uid: string, document: any): string | null => {
  switch (uid) {
    case "api::post.post":
      return document?.blog?.slug ? `/blogs/${document.blog.slug}/${document.slug}` : null;
    case "api::blog.blog":
      return `/blogs/${document.slug}`;
    default:
      return null;                    // no preview for Tag/Author
  }
};

export default ({ env }) => ({
  // ...keep the generated auth/apiToken/transfer settings
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env("CLIENT_URL"),
      async handler(uid, { documentId, status }) {
        const document = await strapi.documents(uid).findOne({ documentId, populate: ["blog"] });
        const pathname = getPreviewPathname(uid, document);
        if (!pathname) return null;
        const params = new URLSearchParams({ url: pathname, secret: env("PREVIEW_SECRET"), status });
        return `${env("CLIENT_URL")}/api/preview?${params}`;
      },
    },
  },
});
```

### 9.3 Next app route `src/app/api/preview/route.ts`
```ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }
  const draft = await draftMode();                      // async in Next 15
  searchParams.get("status") === "published" ? draft.disable() : draft.enable();

  const url = searchParams.get("url") || "/";
  redirect(url.startsWith("/") ? url : "/");            // only internal paths
}
```

---

## 10. Production deploy (VPS)

### 10.1 Database
```bash
sudo -u postgres psql -c "CREATE USER strapi WITH PASSWORD '<strong-password>';"
sudo -u postgres psql -c "CREATE DATABASE motif_cms OWNER strapi;"
```

### 10.2 Strapi production `.env` (names only; generate fresh random values)
```bash
HOST=127.0.0.1
PORT=1337
PUBLIC_URL=https://cms.wemotif.com
APP_KEYS=                 # 4 comma-separated random strings
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
ENCRYPTION_KEY=
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=motif_cms
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=
DATABASE_SSL=false
CLIENT_URL=https://wemotif.com
PREVIEW_SECRET=
NODE_ENV=production
```
Random value: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### 10.3 `config/server.ts` (behind nginx)
```ts
export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL"),
  proxy: true,
  app: { keys: env.array("APP_KEYS") },
});
```

### 10.4 Build and run with PM2
```bash
cd /var/www/motif-cms
git pull
npm ci
NODE_ENV=production npm run build
pm2 start npm --name motif-cms -- run start     # first time
pm2 restart motif-cms                           # later deploys
pm2 save
```

### 10.5 nginx (`cms.wemotif.com`)
```nginx
server {
  server_name cms.wemotif.com;
  client_max_body_size 50M;                     # image uploads

  location / {
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```
Then SSL: `sudo certbot --nginx -d cms.wemotif.com`. Add the DNS A record for `cms` first.

### 10.6 After first deploy
1. Open https://cms.wemotif.com/admin, create the Super Admin.
2. Recreate the **API token** (step 5.2) and **webhook** (step 8.2) with production URLs. Tokens are not shared between environments.
3. Move content from local if needed: `npx strapi transfer --to https://cms.wemotif.com/admin` (needs a transfer token created in production admin), or re-enter it.
4. Update the Next app production `.env` (`STRAPI_URL=https://cms.wemotif.com`, token, secrets) and redeploy it.

### 10.7 Backups
- Nightly: `pg_dump motif_cms | gzip > /backups/motif_cms_$(date +%F).sql.gz` (cron), keep 14 days.
- Nightly: archive `motif-cms/public/uploads/`.
- Or move uploads to S3/R2 with `@strapi/provider-upload-aws-s3` in `config/plugins.ts`.

---

## 11. Security checklist
- [ ] Public role has **no** permissions.
- [ ] API token is read-only and only used server-side.
- [ ] Webhook secret and preview secret checked in the Next routes.
- [ ] `.env` files never committed (check `.gitignore` in both repos).
- [ ] Strong Super Admin password; only the people who need it get admin accounts.
- [ ] Strapi admin not indexed: add `X-Robots-Tag: noindex` header in nginx for `cms.wemotif.com`.
- [ ] Content-type changes only made locally in dev mode, then deployed.
- [ ] Keep Strapi updated: `npx @strapi/upgrade minor` (test locally first).

---

## 12. Troubleshooting

| Problem | Likely cause / fix |
|---|---|
| `create-strapi` fails on Node version | Use Node 22 or 24 (`nvm use 22`). |
| API returns **403 Forbidden** | Token missing/wrong, or token type lacks `find`/`findOne` for that type. |
| API returns **404** for `/api/posts` | Content type not created, or Strapi not restarted after schema change. |
| Relations / images missing in response | Strapi doesn't populate by default; add `populate[...]` to the query. |
| Draft content shows on live site | Fetch is passing `status=draft` outside draft mode; check `draftMode()` logic. |
| Live site doesn't update after publish | Webhook URL/secret wrong; check Settings → Webhooks → Trigger, and Next logs. |
| Images don't load in Next | Missing `remotePatterns`, or the relative `/uploads/...` URL wasn't prefixed with `STRAPI_URL`. |
| Upload fails with 413 | Raise nginx `client_max_body_size`. |
| Can't edit content types in production | Expected. Production mode locks schemas; change locally and redeploy. |
