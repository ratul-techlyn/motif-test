import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID, TERM } from "../ids";

export function FashionPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.FASHION}
      url={`${BASE}/fashion`}
      name="Fashion Branding & Marketing — MOTIF®"
      websiteId={WEBSITE_ID}
      aboutIds={[TERM.FASHION_GP, TERM.BRANDX]}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "Fashion", item: `${BASE}/fashion` }
      ]}
    />
  );
}