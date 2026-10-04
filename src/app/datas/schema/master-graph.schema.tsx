// app/datas/schema/master-graph.schema.tsx
import { organizationSchema } from "./organization.schema";
import { founderSchema } from "./founder.schema";
import { definedTermSet, definedTerms } from "./terms.schema";
import { services } from "./services.schema";
import { credentials } from "./credentials.schema";
import { events } from "./events.schema";
import { reviews } from "./reviews.schema";

const data = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    // Optional: the WebSite node (kept minimal but useful)
    {
      "@type": "WebSite",
      "@id": "https://wemotif.com/#website",
      url: "https://wemotif.com/",
      name: "MOTIF®",
      publisher: { "@id": "https://wemotif.com/#organization" },
      inLanguage: "en",
    },
    founderSchema,
    ...events,
    ...services,
    definedTermSet,
    ...definedTerms,
    ...credentials,
    ...reviews,
  ],
};

export function MasterGraphScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const masterGraph = data;