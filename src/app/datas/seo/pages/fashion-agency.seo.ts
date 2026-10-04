import type { Metadata } from "next";

export const fashionSEO: Metadata = {
  title: "Not A Fashion Branding or Advertising Agency — An Incubator — MOTIF®",
  description:
    "Agencies chase trends and leave fashion brands stuck in campaigns. MOTIF® is the incubator company, not a fashion marketing agency, scaling apparel and couture with culture, strategy and design.",
  alternates: { canonical: "https://wemotif.com/fashion-agency" },
  openGraph: {
    url: "https://wemotif.com/fashion-agency",
    siteName: "MOTIF®",
    title: "Fashion Brand Growth — Beyond the Agency Model",
    description:
      "From positioning to performance—build an enduring fashion brand, not ad spend addiction.",
    images: [{ url: "https://wemotif.com/og-image.jpg", width: 1200, height: 630, alt: "Fashion Brand Growth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Brand Growth — Beyond the Agency Model",
    description: "Strategy × story × store. Designed for profitability.",
    images: ["https://wemotif.com/og-image.jpg"],
  },
  other: { "pinterest-rich-pin": "true" },
};
