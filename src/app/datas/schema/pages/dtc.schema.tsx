import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function DTCPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.DTC}
      url={`${BASE}/dtc`}
      name="DTC Growth — Better Than a DTC Agency | MOTIF®"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "DTC", item: `${BASE}/dtc` }
      ]}
    />
  );
}