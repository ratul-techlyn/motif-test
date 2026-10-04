import { strapiFetch } from "./client";
import type { Blog, BlogSummary, Post, PostSummary, StrapiList } from "./types";

export const POSTS_PAGE_SIZE = 12;

const SUMMARY_POPULATE = {
  cover: true,
  blog: { fields: ["title", "slug"] },
};

const SUMMARY_FIELDS = ["title", "slug", "excerpt", "template", "isFeatured", "publishedAt", "updatedAt"];

const BLOG_SUMMARY_QUERY = {
  fields: ["title", "slug", "description", "order"],
  populate: { cover: true, posts: { fields: ["documentId"] } },
};

// ---- Posts ----

export async function getPosts({
  page = 1,
  pageSize = POSTS_PAGE_SIZE,
  blogSlug,
  excludeDocumentId,
}: {
  page?: number;
  pageSize?: number;
  blogSlug?: string;
  excludeDocumentId?: string;
} = {}) {
  const filters: Record<string, unknown> = {};
  if (blogSlug) filters.blog = { slug: { $eq: blogSlug } };
  if (excludeDocumentId) filters.documentId = { $ne: excludeDocumentId };

  return strapiFetch<StrapiList<PostSummary>>("posts", {
    fields: SUMMARY_FIELDS,
    populate: SUMMARY_POPULATE,
    filters,
    sort: ["publishedAt:desc"],
    pagination: { page, pageSize },
  });
}

export async function getFeaturedPost(): Promise<PostSummary | null> {
  const res = await strapiFetch<StrapiList<PostSummary>>("posts", {
    fields: SUMMARY_FIELDS,
    populate: SUMMARY_POPULATE,
    filters: { isFeatured: { $eq: true } },
    sort: ["publishedAt:desc"],
    pagination: { page: 1, pageSize: 1 },
  });
  return res.data[0] ?? null;
}

export async function getPost(blogSlug: string, postSlug: string): Promise<Post | null> {
  const res = await strapiFetch<StrapiList<Post>>("posts", {
    filters: { slug: { $eq: postSlug }, blog: { slug: { $eq: blogSlug } } },
    populate: {
      cover: true,
      blog: { fields: ["title", "slug"] },
      author: { populate: { avatar: true } },
      tags: true,
      seo: { populate: { ogImage: true } },
    },
    pagination: { page: 1, pageSize: 1 },
  });
  return res.data[0] ?? null;
}

// Same blog first, then posts sharing a tag, newest first
export async function getRelatedPosts(post: Post, limit = 3): Promise<PostSummary[]> {
  const sameBlog = post.blog
    ? (await getPosts({ blogSlug: post.blog.slug, excludeDocumentId: post.documentId, pageSize: limit })).data
    : [];
  if (sameBlog.length >= limit || !post.tags?.length) return sameBlog;

  const exclude = [post.documentId, ...sameBlog.map((p) => p.documentId)];
  const byTag = await strapiFetch<StrapiList<PostSummary>>("posts", {
    fields: SUMMARY_FIELDS,
    populate: SUMMARY_POPULATE,
    filters: {
      documentId: { $notIn: exclude },
      tags: { slug: { $in: post.tags.map((t) => t.slug) } },
    },
    sort: ["publishedAt:desc"],
    pagination: { page: 1, pageSize: limit - sameBlog.length },
  });
  return [...sameBlog, ...byTag.data];
}

// Every published post (for sitemap / RSS / static params)
export async function getAllPostPaths(): Promise<PostSummary[]> {
  const all: PostSummary[] = [];
  for (let page = 1; ; page++) {
    const res = await strapiFetch<StrapiList<PostSummary>>("posts", {
      fields: SUMMARY_FIELDS,
      populate: { blog: { fields: ["title", "slug"] } },
      sort: ["publishedAt:desc"],
      pagination: { page, pageSize: 100 },
    });
    all.push(...res.data);
    if (page >= res.meta.pagination.pageCount) break;
  }
  return all;
}

// ---- Blogs ----

export async function getBlogs(): Promise<BlogSummary[]> {
  const res = await strapiFetch<StrapiList<BlogSummary>>("blogs", {
    ...BLOG_SUMMARY_QUERY,
    sort: ["order:asc", "title:asc"],
    pagination: { page: 1, pageSize: 100 },
  });
  return res.data;
}

export async function getBlog(slug: string): Promise<Blog | null> {
  const res = await strapiFetch<StrapiList<Blog>>("blogs", {
    filters: { slug: { $eq: slug } },
    populate: {
      cover: true,
      seo: { populate: { ogImage: true } },
      relatedBlogs: BLOG_SUMMARY_QUERY,
    },
    pagination: { page: 1, pageSize: 1 },
  });
  return res.data[0] ?? null;
}

// Hand-picked related blogs first, then fill with other blogs by order
export async function getRelatedBlogs(blog: Blog, limit = 3): Promise<BlogSummary[]> {
  const picked = (blog.relatedBlogs ?? []).slice(0, limit);
  if (picked.length >= limit) return picked;
  const taken = new Set([blog.documentId, ...picked.map((b) => b.documentId)]);
  const others = (await getBlogs()).filter((b) => !taken.has(b.documentId));
  return [...picked, ...others].slice(0, limit);
}
