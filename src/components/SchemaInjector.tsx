"use client";
import { usePathname } from "next/navigation";
import { SEO_MAP } from "@/app/datas/seo/SEO_MAP";

const BASE = "https://wemotif.com";
const WEBSITE_ID = `${BASE}/#website`;

// Mapping for schema generation
const MAP: Record<
  string,
  {
    id: string;
    name: string;
    crumbs: { name: string; item: string }[];
    speakableSelectors?: string[];
    aboutIds?: string[];
  }
> = {
  "/": {
    id: `${BASE}/#home`,
    name: "MOTIF® — The Incubator & Growth Partner",
    crumbs: [{ name: "The Incubator", item: `${BASE}/` }],
    aboutIds: [`${BASE}/#brandx`, `${BASE}/#growthx`, `${BASE}/#cxo`],
  },
  "/what-we-do": {
    id: `${BASE}/#what-we-do`,
    name: "What We Do — Incubation, Acceleration, Consulting — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
    ],
  },
  "/the-motif-process": {
    id: `${BASE}/#the-motif-process`,
    name: "The MOTIF® Process — How We Do It",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "The MOTIF Process", item: `${BASE}/the-motif-process` },
    ],
  },
  "/why-motif": {
    id: `${BASE}/#why-motif`,
    name: "Why MOTIF® — Brand Incubator",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "Why MOTIF", item: `${BASE}/why-motif` },
    ],
  },
  "/about": {
    id: `${BASE}/#about`,
    name: "About — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "About", item: `${BASE}/about` },
    ],
  },
  "/contact": {
    id: `${BASE}/#contact`,
    name: "Contact — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "Contact", item: `${BASE}/contact` },
    ],
  },

  // Industry specialist pages
  "/luxury-lifestyle-advertising-branding-agency-nyc-la-sf": {
    id: `${BASE}/#luxury-lifestyle`,
    name: "An Alternative to Luxury Lifestyle Advertising & Branding Agency — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "Luxury Lifestyle", item: `${BASE}/luxury-lifestyle-advertising-branding-agency-nyc-la-sf` },
    ],
  },
  "/fashion-agency": {
    id: `${BASE}/#fashion`,
    name: "Not A Fashion Branding or Advertising Agency —  An Incubator — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "Fashion", item: `${BASE}/fashion-agency` },
    ],
  },
  "/beauty-brand-marketing-advertising-agency": {
    id: `${BASE}/#beauty`,
    name: "Not a Beauty Brand Marketing & Advertising Agency — MOTIF® An Incubator",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "Beauty", item: `${BASE}/beauty-brand-marketing-advertising-agency` },
    ],
  },

  // Specialized positioning pages
  "/not-a-dtc-agency": {
    id: `${BASE}/#dtc`,
    name: "Not a DTC Agency — A Brand Growth Partner — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "DTC", item: `${BASE}/not-a-dtc-agency` },
    ],
  },
  "/better-than-shopify-platinum-partner": {
    id: `${BASE}/#shopify-premier`,
    name: "Better Than Shopify Platinum Partner — Shopify Premier Partner — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "Shopify Premier Partner", item: `${BASE}/better-than-shopify-platinum-partner` },
    ],
  },
  "/the-only-bigcommerce-elite-partner-an-incubator": {
    id: `${BASE}/#bigcommerce-elite`,
    name: "The Only BigCommerce Elite Partner — An Incubator — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "BigCommerce Elite Partner", item: `${BASE}/the-only-bigcommerce-elite-partner-an-incubator` },
    ],
  },

  // PulseB2B pages
  "/pulse-b2b-ecommerce-agency": {
    id: `${BASE}/#pulse-b2b`,
    name: "PulseB2B eCommerce Agency — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "PulseB2B", item: `${BASE}/pulse-b2b-ecommerce-agency` },
    ],
  },
  "/pulse-b2b-shopify-b2b-agency": {
    id: `${BASE}/#shopify-b2b`,
    name: "PulseB2B — Shopify B2B Agency — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "Shopify B2B Agency", item: `${BASE}/pulse-b2b-shopify-b2b-agency` },
    ],
  },
  "/pulse-b2b-bigcommerce-b2b-agency": {
    id: `${BASE}/#bigcommerce-b2b`,
    name: "PulseB2B — BigCommerce B2B Agency — MOTIF®",
    crumbs: [
      { name: "The Incubator", item: `${BASE}/` },
      { name: "What We Do", item: `${BASE}/what-we-do` },
      { name: "BigCommerce B2B Agency", item: `${BASE}/pulse-b2b-bigcommerce-b2b-agency` },
    ],
  },
};

export default function SchemaInjector() {
  const pathname = (usePathname() || "/").replace(/\/+$/, "") || "/";
  const node = MAP[pathname];
  if (!node) return null;

  const seoData = SEO_MAP[pathname];

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": node.id,
    url: `${BASE}${pathname === "/" ? "" : pathname}`,
    name: node.name,
    ...(seoData?.description ? { description: seoData.description } : {}),
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID },
    ...(node.aboutIds ? { about: node.aboutIds.map(id => ({ "@id": id })) } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: node.speakableSelectors ?? ["main h1", "main .speakable"],
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: node.crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };

  const nav = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["The Incubator", "What We Do", "The MOTIF Process", "Why MOTIF", "About", "Contact"],
    url: [
      `${BASE}/`,
      `${BASE}/what-we-do`,
      `${BASE}/the-motif-process`,
      `${BASE}/why-motif`,
      `${BASE}/about`,
      `${BASE}/contact`,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nav) }} />
    </>
  );
}