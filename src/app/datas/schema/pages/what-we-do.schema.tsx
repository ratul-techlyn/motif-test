import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID, TERM } from "../ids";

export function WhatWeDoPageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.WHAT_WE_DO}
      url={`${BASE}/what-we-do`}
      name="What We Do — Incubation, Acceleration, Consulting | MOTIF®"
      websiteId={WEBSITE_ID}
      aboutIds={[TERM.BRANDX, TERM.GROWTHX, TERM.CXO]}
      breadcrumbs={[
        { name: "MOTIF®", item: `${BASE}/` },
        { name: "What We Do", item: `${BASE}/what-we-do` }
      ]}
    />
  );
}