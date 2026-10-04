import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/blog/JsonLd";
import PreviewBanner from "@/components/blog/PreviewBanner";
import { blocksToText, readingMinutes, tableOfContents } from "@/lib/strapi/blocks";
import { mediaUrl } from "@/lib/strapi/media";
import { getPost, getRelatedPosts } from "@/lib/strapi/queries";
import { buildMetadata, SITE_URL } from "@/lib/strapi/seo";
import { resolveTemplate } from "./~templates";

type Props = { params: Promise<{ blogSlug: string; postSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogSlug, postSlug } = await params;
  const post = await getPost(blogSlug, postSlug);
  if (!post) return { title: "Post not found — MOTIF®", robots: { index: false } };
  return buildMetadata({
    path: `/blogs/${blogSlug}/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    seo: post.seo,
    image: post.cover,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function PostPage({ params }: Props) {
  const { blogSlug, postSlug } = await params;
  const post = await getPost(blogSlug, postSlug);
  if (!post || !post.blog) notFound();

  const path = `/blogs/${post.blog.slug}/${post.slug}`;
  const url = `${SITE_URL}${path}`;
  const related = await getRelatedPosts(post);
  const Template = resolveTemplate(post.template);
  const image = mediaUrl(post.seo?.ogImage) || mediaUrl(post.cover);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.seo?.metaDescription || post.excerpt || undefined,
              image: image ? [image] : undefined,
              datePublished: post.publishedAt ?? undefined,
              dateModified: post.updatedAt,
              wordCount: blocksToText(post.content ?? []).split(/\s+/).filter(Boolean).length,
              author: post.author ? { "@type": "Person", name: post.author.name } : { "@type": "Organization", name: "MOTIF®" },
              publisher: { "@type": "Organization", name: "MOTIF®", url: SITE_URL },
              mainEntityOfPage: url,
              isPartOf: { "@type": "Blog", name: post.blog.title, url: `${SITE_URL}/blogs/${post.blog.slug}` },
              keywords: post.tags?.map((t) => t.name).join(", ") || undefined,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Blogs", item: `${SITE_URL}/blogs` },
                { "@type": "ListItem", position: 2, name: post.blog.title, item: `${SITE_URL}/blogs/${post.blog.slug}` },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
          ],
        }}
      />

      <Template
        post={post}
        related={related}
        toc={tableOfContents(post.content ?? [])}
        readMinutes={readingMinutes(post.content ?? [])}
        url={url}
      />

      <PreviewBanner path={path} />
    </>
  );
}
