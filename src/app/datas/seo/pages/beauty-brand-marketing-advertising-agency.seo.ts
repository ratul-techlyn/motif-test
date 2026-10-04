import type { Metadata } from "next";

export const beautySEO: Metadata = {
  title: "Not a Beauty Brand Marketing & Advertising Agency — MOTIF® An Incubator",
  description:
    "Beauty agencies chase hacks and quick wins. MOTIF® is the incubator company, not a beauty growth agency, driving obsession and scaling beauty brands with human-first design, strategy & culture.",
  alternates: { canonical: "https://wemotif.com/beauty-brand-marketing-advertising-agency" },
  openGraph: {
    url: "https://wemotif.com/beauty-brand-marketing-advertising-agency",
    siteName: "MOTIF®",
    title: "Beauty Brand Growth — Strategy, Story, Commerce",
    description:
      "Own the moment & the relationship—premium CX, high-intent funnels & retention loops.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "Beauty Brand Growth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beauty Brand Growth — Strategy, Story, Commerce",
    description: "Build obsession. Scale sustainably. Ditch vanity metrics.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
