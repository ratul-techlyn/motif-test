import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function PulseB2BPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.PULSEB2B}
      url={`${BASE}/pulseb2b`}
      name="PulseB2B — A MOTIF® Company"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "PulseB2B", item: `${BASE}/pulseb2b` }
      ]}
    />
  );
}