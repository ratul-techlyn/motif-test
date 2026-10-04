import BlogCard from "@/components/blog-card";
import BlogTile from "@/components/blog/BlogTile";
import type { BlogSummary, PostSummary } from "@/lib/strapi/types";

export function RelatedPosts({ posts, title = "Related posts" }: { posts: PostSummary[]; title?: string }) {
  if (!posts.length) return null;
  return (
    <section className="layout_normal w-[90%] border-t border-white/10 py-16 md:py-24">
      <h2 className="mb-10 font-clash text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.documentId} post={post} variant="stacked" />
        ))}
      </div>
    </section>
  );
}

export function RelatedBlogs({ blogs, title = "Related blogs" }: { blogs: BlogSummary[]; title?: string }) {
  if (!blogs.length) return null;
  return (
    <section className="layout_normal w-[90%] border-t border-white/10 py-16 md:py-24">
      <h2 className="mb-10 font-clash text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogTile key={blog.documentId} blog={blog} />
        ))}
      </div>
    </section>
  );
}
