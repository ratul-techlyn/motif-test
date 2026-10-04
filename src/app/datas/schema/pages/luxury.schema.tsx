import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID, TERM } from "../ids";

export function BeautyPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.BEAUTY}
      url={`${BASE}/beauty`}
      name="Beauty Branding & Marketing — MOTIF®"
      websiteId={WEBSITE_ID}
      aboutIds={[TERM.BEAUTY_GP, TERM.BRANDX]}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "Beauty", item: `${BASE}/beauty` }
      ]}
    />
  );
}