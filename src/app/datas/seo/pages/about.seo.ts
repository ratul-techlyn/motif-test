import type { Metadata } from "next";

export const aboutSEO: Metadata = {
  title: "About — MOTIF®",
  description:
    "MOTIF® was never built to be an agency. Born from grit, rebuilt with vision. An incubator company growing fashion, luxury lifestyle & beauty with culture & design.",
  alternates: { canonical: "https://wemotif.com/about" },
  openGraph: {
    url: "https://wemotif.com/about",
    siteName: "MOTIF®",
    title: "About MOTIF® — The Brand Incubator",
    description:
      "We fuse art & data, culture & commerce to grow brands with staying power.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "About MOTIF®" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — MOTIF®",
    description: "Meet the incubator behind category-defining brands.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
