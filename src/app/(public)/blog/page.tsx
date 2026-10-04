import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogCard, { postHref } from "@/components/blog-card";
import JsonLd from "@/components/blog/JsonLd";
import Pagination from "@/components/blog/Pagination";
import PreviewBanner from "@/components/blog/PreviewBanner";
import { formatDate } from "@/lib/strapi/blocks";
import { mediaAlt, mediaUrl } from "@/lib/strapi/media";
import { getBlogs, getFeaturedPost, getPosts } from "@/lib/strapi/queries";
import { buildMetadata, SITE_URL } from "@/lib/strapi/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  path: "/blog",
  title: "Blog",
  description: "Ideas on brand strategy, ecommerce growth and culture from MOTIF®, the incubator for fashion, beauty and luxury brands.",
});

type Props = { searchParams: Promise<{ page?: string; blog?: string }> };

export default async function AllPostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const blogSlug = params.blog || undefined;

  // Featured hero only on the unfiltered first page
  const featured = page === 1 && !blogSlug ? await getFeaturedPost() : null;
  const [posts, blogs] = await Promise.all([
    getPosts({ page, blogSlug, excludeDocumentId: featured?.documentId }),
    getBlogs(),
  ]);

  const hrefFor = (n: number) => {
    const q = new URLSearchParams();
    if (blogSlug) q.set("blog", blogSlug);
    if (n > 1) q.set("page", String(n));
    const s = q.toString();
    return s ? `/blog?${s}` : "/blog";
  };
  const featuredSrc = mediaUrl(featured?.cover);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "MOTIF® Blog",
          url: `${SITE_URL}/blog`,
          blogPost: posts.data.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}${postHref(p)}` })),
        }}
      />

      <section className="layout_normal w-[90%] pb-12 pt-28 md:pt-40">
        <p className="!text-xs uppercase tracking-[0.3em] !text-[#F65516]">MOTIF® Journal</p>
        <h1 className="mt-4 font-clash text-5xl font-semibold leading-none text-white md:text-7xl lg:text-8xl">The Blog</h1>
        <p className="mt-6 max-w-2xl !text-base !text-white/60 md:!text-lg">
          Brand strategy, ecommerce growth and the culture behind building brands that last.
        </p>

        <div className="mt-10 flex flex-wrap gap-2 font-helvetica text-sm">
          <Link
            href="/blog"
            className={cn("rounded-full border px-4 py-2 transition-colors", !blogSlug ? "border-[#F65516] bg-[#F65516] text-white" : "border-white/20 text-white/70 hover:text-white")}
          >
            All
          </Link>
          {blogs.map((b) => (
            <Link
              key={b.documentId}
              href={`/blog?blog=${b.slug}`}
              className={cn("rounded-full border px-4 py-2 transition-colors", blogSlug === b.slug ? "border-[#F65516] bg-[#F65516] text-white" : "border-white/20 text-white/70 hover:text-white")}
            >
              {b.title}
            </Link>
          ))}
          <Link href="/blogs" className="px-4 py-2 text-white/50 underline-offset-4 hover:text-white hover:underline">
            Browse all blogs &rarr;
          </Link>
        </div>
      </section>

      {featured && (
        <section className="layout_normal w-[90%] pb-16">
          <Link href={postHref(featured)} className="group grid items-center gap-8 overflow-hidden rounded-lg bg-card_secondary md:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[420px]">
              {featuredSrc && (
                <Image
                  src={featuredSrc}
                  alt={mediaAlt(featured.cover, featured.title)}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            <div className="p-6 md:p-10">
              <span className="font-helvetica text-xs uppercase tracking-widest text-[#F65516]">Featured · {featured.blog?.title}</span>
              <h2 className="mt-4 font-clash text-3xl font-semibold leading-tight text-white transition-colors group-hover:text-[#F65516] md:text-5xl">
                {featured.title}
              </h2>
              {featured.excerpt && <p className="mt-4 !text-base !text-white/60">{featured.excerpt}</p>}
              <p className="mt-6 !text-sm !text-white/40">{formatDate(featured.publishedAt)}</p>
            </div>
          </Link>
        </section>
      )}

      <section className="layout_normal w-[90%] pb-24">
        {posts.data.length ? (
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {posts.data.map((post, i) => (
              <BlogCard key={post.documentId} post={post} variant="stacked" priority={!featured && i < 3} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center !text-lg !text-white/60">No posts yet. Check back soon.</p>
        )}
        <Pagination page={posts.meta.pagination.page} pageCount={posts.meta.pagination.pageCount} hrefFor={hrefFor} />
      </section>

      <PreviewBanner path="/blog" />
    </>
  );
}
