import BlocksRenderer from "@/components/blog/BlocksRenderer";
import PostMeta from "@/components/blog/PostMeta";
import { RelatedPosts } from "@/components/blog/RelatedSections";
import Reveal from "@/components/blog/Reveal";
import ShareLinks from "@/components/blog/ShareLinks";
import { AuthorBox, CoverImage, TagList, type TemplateProps } from "./shared";

// 3 · Full-bleed visual: full-screen hero, wide body, big quotes, reveal on scroll
export default function TemplateFullBleed({ post, related, readMinutes, url }: TemplateProps) {
  return (
    <article>
      <header className="relative flex min-h-screen items-end overflow-hidden">
        <CoverImage post={post} className="absolute inset-0" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative w-full px-[5vw] pb-[8vh]">
          <PostMeta post={post} readMinutes={readMinutes} />
          <h1 className="mt-6 font-clash text-[13vw] font-semibold uppercase leading-[0.9] text-white md:text-[7.5vw]">{post.title}</h1>
        </div>
      </header>

      {post.excerpt && (
        <section className="px-[5vw] py-20 md:py-32">
          <p className="max-w-5xl font-clash !text-3xl font-medium leading-tight !text-white md:!text-5xl">{post.excerpt}</p>
        </section>
      )}

      <Reveal className="layout_normal w-[90%] max-w-4xl pb-16 [&_blockquote]:md:-mx-24 [&_blockquote]:md:border-l-0 [&_blockquote]:md:pl-0 [&_blockquote]:md:text-center [&_blockquote]:md:text-5xl [&_blockquote]:md:leading-tight [&_figure]:md:-mx-32">
        <BlocksRenderer blocks={post.content} size="lg" />
      </Reveal>

      <div className="layout_normal w-[90%] max-w-4xl pb-16">
        <TagList post={post} />
        <ShareLinks url={url} title={post.title} className="mt-8 border-t border-white/10 pt-8" />
        <AuthorBox post={post} className="mt-10" />
      </div>

      <RelatedPosts posts={related} />
    </article>
  );
}
