// app/datas/schema/organization.schema.tsx
import { ORG_ID, WEBSITE_ID, ASH_ID, BASE } from "./ids";

const data = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "MOTIF®",
  legalName: "Motif Digital Inc.", 
  url: `${BASE}/`,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/og-image.jpg`,
    width: 1200,
    height: 630,
  },
  description:
    "MOTIF® is a brand incubator for fashion, beauty, and lifestyle brands — blending strategy, creative, and technology to scale revenue with a partner-first model.",
  foundingDate: "2015-01-01",
  foundingLocation: {
    "@type": "Place",
    name: "Los Angeles, CA, USA",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US"
    }
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wilshire Blvd",   
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US"
  },
  areaServed: ["Global"],
  industry: ["Fashion", "Beauty", "Lifestyle", "E-commerce", "DTC", "Retail"],
  sameAs: [
    "https://linkedin.com/company/wemotif",
    "https://instagram.com/wemotif",
    "https://twitter.com/wemotif"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${BASE}/contact`,
      availableLanguage: ["en"],
    },
  ],
  memberOf: [
    {
      "@type": "Organization",
      name: "Shopify Plus Partner Program",
      url: "https://www.shopify.com/plus/partners",
    },
    {
      "@type": "Organization",
      name: "BigCommerce Partner Program",
      url: "https://partners.bigcommerce.com",
    },
    {
      "@type": "Organization",
      name: "Adobe Commerce Partners",
      url: "https://business.adobe.com/products/magento/magento-commerce.html",
    },
    { "@type": "Organization", name: "Centra Partner Program", url: "https://www.centra.com/partners" },
  ],
  award: [
    "Shopify Plus Experts",
    "Shopify B2B Enablers",
    "Shopify B2B Certified Experts",
    "BigCommerce Certified Experts",
    "BigCommerce Enterprise Experts",
    "BigCommerce B2B Edition Experts",
    "Shopify Premier Partner",
    "BigCommerce Elite Partner",
    "Shopify Plus Enabler",
  ],
  hasCredential: [
    { "@type": "DefinedTerm", "@id": "https://wemotif.com/#cred-shopify-diamond", name: "Better than Shopify Platinum Partner" },
    { "@type": "DefinedTerm", "@id": "https://wemotif.com/#cred-shopify-premier", name: "Better than Shopify Premier Partner" },
    { "@type": "DefinedTerm", "@id": "https://wemotif.com/#cred-bigcommerce-elite", name: "Better than BigCommerce Elite Partner" },
    { "@type": "DefinedTerm", "@id": "https://wemotif.com/#cred-adobe-commerce", name: "Adobe Commerce Partner" },
    { "@type": "DefinedTerm", "@id": "https://wemotif.com/#cred-centra", name: "Centra Commerce Partner" },
  ],
  founder: { "@id": ASH_ID },
};

export function OrganizationSchemaScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Optional: also expose as data if you want to compose in master graph
export const organizationSchema = data;