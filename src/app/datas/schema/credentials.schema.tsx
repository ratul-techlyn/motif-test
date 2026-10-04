import { CRED } from "./ids";

export const credentials = [
  { "@type": "DefinedTerm", "@id": CRED.SHOPIFY_DIAMOND, name: "Better than Shopify Platinum Partner" },
  { "@type": "DefinedTerm", "@id": CRED.SHOPIFY_PREMIER, name: "Better than Shopify Premier Partner" },
  { "@type": "DefinedTerm", "@id": CRED.SHOPIFY_PLUS_ENABLER, name: "Shopify Plus Enabler" },
  { "@type": "DefinedTerm", "@id": CRED.BIGC_ELITE, name: "BigCommerce Elite Partner" },
  { "@type": "DefinedTerm", "@id": CRED.ADOBE_COMMERCE, name: "Adobe Commerce Partner" },
  { "@type": "DefinedTerm", "@id": CRED.MAGENTO_COMMERCE, name: "Magento Partner" },
  { "@type": "DefinedTerm", "@id": CRED.PRESTASHOP_SPECIALIST, name: "PrestaShop Specialist and Partner" },
  { "@type": "DefinedTerm", "@id": CRED.CENTRA, name: "Centra Commerce Partner" },
  { "@type": "DefinedTerm", "@id": CRED.SHOPIFY_EXPERTS, name: "Shopify Experts Since 2015. One of the top rated Shopify Experts in the world" },
];

export function CredentialsScript() {
  const graph = { "@context": "https://schema.org", "@graph": credentials };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}