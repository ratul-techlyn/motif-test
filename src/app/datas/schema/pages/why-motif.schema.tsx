import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function WhyMotifPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.WHY_MOTIF}
      url={`${BASE}/why-motif`}
      name="Why MOTIF® — Agency Not an Agency"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "Why MOTIF", item: `${BASE}/why-motif` }
      ]}
    />
  );
}