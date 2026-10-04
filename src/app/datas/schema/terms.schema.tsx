// app/datas/schema/terms.schema.tsx
import { TERMS_ID, TERM } from "./ids";

export const definedTermSet = {
  "@type": "DefinedTermSet",
  "@id": TERMS_ID,
  name: "MOTIF® Internal Concepts",
  hasDefinedTerm: Object.values(TERM).map((id) => ({ "@id": id })),
};

export const definedTerms = [
  { "@type": "DefinedTerm", "@id": TERM.INCUBATION, name: "Incubation", description: "Partner model for scaling Luxury Lifestyle, Fashion and Beauty brands from ~US$100K/mo to ~US$400K/mo." },
  { "@type": "DefinedTerm", "@id": TERM.ACCELERATION, name: "Acceleration", description: "Program for startups in Luxury Lifestyle, Fashion and Beauty moving toward their first ~US$100K/mo." },
  { "@type": "DefinedTerm", "@id": TERM.PROFIT_SHARE, name: "Profit-Share Model", description: "18–25% of incremental profits (cap US$35K/mo); US$15K deposit credited back; US$4K/mo minimum if growth is blocked." },
  { "@type": "DefinedTerm", "@id": TERM.INTERNAL_TEAM, name: "Not an Agency", description: "We operate like your internal team not a vendor or agency on retainers." },
  { "@type": "DefinedTerm", "@id": TERM.BRANDX, name: "BrandX", description: "Brand strategy fused with product execution to increase conversion and LTV." },
  { "@type": "DefinedTerm", "@id": TERM.GROWTHX, name: "GrowthX", description: "Proprietary growth system aligning creative, data, and channel economics." },
  { "@type": "DefinedTerm", "@id": TERM.ECOMX, name: "EcomX", description: "E-commerce growth architecture for DTC/Retail/Marketplace hybrids." },
  { "@type": "DefinedTerm", "@id": TERM.CXO, name: "CXO (Customer Experience Optimization)", description: "Framework to improve journeys, retention, and LTV through human-first design." },
  { "@type": "DefinedTerm", "@id": TERM.FASHION_GP, name: "Fashion Brands Growth Partner", description: "Industry specialization in fashion brand scaling and market expansion." },
  { "@type": "DefinedTerm", "@id": TERM.BEAUTY_GP, name: "Beauty Brands Growth Partner", description: "Specialization in beauty and wellness via creative + CX + retention." },
  { "@type": "DefinedTerm", "@id": TERM.LIFESTYLE_GP, name: "Lifestyle Brands Growth Partner", description: "Specialization in lifestyle and luxury brands across channels." },
 { "@type": "DefinedTerm", "@id": TERM.LIFESTYLE_GP, name: "Luxury Brand Growth Partner", description: "Specialization in lifestyle and luxury brands across channels." },
];

export function DefinedTermsScript() {
  const graph = { "@context": "https://schema.org", "@graph": [definedTermSet, ...definedTerms] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}