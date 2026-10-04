import type { Metadata } from "next";

export const cultureSEO: Metadata = {
  title: "Culture at MOTIF® — Where Creative Minds Thrive",
  description:
    "Join our culture-driven team at MOTIF®. Experience collaborative innovation, creative freedom, and career growth in our luxury brand incubator environment.",
  openGraph: {
    type: "website",
    url: "https://wemotif.com/culture",
    siteName: "MOTIF®",
    title: "Culture at MOTIF® — Where Creative Minds Thrive", 
    description:
      "Join our culture-driven team at MOTIF®. Experience collaborative innovation, creative freedom, and career growth in our luxury brand incubator environment.",
    images: [
      { 
        url: "https://wemotif.com/assets/culture/culture-page-banner.webp", 
        width: 1200, 
        height: 630,
        alt: "MOTIF Culture - Team collaboration"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Culture at MOTIF® — Where Creative Minds Thrive",
    description:
      "Join our culture-driven team at MOTIF®. Experience collaborative innovation, creative freedom, and career growth.",
    images: ["https://wemotif.com/assets/culture/culture-page-banner.webp"],
  },
  alternates: { 
    canonical: "https://wemotif.com/culture" 
  },
  other: { 
    "pinterest-rich-pin": "true",
    "robots": "index, follow",
    "revisit-after": "7 days"
  },
};