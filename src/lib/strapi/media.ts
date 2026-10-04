import type { StrapiMedia } from "./types";

// Strapi returns local uploads as relative paths (/uploads/x.webp); S3/R2 uploads are absolute
export function mediaUrl(media?: Pick<StrapiMedia, "url"> | null): string | null {
  if (!media?.url) return null;
  if (/^https?:\/\//.test(media.url)) return media.url;
  return `${process.env.STRAPI_URL ?? ""}${media.url}`;
}

export function mediaAlt(media: StrapiMedia | null | undefined, fallback: string): string {
  return media?.alternativeText || fallback;
}
