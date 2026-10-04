import TitleImgBanner from "@/components/shared/TitleImgBanner";
import TitleMixImg from "@/components/shared/TitleMixImg";
import { useAnimationComplete } from "@/context/AnimationContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef } from "react";

const titleMixImgData = [
  [
    "RESHAPING",
    "BRAND",
    "GROWTH",
    "WITH",
    "GENUINE",
    "MOTIF",
    { imageSrc: "/assets/what_we_do/whatdobanner.jpg", altText: "Hero 1" , position: "center" },
  ],
];
const titleMixImgDataMobile = [
  [
    "RESHAPING",
    "BRAND",
    "GROWTH",
    "WITH",
    "GENUINE",
    "MOTIF",
    { imageSrc: "/assets/what_we_do/whatdobanner.jpg", altText: "Hero 1" },
  ],
];
const description = [
  "As an incubator company with agency experience, ensuring success on all fronts through a human-first approach, where artistic creativity leads and data serves as a supportive tool.",
];
const description_mobile = [
  "As an incubator company with agency experience, ensuring success on all fronts through a human-first approach, where artistic creativity leads and data serves as a supportive tool.",
];

const BannerWhat = () => {
  const refBox = useRef<HTMLDivElement>(null);
  const { hasLoadedAnimationFinished, hasPageTransitionFinished } =
    useAnimationComplete();

  useGSAP(
    () => {
      if (refBox.current) {
        const pera = refBox.current.querySelectorAll(".anm-hero-pera");
        const splitText = new SplitText(pera, { type: "words" });
        gsap.fromTo(
          splitText.words,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            delay: 1,
            duration: 1,
            ease: "power3.out",
          }
        );
      }
    },
    {
      scope: refBox,
      dependencies: [hasLoadedAnimationFinished, hasPageTransitionFinished],
    }
  );

  return (
    <>
      {/* WEB  */}
      <section className="hidden md:block layout_normal pt-32 pb-0 lg:pt-32 layout_normal px-2 w-[90%] md:w-[90%] lg:w-[70%]">
        <h2 className="sr-only">
            MOTIF®: Beyond the Agency Model for Fashion, Beauty & Lifestyle Brands
          </h2>
          <p className="sr-only">
            Most fashion, beauty, and lifestyle brands don’t need another marketing agency. They need a growth partner. MOTIF® replaces traditional agencies by incubating and accelerating DTC and retail brands — blending strategy, design, and commerce to build brands that last.
          </p>

        <TitleImgBanner lines={titleMixImgData} description={description} />
      </section>
    </>
  );
};

export default BannerWhat;
