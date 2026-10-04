// app/datas/schema/services.schema.tsx
import { ORG_ID } from "./ids";
import { TERM } from "./ids";

export const services = [
  {
    "@type": "Service",
    "@id": "https://wemotif.com/#service-incubation",
    name: "Brand Incubation",
    serviceType: "Incubation",
    description:
      "Full-stack growth partnership to scale brands from ~US$100K/mo toward ~US$400K/mo across creative, tech, media, retention, and CX.",
    provider: { "@id": ORG_ID },
    areaServed: "Global",
    audience: { "@type": "BusinessAudience", audienceType: "DTC & Retail brands" },
    about: [{ "@id": TERM.INCUBATION }, { "@id": TERM.PROFIT_SHARE }, { "@id": TERM.CXO }],
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "CompoundPriceSpecification",
        priceComponent: [
          { "@type": "UnitPriceSpecification", price: 0.18, priceCurrency: "USD", unitText: "profitShareLowerBound" },
          { "@type": "UnitPriceSpecification", price: 0.22, priceCurrency: "USD", unitText: "profitShareUpperBound" },
          { "@type": "UnitPriceSpecification", price: 35000, priceCurrency: "USD", unitText: "monthlyCap" }
        ]
      },
      eligibleCustomerType: "Business",
    },
  },
  {
    "@type": "Service",
    "@id": "https://wemotif.com/#service-acceleration",
    name: "Brand Acceleration",
    serviceType: "Acceleration",
    description:
      "Phased execution and advisory to help startups and emerging brands reach ~US$100K/mo and beyond.",
    provider: { "@id": ORG_ID },
    areaServed: "Global",
    audience: { "@type": "BusinessAudience", audienceType: "Startups & Emerging Brands" },
    about: [{ "@id": TERM.ACCELERATION }, { "@id": TERM.BRANDX }, { "@id": TERM.GROWTHX }],
  },
  {
    "@type": "Service",
    "@id": "https://wemotif.com/#service-consulting",
    name: "Consulting & Mentoring",
    serviceType: "Strategy & Advisory",
    description: "1:1 strategic consulting and mentoring for founders and operators pre- or post-program.",
    provider: { "@id": ORG_ID },
    areaServed: "Global",
    about: [{ "@id": TERM.BRANDX }, { "@id": TERM.CXO }],
  },
];

export function ServicesScript() {
  const graph = { "@context": "https://schema.org", "@graph": services };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}