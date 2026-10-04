import { Metadata } from "next";
import { aboutSEO } from "../../datas/seo/pages/about.seo";
import PageClient from "./page-client";

export const metadata: Metadata = aboutSEO;

export default function Page() {
  return <PageClient />;
}
