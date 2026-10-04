import BlocksRenderer from "@/components/blog/BlocksRenderer";
import PostMeta from "@/components/blog/PostMeta";
import { RelatedPosts } from "@/components/blog/RelatedSections";
import ShareLinks from "@/components/blog/ShareLinks";
import { AuthorBox, CoverImage, TagList, type TemplateProps } from "./shared";

// 1 · Classic: title, meta, cover, single centred reading column
export default function TemplateClassic({ post, related, readMinutes, url }: TemplateProps) {
  return (
    <article>
      <header className="layout_normal w-[90%] max-w-3xl pb-10 pt-28 text-center md:pt-40">
        <PostMeta post={post} readMinutes={readMinutes} className="justify-center" />
        <h1 className="mt-6 font-clash text-4xl font-semibold leading-tight text-white md:text-6xl">{post.title}</h1>
        {post.excerpt && <p className="mx-auto mt-6 max-w-2xl !text-lg !text-white/60">{post.excerpt}</p>}
      </header>

      <CoverImage post={post} className="layout_normal aspect-[16/9] w-[90%] max-w-5xl rounded-lg" sizes="(max-width: 1100px) 90vw, 1024px" />

      <div className="layout_normal w-[90%] max-w-3xl py-12 md:py-16">
        <BlocksRenderer blocks={post.content} />
        <TagList post={post} className="mt-12" />
        <ShareLinks url={url} title={post.title} className="mt-8 border-t border-white/10 pt-8" />
        <AuthorBox post={post} className="mt-10" />
      </div>

      <RelatedPosts posts={related} />
    </article>
  );
}
