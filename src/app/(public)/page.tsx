import dynamic from "next/dynamic";
import { homepageSEO } from "../datas/seo/pages/homepage.seo";
import { Metadata } from 'next';

// ✅ Dynamically import SEOHead with SSR enabled
// const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });

const HomePageSchemaScript = dynamic(
  () => import("../datas/schema/pages/home.schema").then(mod => mod.HomePageSchemaScript),
  { ssr: true }
);

// Import the original InteractiveHome component - no need to change it
const InteractiveHome = dynamic(() => import("./InteractiveHome"));

export const metadata: Metadata = homepageSEO;

export default async function Home() {
  // Check headers to determine if this is a bot
  // const headersList = await headers();
  // const isPrerendered = headersList.get('X-Prerendered') === 'true';
  // const isBot = headersList.get('X-Bot') === 'true';
  
  // If this request was prerendered by prerender.io, this component won't be reached
  // since the middleware returns the prerendered HTML directly
  
  // For all requests that reach here (users + bot fallbacks), serve the interactive version
  // This is the correct behavior because:
  // 1. Regular users always get the full interactive experience
  // 2. Bots that successfully hit prerender.io get prerendered HTML (never reach here)
  // 3. Bots that fail prerender.io get the interactive version as fallback (SEO content is still crawlable)
  
  return (
    <>
      {/* <SEOHead seo={homepageSEO} /> */}
      <HomePageSchemaScript />
      <InteractiveHome />
    </>
  );
}
