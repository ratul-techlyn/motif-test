import type { Metadata } from "next";

export const whatWeDoSEO: Metadata = {
  title: "What We Do — Incubation, Acceleration & Consulting — MOTIF®",
  description:
    "Agencies chase campaigns. MOTIF® builds legacies. An incubator company scaling fashion, luxury lifestyle & beauty brands with strategy, art, design & tech.",
  alternates: { canonical: "https://wemotif.com/what-we-do" },
  openGraph: {
    url: "https://wemotif.com/what-we-do",
    siteName: "MOTIF®",
    title: "What We Do — Incubation, Acceleration & Consulting",
    description:
      "Positioning, growth systems & brand experience engineered for long-term profitability.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "MOTIF® Services — Incubation, Acceleration, Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Do — Incubation, Acceleration & Consulting",
    description: "Brand building without agency fluff. Real strategy, measurable growth.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
