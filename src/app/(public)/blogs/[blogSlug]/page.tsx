import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard, { postHref } from "@/components/blog-card";
import JsonLd from "@/components/blog/JsonLd";
import Pagination from "@/components/blog/Pagination";
import PreviewBanner from "@/components/blog/PreviewBanner";
import { RelatedBlogs } from "@/components/blog/RelatedSections";
import { mediaAlt, mediaUrl } from "@/lib/strapi/media";
import { getBlog, getPosts, getRelatedBlogs } from "@/lib/strapi/queries";
import { buildMetadata, SITE_URL } from "@/lib/strapi/seo";

type Props = {
  params: Promise<{ blogSlug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogSlug } = await params;
  const blog = await getBlog(blogSlug);
  if (!blog) return { title: "Blog not found — MOTIF®", robots: { index: false } };
  return buildMetadata({ path: `/blogs/${blog.slug}`, title: blog.title, description: blog.description, seo: blog.seo, image: blog.cover });
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { blogSlug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);

  const blog = await getBlog(blogSlug);
  if (!blog) notFound();

  const [posts, related] = await Promise.all([getPosts({ page, blogSlug }), getRelatedBlogs(blog)]);
  const cover = mediaUrl(blog.cover);
  const path = `/blogs/${blog.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              name: blog.title,
              description: blog.description ?? undefined,
              url: `${SITE_URL}${path}`,
              blogPost: posts.data.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}${postHref(p)}` })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Blogs", item: `${SITE_URL}/blogs` },
                { "@type": "ListItem", position: 2, name: blog.title, item: `${SITE_URL}${path}` },
              ],
            },
          ],
        }}
      />

      <section className="relative">
        {cover && (
          <div className="absolute inset-0 -z-0">
            <Image src={cover} alt={mediaAlt(blog.cover, blog.title)} fill priority className="object-cover opacity-30" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
          </div>
        )}
        <div className="layout_normal relative w-[90%] pb-16 pt-28 md:pb-24 md:pt-44">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-helvetica text-sm text-white/50">
            <Link href="/blogs" className="hover:text-white">Blogs</Link>
            <span>/</span>
            <span className="text-white/80">{blog.title}</span>
          </nav>
          <h1 className="mt-6 font-clash text-5xl font-semibold leading-none text-white md:text-7xl lg:text-8xl">{blog.title}</h1>
          {blog.description && <p className="mt-6 max-w-2xl !text-base !text-white/70 md:!text-lg">{blog.description}</p>}
          <p className="mt-6 !text-sm uppercase tracking-widest !text-white/40">
            {posts.meta.pagination.total} {posts.meta.pagination.total === 1 ? "post" : "posts"}
          </p>
        </div>
      </section>

      <section className="layout_normal w-[90%] pb-24">
        {posts.data.length ? (
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {posts.data.map((post) => (
              <BlogCard key={post.documentId} post={post} variant="stacked" />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center !text-lg !text-white/60">No posts in this blog yet.</p>
        )}
        <Pagination
          page={posts.meta.pagination.page}
          pageCount={posts.meta.pagination.pageCount}
          hrefFor={(n) => (n > 1 ? `${path}?page=${n}` : path)}
        />
      </section>

      <RelatedBlogs blogs={related} />
      <PreviewBanner path={path} />
    </>
  );
}
