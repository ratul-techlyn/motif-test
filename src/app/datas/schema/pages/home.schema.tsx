import { WebPageSchemaScript } from "./utils";
import { BASE, WEBSITE_ID, PAGE_ID, TERM } from "../ids";

export function HomePageSchemaScript() {
  return (
    <WebPageSchemaScript
      id={PAGE_ID.HOME}
      url={`${BASE}/`}
      name="MOTIF® — Brand Incubator & Growth Partner"
      websiteId={WEBSITE_ID}
      aboutIds={[TERM.BRANDX, TERM.GROWTHX, TERM.CXO]}
      breadcrumbs={[{ name: "MOTIF®", item: `${BASE}/` }]}
    />
  );
}