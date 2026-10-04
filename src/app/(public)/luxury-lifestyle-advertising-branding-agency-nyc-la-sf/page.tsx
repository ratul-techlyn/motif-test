import { Metadata } from "next";
import { luxuryLifestyleSEO } from "../../datas/seo/pages/luxury-lifestyle-advertising-branding-agency-nyc-la-sf.seo";
import PageClient from "./page-client";

export const metadata: Metadata = luxuryLifestyleSEO;

export default function Page() {
  return <PageClient />;
}
