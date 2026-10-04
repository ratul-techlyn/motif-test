import type { Metadata } from "next";

export const faqsSEO: Metadata = {
  title: "Frequently Asked Questions — MOTIF® Brand Incubator",
  description:
    "Get answers to common questions about MOTIF's luxury brand incubator services, processes, and expertise in fashion, beauty, and lifestyle brands.",
  openGraph: {
    type: "website",
    url: "https://wemotif.com/faqs",
    siteName: "MOTIF®",
    title: "FAQs — MOTIF® Brand Incubator", 
    description:
      "Get answers to common questions about MOTIF's luxury brand incubator services, processes, and expertise in fashion, beauty, and lifestyle brands.",
    images: [
      { 
        url: "https://wemotif.com/og-image.jpg", 
        width: 1200, 
        height: 630,
        alt: "MOTIF FAQ - Common Questions"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs — MOTIF® Brand Incubator",
    description:
      "Get answers to common questions about MOTIF's luxury brand incubator services and processes.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  alternates: { 
    canonical: "https://wemotif.com/faqs" 
  },
  other: { 
    "pinterest-rich-pin": "true",
    "robots": "index, follow",
    "revisit-after": "7 days"
  },
};