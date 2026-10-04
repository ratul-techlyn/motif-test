"use client";
import dynamic from "next/dynamic";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import MarqueeNavigationNew from "../../components/shared/marqueeNav/MarqueeNavigation";
import AsSeenOn from "./~comp/AsSeenOn";
import BrandProfile from "./~comp/BrandProfile";
import Driving from "./~comp/Driving";
import HeroMobile from "./~comp/HeroMobile";
import HeroMobile2 from "./~comp/HeroMobile2";
import Recommandations from "./~comp/Recommandations";
import TheApproach from "./~comp/TheApproach";
import TheCommitment from "./~comp/TheCommitment";
import WorkMerger from "./~comp/WorkMerger";
import BannerJB from "@/components/BannerJB";

export default function InteractiveHome() {
  const iconSize = useResponsiveSize();
  return (
    <>
      <HeroMobile2 />
      {/* <HeroMobile /> */}
      <BannerJB />
      <AsSeenOn />
      <BrandProfile />
      <TheCommitment />
      <WorkMerger />
      <TheApproach />
      <Driving />
      <Recommandations />

      <div
        className="tilt-trigger-marquee"
        aria-label="MOTIF's Strategic Brand Development Process for Fashion, Beauty & Lifestyle"
      >
        <h2 className="sr-only">
          MOTIF's Strategic Brand Development Process blends incubation,
          acceleration, and creative strategy to grow Fashion, Beauty, and
          Luxury Lifestyle brands beyond traditional agency limitations.
        </h2>
        <MarqueeNavigationNew
          text={["WHAT WE DO"]}
          href="/what-we-do"
          speed={1.5}
          iconClass="text-[#ED5F09]"
          iconSize={iconSize}
          className="mb-[8%] lg:mb-0"
        />
      </div>

      {/* <BlogCarousel title="Latest Articles" postsPerPage={5} />*/}
      {/*  <CaseStudiesCarousel /> */}
    </>
  );
}