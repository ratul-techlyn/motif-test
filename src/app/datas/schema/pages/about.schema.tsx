import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function AboutPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.ABOUT}
      url={`${BASE}/about`}
      name="About — MOTIF®"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "About", item: `${BASE}/about` }
      ]}
    />
  );
}