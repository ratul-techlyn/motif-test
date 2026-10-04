import type { Metadata } from "next";

export const homepageSEO: Metadata = {
  title: "MOTIF® — Brand Incubator & Growth Partner",
  description:
    "MOTIF® builds, grows & scales fashion, luxury lifestyle & beauty brands. Not an agency but an incubator company powered by strategy, art, design & tech.",

  alternates: {
    canonical: "https://wemotif.com/",
  },

  openGraph: {
    type: "website",
    url: "https://wemotif.com/",
    siteName: "MOTIF®",
    title: "MOTIF® — Brand Incubator & Growth Partner",
    description:
      "MOTIF® builds, grows & scales fashion, luxury lifestyle & beauty brands. Not an agency but an incubator company powered by strategy, art, design & tech.",
    images: [
      {
        url: "https://wemotif.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MOTIF® — Brand Incubator & Growth Partner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MOTIF® — Brand Incubator & Growth Partner",
    description:
      "We grow fashion, beauty & luxury lifestyle brands — sustainably & profitably. Not an agency.",
    images: ["https://wemotif.com/og-image.jpg"],
  },

  other: {
    "pinterest-rich-pin": "true",
    "p:domain_verify": "YOUR_PINTEREST_VERIFICATION_TOKEN", // replace with real token
  },

  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
    other: {
      "msvalidate.01": "YOUR_BING_VERIFICATION_TOKEN",
    },
  },
};