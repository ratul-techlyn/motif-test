import type { Metadata } from "next";

export const shopifyB2BSEO: Metadata = {
  title: "PulseB2B — Shopify B2B Agency — MOTIF®",
  description:
    "PulseB2B goes beyond Shopify B2B Edition. We architect wholesale ops—quotes, approvals, catalogs & ERP workflows—so teams scale clean without cracks.",
  alternates: { canonical: "https://wemotif.com/pulse-b2b-shopify-b2b-agency" },
  openGraph: {
    url: "https://wemotif.com/pulse-b2b-shopify-b2b-agency",
    siteName: "MOTIF®",
    title: "Shopify B2B — Wholesale, Reimagined",
    description:
      "Buyer UX and operations aligned—repeat orders, higher AOV, cleaner ops.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "Shopify B2B" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify B2B — Wholesale, Reimagined",
    description: "PulseB2B builds Shopify B2B systems that actually scale.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
