import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function ShopifyPlatinumPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.SHOPIFY_PLAT}
      url={`${BASE}/shopify-platinum-partner`}
      name="Shopify Platinum Partner — Better Than an Agency | MOTIF®"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "Shopify Platinum Partner", item: `${BASE}/shopify-platinum-partner` }
      ]}
    />
  );
}