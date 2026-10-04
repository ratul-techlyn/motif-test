import type { Metadata } from "next";

export const motifProcessSEO: Metadata = {
  title: "The MOTIF® Process — How We Build Iconic Brands",
  description:
    "Growth isn't ads on repeat. It's strategy, art & design woven into commerce. That's how MOTIF® scales fashion, beauty & luxury lifestyle brands.",
  alternates: { canonical: "https://wemotif.com/the-motif-process" },
  openGraph: {
    url: "https://wemotif.com/the-motif-process",
    siteName: "MOTIF®",
    title: "The MOTIF® Process — Strategy × Design × Tech",
    description:
      "From desirability to demand: a playbook tuned to your category, buyers & culture.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "The MOTIF® Process" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The MOTIF® Process — How We Grow Brands",
    description: "Designed to scale what matters—profit, brand equity & customer love.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
