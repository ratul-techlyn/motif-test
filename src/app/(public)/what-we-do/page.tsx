import { Metadata } from "next";
import { whatWeDoSEO } from "../../datas/seo/pages/what-we-do.seo";
import PageClient from "./page-client";

export const metadata: Metadata = whatWeDoSEO;

export default function Page() {
  return <PageClient />;
}
