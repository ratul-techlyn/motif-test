import { Metadata } from "next";
import { dtcSEO } from "../../datas/seo/pages/not-a-dtc-agency.seo";
import PageClient from "./page-client";

export const metadata: Metadata = dtcSEO;

export default function Page() {
  return <PageClient />;
}
