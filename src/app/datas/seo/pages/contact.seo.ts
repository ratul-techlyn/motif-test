import type { Metadata } from "next";

export const contactSEO: Metadata = {
  title: "Contact — MOTIF®",
  description:
    "Tired of agencies that don't get it? Contact MOTIF® the incubator company helping fashion, luxury lifestyle & beauty brands grow with strategy & care.",
  alternates: { canonical: "https://wemotif.com/contact" },
  openGraph: {
    url: "https://wemotif.com/contact",
    siteName: "MOTIF®",
    title: "Contact MOTIF® — Start Your Growth Journey",
    description:
      "Let’s diagnose, prioritize & build momentum—together.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "Contact MOTIF®" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — MOTIF®",
    description: "Founders welcome. Operators welcome. Let’s build.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
