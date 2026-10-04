import { Metadata } from "next";
import { whyMotifSEO } from "../../datas/seo/pages/why-motif.seo";
import PageClient from "./page-client";

export const metadata: Metadata = whyMotifSEO;

export default function Page() {
  return <PageClient />;
}
