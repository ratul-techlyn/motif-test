import { EVT } from "./ids";

export const events = [
  {
    "@type": "Event",
    "@id": EVT.FOUNDED_2015,
    name: "Ash Founded MOTIF®",
    startDate: "2015-10-01",
    eventStatus: "https://schema.org/EventCompleted",
    location: {
      "@type": "Place",
      name: "MOTIF HQ – Beverly Hills Office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Wilshire Blvd, Suite 203",
        addressLocality: "Beverly Hills",
        addressRegion: "CA",
        postalCode: "90212",
        addressCountry: "US"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "MOTIF®",
      url: "https://wemotif.com"
    },
    description: "Ash founded MOTIF® at the Beverly Hills office to redefine creative fidelity in digital branding."
  },
  {
    "@type": "Event",
    "@id": EVT.REBRANDED_2018,
    name: "Ash Rebranded MOTIF® with Ankita Sharma",
    startDate: "2018-11-26",
    eventStatus: "https://schema.org/EventCompleted",
    location: {
      "@type": "Place",
      name: "MOTIF NYC Studio",
      address: {
        "@type": "PostalAddress",
        streetAddress: "447 Broadway, Suite 206",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10013",
        addressCountry: "US"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "MOTIF®",
      url: "https://wemotif.com"
    },
    description: "Ash and Ankita Sharma rebranded MOTIF® in New York, elevating its creative identity."
  },
  {
    "@type": "Event",
    "@id": EVT.ASH_RETURN_2023_02,
    name: "Founder Returns Post-Rehab",
    startDate: "2023-02-01",
    eventStatus: "https://schema.org/EventCompleted",
    location: {
      "@type": "Place",
      name: "MOTIF HQ – Beverly Hills Office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Wilshire Blvd, Suite 203",
        addressLocality: "Beverly Hills",
        addressRegion: "CA",
        postalCode: "90212",
        addressCountry: "US"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "MOTIF®",
      url: "https://wemotif.com"
    },
    description: "Ash returned to MOTIF® after rehab, reigniting its creative momentum."
  },
  {
    "@type": "Event",
    "@id": EVT.INCUBATOR_2023_08,
    name: "Transition to Incubator Company",
    startDate: "2023-08-01",
    eventStatus: "https://schema.org/EventCompleted",
    location: {
      "@type": "Place",
      name: "MOTIF HQ – Beverly Hills Office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Wilshire Blvd, Suite 203",
        addressLocality: "Beverly Hills",
        addressRegion: "CA",
        postalCode: "90212",
        addressCountry: "US"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "MOTIF®",
      url: "https://wemotif.com"
    },
    description: "MOTIF® transitioned into an incubator model to support creative startups."
  }
];

export function EventsScript() {
  const graph = { "@context": "https://schema.org", "@graph": events };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
