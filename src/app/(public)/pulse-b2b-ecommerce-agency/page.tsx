import { Metadata } from "next";
import { pulseB2BSEO } from "../../datas/seo/pages/pulse-b2b-ecommerce-agency.seo";
import PageClient from "./page-client";

export const metadata: Metadata = pulseB2BSEO;

export default function Page() {
  return <PageClient />;
}
