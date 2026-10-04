import { Metadata } from "next";
import { beautySEO } from "../../datas/seo/pages/beauty-brand-marketing-advertising-agency.seo";
import PageClient from "./page-client";

export const metadata: Metadata = beautySEO;

export default function Page() {
  return <PageClient />;
}
