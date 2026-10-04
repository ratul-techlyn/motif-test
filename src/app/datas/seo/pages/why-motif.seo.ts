import type { Metadata } from "next";

export const whyMotifSEO: Metadata = {
  title: "Why MOTIF® — An Incubator, Not an Agency",
  description:
    "Every agency promised growth. What brands got was noise. MOTIF® flips the script an incubator company shaping fashion, beauty & luxury with lasting impact.",
  alternates: { canonical: "https://wemotif.com/why-motif" },
  openGraph: {
    url: "https://wemotif.com/why-motif",
    siteName: "MOTIF®",
    title: "Why MOTIF® — A True Brand Growth Partner",
    description:
      "Less billing, more building: partners, not vendors. Outcomes, not outputs.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "Why MOTIF®" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why MOTIF® — An Incubator, Not an Agency",
    description: "Choose a model designed for durability—not monthly bursts.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
