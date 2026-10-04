import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID, TERM } from "../ids";

export function HowWeDoPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.HOW_WE_DO}
      url={`${BASE}/how-we-do`}
      name="How We Do — Processes & Playbooks | MOTIF®"
      websiteId={WEBSITE_ID}
      aboutIds={[TERM.GROWTHX, TERM.CXO]}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "How We Do", item: `${BASE}/how-we-do` }
      ]}
    />
  );
}