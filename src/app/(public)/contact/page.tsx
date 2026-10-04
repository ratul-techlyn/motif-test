import ContactInfo from "@/app/(public)/contact/~comp/ContactInfo";
import Location from "@/app/(public)/contact/~comp/Location";
import StrategyVideo from "@/app/(public)/contact/~comp/StrategyVideo";
import TextMarquee from "@/app/(public)/contact/~comp/TextMarquee";
import { getRelatedPages } from "@/app/datas/internal-links";
import { RelatedPages } from "@/components/seo";
import { contactSEO } from "../../datas/seo/pages/contact.seo";
import RecommandationContact from "./~comp/RecommandationContact";
import { Metadata } from "next";
import ContactMails from "./~comp/ContactMails";

// ✅ Dynamically import SEOHead with SSR enabled
// const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });

export const metadata: Metadata = contactSEO;

const Contact = () => {
  const relatedPages = getRelatedPages("/contact");

  return (
    <>
      {/* <SEOHead seo={contactSEO} /> */}
      {/* SEO Internal Links - Hidden visually but accessible to bots/screen readers */}
      <RelatedPages
        pages={relatedPages}
        heading="Related Information"
        visuallyHidden={true}
        ariaLabel="Contact page related links"
      />
      <StrategyVideo />
      <ContactInfo />
      <RecommandationContact />

      {/* <div className="layout_normal w-[90%] mt-5 block md:hidden">
        <ContactMails />
      </div> */}

      <div className="hidden md:block">
        <Location />
      </div>

      <div className="block md:hidden">
        {/* <LocationSlider /> */}
      </div>

      <TextMarquee />
    </>
  );
};

export default Contact;
