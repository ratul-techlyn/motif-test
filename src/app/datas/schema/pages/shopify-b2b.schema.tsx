import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function ShopifyB2BPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.SHOPIFY_B2B}
      url={`${BASE}/pulseb2b/shopify-b2b`}
      name="Shopify B2B — PulseB2B x MOTIF®"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "PulseB2B", item: `${BASE}/pulseb2b` },
        { name: "Shopify B2B", item: `${BASE}/pulseb2b/shopify-b2b` }
      ]}
    />
  );
}