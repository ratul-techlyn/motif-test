import React from "react";
import { Metadata } from "next";
import { cultureSEO } from "../../datas/seo/pages/culture.seo";
import CultureTitle from "@/app/(public)/culture/~comp/CultureTitle";
import CultureBanner from "@/app/(public)/culture/~comp/CultureBanner";
import CultureOverview from "@/app/(public)/culture/~comp/CultureOverview";
import CultureIdea from "@/app/(public)/culture/~comp/CultureIdea";
import CultureExpectation from "@/app/(public)/culture/~comp/CultureExpectation";
import DraggableGallery from "./~comp/DraggableImageGallery";
import StatsHighlight from "@/components/extrasc/StatHighlight";
import SectionInnerHero from "@/components/extrasc/SectionInnerHero";
import SvgImagePath from "@/components/SvgImagePath";
import { RelatedPages } from "@/components/seo";
import { getRelatedPages } from "@/app/datas/internal-links";

export const metadata: Metadata = cultureSEO;

const statData = [
  { value: "8+", label: "Years of experience" },
  { value: "150+", label: "Shopify developers" },
  { value: "300+", label: "Live Shopify sites" },
];

const Culture = () => {
  const relatedPages = getRelatedPages("/culture");

  return (
    <div className="">
      {/* SEO Internal Links - Hidden visually but accessible to bots/screen readers */}
      <RelatedPages 
        pages={relatedPages}
        heading="Related Information"
        visuallyHidden={true}
        ariaLabel="Internal navigation links"
      />
      
      <section className="relative w-full min-h-screen overflow-visible z-10">
        <CultureTitle />
        <DraggableGallery />
      </section>
      <CultureOverview />
      <SvgImagePath />
      <CultureBanner />
      <StatsHighlight
        stats={statData}
        textColor="text-white"
        borderColor="border-neutral-100"
      />
      <CultureIdea />
      <CultureExpectation />
      <SectionInnerHero
        title={"Fueled By<br/> Culture"}
        subtitle="Strategic vision X Cultural Depth"
        description="Motif’s incubator was built for those who create differently. We don’t follow playbooks we shape them. Rooted in culture and driven by human instinct, we craft, accelerate, and evolve brands that move with purpose and stay ahead of time."
        buttonLabel="WHY MOTIF"
        linkHref="/why-motif"
        imageSrc="/assets/motif-hero-office.jpg"
        imageAlt="Hero Sample Image"
        // layout="right"
      />
    </div>
  );
};

export default Culture;
