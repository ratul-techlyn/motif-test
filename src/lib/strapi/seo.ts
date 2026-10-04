import type { Metadata } from "next";
import { mediaUrl } from "./media";
import type { Seo, StrapiMedia } from "./types";

export const SITE_URL = "https://wemotif.com";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

type Input = {
  path: string;
  title: string;
  description?: string | null;
  seo?: Seo | null;
  image?: StrapiMedia | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
};

export function buildMetadata({ path, title, description, seo, image, type = "website", publishedTime, modifiedTime }: Input): Metadata {
  const metaTitle = seo?.metaTitle || `${title} — MOTIF®`;
  const metaDescription = seo?.metaDescription || description || undefined;
  const canonical = seo?.canonicalUrl || `${SITE_URL}${path}`;
  const ogImage = mediaUrl(seo?.ogImage) || mediaUrl(image) || DEFAULT_OG;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      url: canonical,
      siteName: "MOTIF®",
      title: metaTitle,
      description: metaDescription,
      type,
      images: [{ url: ogImage, alt: title }],
      ...(type === "article" ? { publishedTime: publishedTime ?? undefined, modifiedTime: modifiedTime ?? undefined } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}
