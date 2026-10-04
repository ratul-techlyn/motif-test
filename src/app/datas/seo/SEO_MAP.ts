import type { Metadata } from "next";

import { homepageSEO } from "./pages/homepage.seo";
import { whatWeDoSEO } from "./pages/what-we-do.seo";
import { motifProcessSEO } from "./pages/the-motif-process.seo";
import { whyMotifSEO } from "./pages/why-motif.seo";
import { aboutSEO } from "./pages/about.seo";
import { contactSEO } from "./pages/contact.seo";

import { luxuryLifestyleSEO } from "./pages/luxury-lifestyle-advertising-branding-agency-nyc-la-sf.seo";
import { fashionSEO } from "./pages/fashion-agency.seo";
import { beautySEO } from "./pages/beauty-brand-marketing-advertising-agency.seo";

import { dtcSEO } from "./pages/not-a-dtc-agency.seo";
import { shopifyPremierSEO } from "./pages/better-than-shopify-platinum-partner.seo";
import { bigcommerceEliteSEO } from "./pages/the-only-bigcommerce-elite-partner-an-incubator.seo";

import { pulseB2BSEO } from "./pages/pulse-b2b-ecommerce-agency.seo";
import { shopifyB2BSEO } from "./pages/pulse-b2b-shopify-b2b-agency.seo";
import { bigcommerceB2BSEO } from "./pages/pulse-b2b-bigcommerce-b2b-agency.seo";

import { cultureSEO } from "./pages/culture.seo";
import { faqsSEO } from "./pages/faqs.seo";

export const SEO_MAP: Record<string, Metadata> = {
  "/": homepageSEO,
  "/what-we-do": whatWeDoSEO,
  "/the-motif-process": motifProcessSEO,
  "/why-motif": whyMotifSEO,
  "/about": aboutSEO,
  "/contact": contactSEO,
  "/culture": cultureSEO,
  "/faqs": faqsSEO,

  "/luxury-lifestyle-advertising-branding-agency-nyc-la-sf": luxuryLifestyleSEO,
  "/fashion-agency": fashionSEO,
  "/beauty-brand-marketing-advertising-agency": beautySEO,

  "/not-a-dtc-agency": dtcSEO,
  "/better-than-shopify-platinum-partner": shopifyPremierSEO,
  "/the-only-bigcommerce-elite-partner-an-incubator": bigcommerceEliteSEO,

  "/pulse-b2b-ecommerce-agency": pulseB2BSEO,
  "/pulse-b2b-shopify-b2b-agency": shopifyB2BSEO,
  "/pulse-b2b-bigcommerce-b2b-agency": bigcommerceB2BSEO,
};
