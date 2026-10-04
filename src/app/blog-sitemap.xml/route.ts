import { postHref } from "@/components/blog-card";
import { getAllPostPaths, getBlogs } from "@/lib/strapi/queries";
import { SITE_URL } from "@/lib/strapi/seo";

// Blog URLs live in their own sitemap; the static public/sitemap.xml is left untouched
// Rendered per request (Strapi may be unreachable at build time); Strapi fetches are still cached by tag
export const dynamic = "force-dynamic";

export async function GET() {
  const [posts, blogs] = await Promise.all([getAllPostPaths(), getBlogs()]);
  const latest = posts[0]?.updatedAt;

  const urls = [
    { loc: `${SITE_URL}/blog`, lastmod: latest },
    { loc: `${SITE_URL}/blogs`, lastmod: latest },
    ...blogs.map((b) => ({ loc: `${SITE_URL}/blogs/${b.slug}`, lastmod: undefined as string | undefined })),
    ...posts.filter((p) => p.blog).map((p) => ({ loc: `${SITE_URL}${postHref(p)}`, lastmod: p.updatedAt })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ""}</url>`)
  .join("\n")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
