import { Metadata } from "next";
import { motifProcessSEO } from "../../datas/seo/pages/the-motif-process.seo";
import PageClient from "./page-client";

export const metadata: Metadata = motifProcessSEO;

export default function Page() {
  return <PageClient />;
}
