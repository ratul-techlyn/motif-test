import type { Metadata } from "next";

export const dtcSEO: Metadata = {
  title: "Not a DTC Agency — A Brand Growth Partner — MOTIF®",
  description:
    "DTC agencies recycle templates and burn budgets. MOTIF® is the incubator company, not a DTC agency, scaling fashion, beauty and luxury with strategy, design and culture.",
  alternates: { canonical: "https://wemotif.com/not-a-dtc-agency" },
  openGraph: {
    url: "https://wemotif.com/not-a-dtc-agency",
    siteName: "MOTIF®",
    title: "DTC Growth — Strategy Before Spend",
    description:
      "Clarity on positioning, pipeline & profitability—then scale the right levers.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "DTC Growth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DTC Growth — Strategy Before Spend",
    description: "Grow margins, not just media budgets.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
