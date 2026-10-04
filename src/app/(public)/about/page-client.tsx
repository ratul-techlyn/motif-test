"use client";
import AccordianSection from "@/components/cards/AccordianSection";
import TitleImgBanner from "@/components/shared/TitleImgBanner";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { useRef } from "react";
import RecommandationsAbout from "./~com/RecommandationsAbout";

// ✅ Dynamically import SEOHead with SSR enabled
// const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });

import FullMediaWidthAnim from "@/components/lib_comp/FullMediaWidthAnim";
import GsapImageMarquee from "@/components/lib_comp/GsapImageMarquee";
import MadeToBreak from "@/components/shared/MadeToBreak";
import Quote from "@/components/shared/Recommandations/Quote";
import MarqueeNavigation from "@/components/shared/marqueeNav/MarqueeNavigation";
import MarqueeInPage from "@/components/ui/MarqueeInPage";
import TextAnimation from "@/components/ui/textAnimation";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { StampIcon } from "lucide-react";
import AppearanceCards from "./~com/AppearanceCards";
import HeroMobile from "./~com/HeroMobile";
import { RelatedPages } from "@/components/seo";
import { getRelatedPages } from "@/app/datas/internal-links";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const mainBanner = {
  lines: [
    [
      "BUILDING",
      " & ",
      "GROWING",
      " BRANDS",
      "WITH",
      " MOTIF®",
      "SINCE 2015",
      { imageSrc: "/assets/home/hero/hero3.webp", altText: "brand image" },
    ],
  ],
  description: [
    "Motif® is an incubator company which started as an agency growing Luxury Lifestyle, Fashion & Beauty brands across the world by connecting them with end users with better marketing, branding & exceptional customer experience.",
  ],
};
const sliderList = [
  {
    url: "/assets/instagram/Attention_not.jpg",
  },
  {
    url: "/assets/instagram/Branding_is_not_design_motif.jpg",
  },
  {
    url: "/assets/instagram/Chokh_on_the_algorithm.jpg",
  },
  {
    url: "/assets/instagram/metric_molded_everything.jpg",
  },
  {
    url: "/assets/instagram/Branding_is_not_dead.jpg",
  },
  {
    url: "/assets/instagram/Data_is_devil.jpg",
  },
  {
    url: "/assets/instagram/If_you_need_trend.jpg",
  },
  {
    url: "/assets/instagram/Your_copy_sound_like_tweet.jpg",
  },
  {
    url: "/assets/instagram/Storytelling_is.jpg",
  },
  {
    url: "/assets/instagram/we_build_for_forever.jpg",
  },
  {
    url: "/assets/instagram/Marketers_are_villain.jpg",
  },
  {
    url: "/assets/instagram/Rules_not_for_you.jpg",
  },
];
const adSlider = [
  "CONNECTING",
  "BRAND",
  "WITH",
  "PEOPLE",
  "WITH",
  "STRATEGY",
  "EXPERIENCE",
  "VALUE",
  "WITH",
  "STRATEGY",
  "EXPERIENCE",
  "VALUE",
];
const faq_section = {
  description: ["The only team of", "experts you need on", "your side."],
  accordionList: [
    {
      title: "Culture in Motion",
      description: [
        {
          text: "At the core of every powerful brand is a deep understanding of culture. Brands that don’t just observe culture, they shape it. Culture isn’t just what people follow, it's what they live. Motif uncovers the hidden patterns, values, and aspirations that influence consumer behavior, allowing us to connect brands with people on a deeper level. This isn’t about trend-chasing it’s about shaping authentic stories that resonate far beyond the moment.",
        },
      ],
    },

    {
      title: "Branding X Marketing",
      description: [
        {
          text: "We know how frustrating it is when your branding and marketing strategy are not synced. It’s even worse when your website doesn’t reflect what you stand for! Luckily, we have spent over a decade developing a methodology to scale online businesses the right way, prioritizing both at the same time.",
        },
      ],
    },
    {
      title: "Growth Beyond Boundaries",
      description: [
        {
          text: "Growth is more than numbers. It’s finding new paths, redefining success, and taking risks that pay off. Motif’s approach weaves together data, creativity, and market understanding to drive impactful results. From brand positioning to full-scale market strategies, we ensure every move is purpose-driven, aligned with your vision, and designed for long-term success.",
        },
      ],
    },
    {
      title: "Arts X Data in Harmony ",
      description: [
        {
          text: "At MOTIF®, the fusion of art and data drives brand growth. By blending strategic insights with creative expression, MOTIF® develops tailored Ad-Tech solutions that ensure each campaign resonates deeply. Data informs, but creativity connects—this approach builds lasting emotional connections while fueling brand performance. As Ogilvy puts it, data should never overshadow creativity. Instead, it should empower it. MOTIF® applies this philosophy by leveraging technology to enhance storytelling, creating experiences that are both meaningful and measurable.",
        },
      ],
    },
    {
      title: "Passion Driven",
      ariaLabel: "Passion",
      visuallyHiddenText: "example",
      description: [
        {
          text: "We’re not here to tell you we’re the best. What we are, is PASSIONATE. The Motif team is a bunch of passionate folks who want to make an impact in the eCommerce industry by working with your brand. Our passion-driven approach to eCommerce is what sets us apart. We go all the way to ensure your brand stands out and becomes the next benchmark for others to follow!",
        },
      ],
    },
    {
      title: "Good Isn't Enough",
      description: [
        {
          text: "The Motif team exudes confidence in their pursuit of greatness. With unwavering dedication to excellence, mediocrity and good enough simply does not make the cut. The team is determined to push boundaries and achieve remarkable outcomes. The Motif team understands that nothing short of excellence will suffice, and nothing can stop them from achieving extraordinary success.",
        },
      ],
    },
  ],
};
const cards = [
  {
    title: "Beginners friendly",
    description:
      "Jump right in! Our resources cater to all skill levels, ensuring a smooth learning curve for newcomers.",
  },
  {
    title: "Beginners friendly",
    description:
      "Jump right in! Our resources cater to all skill levels, ensuring a smooth learning curve for newcomers.",
  },
  {
    title: "Beginners friendly",
    description:
      "Jump right in! Our resources cater to all skill levels, ensuring a smooth learning curve for newcomers.",
  },
  {
    title: "Beginners friendly",
    description:
      "Jump right in! Our resources cater to all skill levels, ensuring a smooth learning curve for newcomers.",
  },
];

