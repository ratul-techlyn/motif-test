"use client";
import MobileHeroSection from "@/components/shared/MobileHero";
import AccordianSection from "@/components/cards/AccordianSection";
import MarqueeNavigation from "@/components/shared/marqueeNav/MarqueeNavigation";
import TitleImgBanner from "@/components/shared/TitleImgBanner";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import Brands from "../../../components/cards/Brands";
import AppearanceCards from "./~com/AppearanceCards";
import CurveChartAnimation from "./~com/CurveChartAnimation";
import RecommandationMpr from "./~com/RecommandationMpr";
import ShortSection from "./~com/ShortSection";

// ✅ Dynamically import SEOHead with SSR enabled
// const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });

const mainBanner = {
  lines: [
    [
      "Brand Growth ",
      "Doesn't ",
      "Happen ",
      "By Accident ",
      { imageSrc: "/assets/process/process.png", altText: "brand image", position: "top" },
    ],
  ],
  description: [
    "As a brand incubator, we partner with lifestyle, fashion, and beauty brands, helping them launch, grow, and scale through bold ideas, a human-first approach, crazy creatives and art-led strategy. Uncover the process behind growing unforgettable brands.",
  ],
};

const MobileheroData = {
  headlines: [
    "Brand Growth Doesn't Happen", 
    "By Accident",
  ],
  paragraph: 'As a brand incubator, we partner with lifestyle, fashion, and beauty brands, helping them launch, grow, and scale through bold ideas, a human-first approach, crazy creatives and art-led strategy. Uncover the process behind growing unforgettablebrands.',
  ariaLabel: 'Motif Hero Banner',
  srOnly: 'Motif Brand Story Starting from 2015',
  capsules: [
    {
      src: '/assets/about/slide/luxury_lifestyle_brand_motif.png',
      alt: 'Luxury Lifestyle brand marketing',
      bgPosition: 'center' as const,
    },
    {
      src: '/assets/about/slide/motif_not_an_agency_beauty_brand_marketing.png',
      alt: 'Beauty brand marketing',
      bgPosition: 'center' as const,
    },
    {
      src: '/assets/about/slide/beauty_brand_motif_inc-1.jpeg',
      alt: 'Fashion group sunglasses',
      bgPosition: 'center' as const,
    },
  ],
};

const process_section = {
  description: ["Arts, Strrategy", "and Grit, nothing", "else scales"],
  accordionList: [
    {
      title: "Strategy Is a Weapon",
      description: [
        {
          text: "Strategy here isn’t fluff or a static PDF—it’s a system for moving fast, staying relevant, and building real traction. It shifts with the brand, the market, and what customers actually respond to. Nothing ornamental. Everything functional.",
        },
      ],
    },
    {
      title: "Creative & Human First",
      description: [
        {
          text: "Every decision begins with what moves people—not just what moves data. Culture, instinct, and artistic relevance lead the way. Data joins later to sharpen what already connects.",
        },
      ],
    },

    {
      title: "Execution > Talk",
      description: [
        {
          text: "Growth comes from shipping faster than the market can copy. The process is aggressive, iterative, and grounded in what works—not what sounds good. Talking doesn’t scale growth. Execution does. That’s why we act more like co-founders than consultants.",
        },
      ],
    },
    {
      title: "Grow > Refine + Repeat ",
      description: [
        {
          text: "Success isn’t a launch it’s a rhythm. We iterate across creative, channels, and customer experience in tight loops. When we see traction, we double down. When we miss, we tweak fast. Growth isn’t linear. We make it feel that way.",
        },
      ],
    },
  ],
};


const MotifProcessPage = () => {
  const iconSize = useResponsiveSize();

  return (
    <div>
      {/* <SEOHead seo={motifProcessSEO} /> */}
      <section className="hidden lg:block layout_normal lg:my-32 my-5 w-[90%] md:w-[90%] lg:w-[70%]">
        <TitleImgBanner
          lines={mainBanner.lines}
          description={mainBanner.description}
        />
      </section>
      < MobileHeroSection {...MobileheroData} />

      <section className="lg:my-32 my-14">
         <video src="/assets/video/morif-incubation-not-an-agency.mp4" className="w-full h-full object-cover" muted autoPlay loop></video>
      </section>

      <section  className="layout_normal">
        <CurveChartAnimation />
      </section>

      <section className="layout_normal pt-20 pb-[15%] lg:pt-40 pb-20 w-[90%] md:w-[90%] lg:w-[70%]">
        <AccordianSection
          description={process_section.description}
          title="THE CORE"
          accordionList={process_section.accordionList}
        />
      </section>

      <AppearanceCards />
      <ShortSection />
      <Brands />

      <section className="layout_normal py-28 w-[90%] md:w-[90%] lg:w-[70%]">
        <RecommandationMpr />
      </section>

      <MarqueeNavigation
        text={["BEHIND MOTIF"]}
        href="/about"
        speed={2.5}
        iconClass="text-[#ED5F09]"
        iconSize={iconSize}
      />
    </div>
  );
};

export default MotifProcessPage;
