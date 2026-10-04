// Shapes returned by the Strapi 5 REST API (flat documents, no `attributes` wrapper)

export type StrapiMedia = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  caption?: string | null;
  width: number | null;
  height: number | null;
  formats?: Record<string, { url: string; width: number; height: number }> | null;
};

export type Seo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: StrapiMedia | null;
  noIndex?: boolean | null;
  canonicalUrl?: string | null;
};

export type Tag = { id: number; documentId: string; name: string; slug: string };

export type Author = {
  id: number;
  documentId: string;
  name: string;
  slug?: string | null;
  bio?: string | null;
  avatar?: StrapiMedia | null;
};

// Blocks rich text (Strapi "blocks" field)
export type TextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};
export type LinkNode = { type: "link"; url: string; children: TextNode[] };
export type InlineNode = TextNode | LinkNode;
export type ListItemNode = { type: "list-item"; children: InlineNode[] };
export type ListNode = { type: "list"; format: "ordered" | "unordered"; children: (ListItemNode | ListNode)[] };
export type Block =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "quote"; children: InlineNode[] }
  | { type: "code"; children: TextNode[]; language?: string }
  | { type: "image"; image: StrapiMedia; children: InlineNode[] }
  | ListNode;

export type TemplateKey = "template_1" | "template_2" | "template_3" | "template_4" | "template_5";

export type BlogSummary = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string | null;
  cover?: StrapiMedia | null;
  order?: number | null;
  posts?: { documentId: string }[];
};

export type Blog = BlogSummary & {
  relatedBlogs?: BlogSummary[];
  seo?: Seo | null;
};

export type PostSummary = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover?: StrapiMedia | null;
  template: TemplateKey;
  isFeatured?: boolean | null;
  publishedAt: string | null;
  updatedAt: string;
  blog?: Pick<BlogSummary, "documentId" | "title" | "slug"> | null;
};

export type Post = PostSummary & {
  content?: Block[] | null;
  author?: Author | null;
  tags?: Tag[];
  seo?: Seo | null;
  createdAt: string;
};

export type Pagination = { page: number; pageSize: number; pageCount: number; total: number };

export type StrapiList<T> = { data: T[]; meta: { pagination: Pagination } };