const glassCards = [
  {
    title: "Human First Approach",
    description: "We design experiences that put people at the center.",
  },
  {
    title: "AI-Driven Insights",
    description: "Leverage AI to extract real-time business intelligence.",
  },
  {
    title: "Secure Cloud Systems",
    description: "Build scalable and secure cloud infrastructure.",
  },
  {
    title: "Secure Cloud Systems2",
    description: "Build scalable and secure cloud infrastructure.",
  },
];


const AboutPage = () => {
  const iconSize = useResponsiveSize();
  const refTextbox = useRef<HTMLDivElement>(null);
  const relatedPages = getRelatedPages("/about");

  useGSAP(
    () => {
      if (refTextbox.current) {
        const text = refTextbox.current.querySelector(".founding_story");

        const textSplit = new SplitText(text, {
          type: "chars, words, lines",
        });

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: refTextbox.current,
            start: "center center",
            end: isMobile ? "+=500" : "+=1000",
            pin: true,
            pinType: "fixed",
            anticipatePin: 1,
            pinReparent: true,
            invalidateOnRefresh: true,
            scrub: true,
            toggleActions: "restart none none reverse",
          },
        });

        timeline
          .from(
            textSplit.chars,
            {
              opacity: 0.2,
              ease: "power3.out",
              duration: 0.7,
              stagger: 0.1,
            },
            0
          )
          .to(
            textSplit.chars,
            {
              opacity: 1,
              ease: "power3.out",
              duration: 0.7,
              stagger: 0.1,
            },
            0
          )
          .to(
            textSplit.chars,
            {
              opacity: 0.2,
              ease: "power3.out",
              duration: 0.7,
              stagger: 0.1,
            },
            1
          );
      }
    },
    { scope: refTextbox }
  );

  return (
    <div>
      {/* <SEOHead seo={aboutSEO} /> */}
      {/* SEO Internal Links - Hidden visually but accessible to bots/screen readers */}
      <RelatedPages 
        pages={relatedPages}
        heading="Related Information"
        visuallyHidden={true}
        ariaLabel="About page related links"
      />
      <section className="hidden sm:block layout_normal pt-28 pb-20 lg:pt-40 lg:px-0 w-[90%] md:w-[90%] lg:w-[70%]">
        <TitleImgBanner
          lines={mainBanner.lines}
          description={mainBanner.description}
        />
      </section>

      <HeroMobile />

      {/* <HeroMobileNew /> */}

      <section className="w-full">
        <FullMediaWidthAnim startWidth="70%">
          <VideoPlayer
            url="https://player.vimeo.com/video/1005542873"
            muted={true}
            autoplay={true}
            loop={true}
          />
        </FullMediaWidthAnim>
      </section>

      <section className="layout_normal px-4 lg:px-0 py-10 md:py-16 lg:py-0 xl:py-28 w-[90%] md:w-[90%] lg:w-[70%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-[1em]">
          <div>
            <h3 className="font-helvetica font-semibold text-section_subtitle_sm md:text-section_subtitle_md lg:text-section_subtitle_lg 2xl:text-section_subtitle_2xl leading-[1.2] text-typo-primary">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.1}
                duration={1}
              >
                ABOUT MOTIF®
              </TextAnimation>
            </h3>
          </div>
          <div>
            <h3 className="text-section_heading_sm md:text-section_heading_md lg:text-section_heading_lg 2xl:text-section_heading_2xl 3xl:text-[clamp(50px,2.5vw,60px)] leading-[1.1] font-semibold font-clash text-white">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0}
                duration={1.5}
              >
                Making the Motif® waves
                <br /> of excellence since 2015
              </TextAnimation>
            </h3>

            <p className="w-[100%] flex overflow-hidden lg;w-[80%] xl:w-[80%] 2xl:w-[90%] 3xl:w-[80%] 4xl:w-[80%] 5xl:w-[80%] text-base md:text-md leading-[1.5] lg:leading-[1.5] font-normal mt-4">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.005}
                delay={0.5}
                duration={0.8}
              >
                Motif® is more than a name; it represents our belief that every
                brand should have a unique motif. Motif® crafts bold,
                distinctive identities that connect brands with people and
                culture.
              </TextAnimation>
            </p>
            <p className="w-[100%] lg;w-[80%] xl:w-[80%] 2xl:w-[90%] 3xl:w-[80%] 4xl:w-[80%] 5xl:w-[80%] text-base md:text-md leading-[1.5] lg:leading-[1.5] font-normal mt-4">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.005}
                delay={0.5}
                duration={0.8}
              >
                Partners aren’t seen as clients they’re treated as true
                partners. Behind the scenes is a team of artists, eCommerce
                strategists, branding experts, storytellers, designers, and
                marketers all focused on helping brands grow with purpose and
                clarity.
              </TextAnimation>
            </p>
            <p className="w-[100%] lg;w-[80%] xl:w-[80%] 2xl:w-[90%] 3xl:w-[80%] 4xl:w-[80%] 5xl:w-[80%] text-base md:text-md leading-[1.5] lg:leading-[1.5] font-normal mt-4">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.005}
                delay={0.5}
                duration={0.8}
              >
                Motif® was never meant to be an agency. It started as one in
                2015, but quickly realized that traditional agencies chase
                short-term wins and surface-level fixes.
              </TextAnimation>
            </p>
            <p className="w-[100%] lg;w-[80%] xl:w-[80%] 2xl:w-[90%] 3xl:w-[80%] 4xl:w-[80%] 5xl:w-[80%] text-base md:text-md leading-[1.5] lg:leading-[1.5] font-normal mt-4">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.005}
                delay={0.5}
                duration={0.8}
              >
                So the model was scrapped, and an incubator was built instead
                one that grows brands through art, human behavior, and cultural
                connection, not through endless decks and empty metrics.
              </TextAnimation>
            </p>
          </div>
        </div>
      </section>

      <section className="py-40">
        <GsapImageMarquee sliderList={sliderList} />
      </section>

      <section
        ref={refTextbox}
        className="layout_normal lg:px-0 w-[90%] md:w-[70%] lg:w-[70%] mx-auto px-[16px] flex items-center"
      >
        <h3 className="founding_story font-clash text-left text-[1.7em] md:text-[2.4em] lg:text-[calc(100vw/25)] 3xl:text-[clamp(100px,5vw,105px)] leading-[1.2] font-semibold text-white">
          THE FOUNDING <br />
          STORY OF MOTIF®
        </h3>
      </section>

      <section className="layout_normal px-4 lg:px-0  md:py-16 lg:py-28 w-[90%] md:w-[90%] lg:w-[70%] mt-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:mt-40">
          <div>
            <h3 className="font-helvetica font-semibold text-section_subtitle_sm md:text-section_subtitle_md lg:text-section_subtitle_lg 2xl:text-section_subtitle_2xl leading-[1.2] text-typo-primary">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.1}
                duration={1}
              >
                FUELING THE FLAME
              </TextAnimation>
            </h3>
          </div>
          <div>
            <h3 className="w-[100%] lg;w-[80%] xl:w-[80%] 2xl:w-[80%] 3xl:w-[80%] 4xl:w-[80%] 5xl:w-[80%] text-section_heading_sm md:text-section_heading_md lg:text-section_heading_lg 2xl:text-section_heading_2xl 3xl:text-[clamp(45px,2.5vw,53px)] leading-[1.1] font-semibold font-clash text-white">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0}
                duration={1.5}
              >
                A gusty story of $100 <br />
                bill and a daring vision.
              </TextAnimation>
            </h3>

            <p className="w-[100%] lg;w-[80%] xl:w-[80%] 2xl:w-[80%] 3xl:w-[80%] 4xl:w-[80%] 5xl:w-[80%] text-base md:text-md leading-[1.5] lg:leading-[1.5] font-normal mt-4">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.005}
                delay={0.5}
                duration={0.8}
              >
                In 2015, Ash Ome, a fearless dream-chaser, founded MOTIF® with
                boundless enthusiasm and unstoppable spirit. With little agency
                know-how, he transformed a cramped, 4 X 6 garage-like nook into
                his vibrant creative oasis. His aspiration? To curate over 30
                remarkable brands, but he knew that meant collaborating with
                visionary founders and sharing their entrepreneurial voyage.{" "}
              </TextAnimation>
            </p>

            <p className="w-[100%] lg;w-[80%] xl:w-[80%] 2xl:w-[80%] 3xl:w-[80%] 4xl:w-[80%] 5xl:w-[80%] text-base md:text-md leading-[1.5] lg:leading-[1.5] font-normal mt-4">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0.005}
                delay={0.5}
                duration={0.8}
              >
                People called him too bold, too young, and unapologetically
                ambitious, Ash clung to his dreams. Cause Ash had little
                something we call Vision. Now, after eight adventurous years,
                the entrepreneurial fire still blazes brightly at MOTIF®,
                illuminating paths for others to chase their passions and
                rewrite their destinies with it&#39;s incubator program.
              </TextAnimation>
            </p>
          </div>
        </div>
      </section>

      <MadeToBreak />

      <section className="layout_normal h-screen flex items-center">
        <div className="w-full md:max-w-[70%] mx-auto p-[5%] tracking-[1px]">
          <Quote />
        </div>
      </section>

      <section className="py-10">
        <MarqueeInPage
          text={adSlider}
          speed={1.5}
          iconClass="text-[#ED5F09]"
          iconSize={"5vw"}
          direction={1}
        />
        <MarqueeInPage
          text={adSlider}
          speed={1.5}
          iconClass="text-[#ED5F09]"
          iconSize={"5vw"}
          direction={-1}
        />
      </section>

      <section className="layout_normal py-32 my-[10%] lg:py-40 w-[90%] md:w-[90%] lg:w-[70%]">
        <AccordianSection
          description={faq_section.description}
          title="WHAT & WHY"
          accordionList={faq_section.accordionList}
        />
      </section>

      <AppearanceCards />

      <section className="layout_normal py-32 lg:py-40 w-[90%] md:w-[90%] lg:w-[70%]">
        <RecommandationsAbout />
      </section>

      <MarqueeNavigation
        text={["WHAT WE DO"]}
        href="/what-we-do"
        speed={2.5}
        iconClass="text-[#ED5F09]"
        iconSize={iconSize}
      />
    </div>
  );
};

export default AboutPage;
