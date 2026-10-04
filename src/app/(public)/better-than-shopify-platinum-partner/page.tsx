import { Metadata } from "next";
import { shopifyPremierSEO } from "../../datas/seo/pages/better-than-shopify-platinum-partner.seo";
import PageClient from "./page-client";

export const metadata: Metadata = shopifyPremierSEO;

export default function Page() {
  return <PageClient />;
}
