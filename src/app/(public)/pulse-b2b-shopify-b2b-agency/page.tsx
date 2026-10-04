import { Metadata } from "next";
import { shopifyB2BSEO } from "../../datas/seo/pages/pulse-b2b-shopify-b2b-agency.seo";
import PageClient from "./page-client";

export const metadata: Metadata = shopifyB2BSEO;

export default function Page() {
  return <PageClient />;
}
