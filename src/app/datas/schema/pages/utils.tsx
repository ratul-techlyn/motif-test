// Small helpers so each page file stays tiny.
export type Crumb = { name: string; item: string };

export function WebPageSchemaScript(opts: {
  id: string;
  url: string;
  name: string;
  websiteId: string;
  speakableSelectors?: string[];   // defaults below
  breadcrumbs: Crumb[];
  aboutIds?: string[];             // optional: stable @ids (DefinedTerms etc.)
}) {
  const {
    id, url, name, websiteId,
    speakableSelectors = ["main h1", "main .speakable"],
    breadcrumbs, aboutIds = []
  } = opts;

  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": id,
    url,
    name,
    isPartOf: { "@type": "WebSite", "@id": websiteId },
    inLanguage: "en",
    ...(aboutIds.length ? { about: aboutIds.map((x) => ({ "@id": x })) } : {}),
    speakable: { "@type": "SpeakableSpecification", cssSelector: speakableSelectors },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.item
      }))
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}