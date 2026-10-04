import { Metadata } from "next";
import { fashionSEO } from "../../datas/seo/pages/fashion-agency.seo";
import PageClient from "./page-client";

export const metadata: Metadata = fashionSEO;

export default function Page() {
  return <PageClient />;
}
