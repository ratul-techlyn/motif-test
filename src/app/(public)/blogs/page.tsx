import type { Metadata } from "next";
import Link from "next/link";
import BlogTile from "@/components/blog/BlogTile";
import JsonLd from "@/components/blog/JsonLd";
import { getBlogs } from "@/lib/strapi/queries";
import { buildMetadata, SITE_URL } from "@/lib/strapi/seo";

export const metadata: Metadata = buildMetadata({
  path: "/blogs",
  title: "All Blogs",
  description: "Browse every MOTIF® blog: brand strategy, ecommerce growth, culture and more.",
});

export default async function AllBlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "MOTIF® Blogs",
          url: `${SITE_URL}/blogs`,
          hasPart: blogs.map((b) => ({ "@type": "Blog", name: b.title, url: `${SITE_URL}/blogs/${b.slug}` })),
        }}
      />

      <section className="layout_normal w-[90%] pb-12 pt-28 md:pt-40">
        <p className="!text-xs uppercase tracking-[0.3em] !text-[#F65516]">MOTIF® Journal</p>
        <h1 className="mt-4 font-clash text-5xl font-semibold leading-none text-white md:text-7xl lg:text-8xl">All Blogs</h1>
        <p className="mt-6 max-w-2xl !text-base !text-white/60 md:!text-lg">
          Pick a topic. Every blog is a focused collection of posts.
        </p>
        <Link href="/blog" className="mt-8 inline-block font-helvetica text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
          Or read every post &rarr;
        </Link>
      </section>

      <section className="layout_normal w-[90%] pb-24">
        {blogs.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogTile key={blog.documentId} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center !text-lg !text-white/60">No blogs yet.</p>
        )}
      </section>
    </>
  );
}
