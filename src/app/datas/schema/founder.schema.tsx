// app/datas/schema/founder.schema.tsx
import { ORG_ID, ASH_ID, BASE } from "./ids";

const data = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": ASH_ID,
  name: "Ash Ome",
  jobTitle: "Founder, Creative Director & Brand Architect",
  url: `${BASE}/about`,
  worksFor: { "@id": ORG_ID },
  sameAs: ["https://linkedin.com/in/thtisash"],
  knowsAbout: ["Brand Architecture", "Script Writing", "Brand Marketing", "Integrated Marketing with Performance Marketing","Incubation Models", "Fashion Growth", "Luxury Lifestyle Branding", "CX Optimization"],
  description:
    "Founder of MOTIF®. Rebuilt the company from a traditional agency into an incubation model focused on durable, profitable brand growth.",
};

export function FounderSchemaScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const founderSchema = data;