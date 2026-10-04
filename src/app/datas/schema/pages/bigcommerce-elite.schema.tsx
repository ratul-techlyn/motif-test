import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function BigCommerceElitePageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.BIGC_ELITE}
      url={`${BASE}/bigcommerce-elite-partner`}
      name="BigCommerce Elite Partner — Better Than an Agency | MOTIF®"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "BigCommerce Elite Partner", item: `${BASE}/bigcommerce-elite-partner` }
      ]}
    />
  );
}