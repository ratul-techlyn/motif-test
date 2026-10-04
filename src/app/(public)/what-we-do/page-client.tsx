"use client";

import Brands from "@/components/cards/Brands";
import TwoColCard from "@/components/cards/TwoColCard";
import MarqueeNavigation from "@/components/shared/marqueeNav/MarqueeNavigation";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import BannerWhat from "./~com/Banner";
import FullMediaWidthAnim from "@/components/lib_comp/FullMediaWidthAnim";
import Perspective from "./~com/Perspective";
import MobileHeroSection2 from "@/components/shared/MobileHeroAlt";
import Image from "next/image";
import { RelatedPages } from "@/components/seo";
import { getRelatedPages } from "@/app/datas/internal-links";
import BannerJB from "@/components/BannerJB";

// ✅ Dynamically import SEOHead with SSR enabled
// const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });

const MobileheroData = {
  headlines: [
    'RESHAPING BRANDS GROWTH WITH ',
    'GENUINE MOTIF®',
  ],
  paragraph: 'As an incubator company with agency experience, ensuring success on all fronts through a human-first approach, where artistic creativity leads and data serves as a supportivetool.',
  ariaLabel: 'Motif Hero Banner',
  srOnly: 'Motif Brand Story Starting from 2015',
  capsules: [
    {
      src: '/assets/about/slide/motif_not_an_agency_beauty_brand_marketing.png',
      alt: 'Beauty brand marketing',
      bgPosition: 'center' as const,
    },
    {
      src: '/assets/about/slide/luxury_lifestyle_brand_motif.png',
      alt: 'Luxury Lifestyle brand marketing',
      bgPosition: 'center' as const,
    },
    {
      src: '/assets/about/slide/beauty_brand_motif_inc-1.jpeg',
      alt: 'Fashion group sunglasses',
      bgPosition: 'center' as const,
    },
  ],
};

const canvaImgs = {
  image: "/assets/what_we_do/what-we-do-motif-incubator.png",
  altText:
    "Fashion-forward models representing MOTIF®—a fashion branding, marketing, and design incubator, not a traditional agency.",
  displacementImage: "/assets/fashion_agency/Fashion-agency-hero.png",
  altTextDisplacement:
    "Fashion-forward models representing MOTIF®—a fashion branding, marketing, and design incubator, not a traditional agency.",
};

const partnerData = {
  title: "Partnerships",
  description:
    "Brand success isn't easy so we partnered up with best in classes to change the brand experience, connecting with people and culture.",
};


const WhatWeDo = () => {
  const iconSize = useResponsiveSize();
  const relatedPages = getRelatedPages("/what-we-do");

  return (
    <div>
      {/* <SEOHead seo={whatWeDoSEO} /> */}
      {/* SEO Internal Links - Hidden visually but accessible to bots/screen readers */}

      <RelatedPages 
        pages={relatedPages}
        heading="Related Services"
        visuallyHidden={true}
        ariaLabel="What we do related links"
      />

      <BannerWhat/>

      {/* <BannerJB /> */}
      
      < MobileHeroSection2 {...MobileheroData} />
      <section className="w-full mt-20">
        <FullMediaWidthAnim startWidth="85%">
          <Image
            className="image-distortion w-full"
            src={canvaImgs.image}
            width={1000}
            height={1000}
            alt=""
          />
        </FullMediaWidthAnim>
        </section>
      <Perspective />
      <section className="layout_normal my-36 w-[90%] md:w-[90%] lg:w-[70%]">
        <TwoColCard
          description={partnerData.description}
          title={partnerData.title}
        />
      </section>
      <Brands />
      <MarqueeNavigation
        text={["HOW WE DO"]}
        href="/the-motif-process"
        speed={2.5}
        iconClass="text-[#ED5F09]"
        iconSize={iconSize}
      />
    </div>
  );
};

export default WhatWeDo;
