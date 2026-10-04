import { Metadata } from "next";
import { bigcommerceB2BSEO } from "../../datas/seo/pages/pulse-b2b-bigcommerce-b2b-agency.seo";
import PageClient from "./page-client";

export const metadata: Metadata = bigcommerceB2BSEO;

export default function Page() {
  return <PageClient />;
}
