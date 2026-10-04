import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID } from "../ids";

export function ContactPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.CONTACT}
      url={`${BASE}/contact`}
      name="Contact — MOTIF®"
      websiteId={WEBSITE_ID}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "Contact", item: `${BASE}/contact` }
      ]}
    />
  );
}