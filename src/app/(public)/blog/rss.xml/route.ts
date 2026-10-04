import { postHref } from "@/components/blog-card";
import { getAllPostPaths } from "@/lib/strapi/queries";
import { SITE_URL } from "@/lib/strapi/seo";

// Rendered per request (Strapi may be unreachable at build time); Strapi fetches are still cached by tag
export const dynamic = "force-dynamic";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = (await getAllPostPaths()).filter((p) => p.blog).slice(0, 50);

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}${postHref(p)}</link>
      <guid isPermaLink="true">${SITE_URL}${postHref(p)}</guid>
      ${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ""}
      ${p.blog ? `<category>${esc(p.blog.title)}</category>` : ""}
      ${p.excerpt ? `<description>${esc(p.excerpt)}</description>` : ""}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MOTIF® Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Brand strategy, ecommerce growth and culture from MOTIF®.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
