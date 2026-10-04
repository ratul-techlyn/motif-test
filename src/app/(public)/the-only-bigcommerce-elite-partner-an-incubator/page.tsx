import { Metadata } from "next";
import { bigcommerceEliteSEO } from "../../datas/seo/pages/the-only-bigcommerce-elite-partner-an-incubator.seo";
import PageClient from "./page-client";

export const metadata: Metadata = bigcommerceEliteSEO;

export default function Page() {
  return <PageClient />;
}
