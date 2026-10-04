"use client";
import Image from "next/image";

import AccordianSection from "@/components/cards/AccordianSection";
import Specialized from "@/components/Specialized";
import TextAnimation from "@/components/ui/textAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import RecommandationWhatDo from "./RecommandationWhatDo";
import XCards from "./XCards";

const faq_section = {
  description: ["We might able to", "help you grow and", "scale if you're ..."],
  accordianList: [
    {
      title: "DTC or Retail Brand",
      description: [
        {
          text: "Are A direct-to-consumer (DTC) or Retail Fashion, Lifestyle or Beauty brand selling products you care deeply about.",
        },
      ],
    },
    {
      title: "Pre-Launch",
      description: [
        {
          text: "Pre-launch with an ambitious mindset, having marketing-led growth strategy and are planning to scale rapidly post-launch.",
        },
      ],
    },
    {
      title: "Growing Fast",
      description: [
        {
          text: "Are growing fast and investing in growth after you’ve taken off— and you’re ready to replace your cookie cutter solutions with a more stable, scalable version to accelerate your growth.",
        },
      ],
    },
    {
      title: "Emerging",
      description: [
        {
          text: "Generate more than $4M in a year or, you've a budget or you’re investing more than $250k per year on marketing, paid media and business development and looking to grow with a rock solid strategy and implementation.",
        },
      ],
    },
    {
      title: "Advisable",
      description: [
        {
          text: "Take advice seriously, take actions on a timely manner, see us as a partner rather than an agency and thirsty enough for growth.​",
        },
      ],
    },
    {
      title: "Goal oriented",
      description: [
        {
          text: "Having clear goals & objectives but you don’t quite know where to start or how best to achieve them.",
        },
      ],
    },
  ],
};

const motto = ["WE AIM TO DRIVE", "GROWTH, MAKE IMPACT", "AND ELEVATE BRANDS"];

const specializedData: any = [
  [
    "Specialized in",
    "growing",
    "Luxury",
    "Lifestyle",
    { imageSrc: "/assets/home/hero/hero1.webp", altText: "Luxury lifestyle brand storytelling by MOTIF® — incubator for fashion, beauty, and wellness growth" },
    "Fashion",
    { imageSrc: "/assets/home/hero/hero2.webp", altText: "Fashion brand incubation visual — MOTIF® scaling DTC and retail fashion beyond traditional agencies" },
    "And Beauty",
    { imageSrc: "/assets/home/hero/hero3.webp", altText: "Beauty and skincare growth strategy visual — MOTIF® builds iconic, enduring beauty brands with design and tech" },
    "Brands",
  ],
];

const Perspective = () => {
  const refBox = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (refBox.current) {
        const lines = refBox.current.querySelectorAll(
          ".mix-title-element-text"
        );
        const images = refBox.current.querySelectorAll(
          ".mix-title-element-image"
        );
        const brands = refBox.current.querySelectorAll(".perspective-brands");
        const titleTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: refBox.current,
            start: "top bottom",
            end: "bottom bottom+=200",
            toggleActions: "restart none none reset",
          },
        });

        const brandTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: refBox.current,
            start: "top center",
            end: "top top-=100",
            scrub: true,
          },
        });

        const screenW = window.innerWidth;
        let finalWidth;
        if (screenW >= 1536) {
          // 2xl
          finalWidth = "15vw";
        } else if (screenW >= 1280) {
          // xl
          finalWidth = "15vw";
        } else if (screenW >= 1024) {
          // lg
          finalWidth = "12vw";
        } else if (screenW >= 768) {
          // md
          finalWidth = "7vw";
        } else {
          // sm and below
          finalWidth = "20vw";
        }

        titleTimeline
          .fromTo(
            lines,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              delay: 1,
              duration: 1.5,
              ease: "power3.out",
            }
          )
          .fromTo(
            images,
            { width: 0, opacity: 0 },
            {
              width: finalWidth,
              opacity: 1,
              delay: 0,
              duration: 1,
              ease: "power3.out",
            },
            "<+0.5"
          );

        brandTimeline.fromTo(
          brands,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            delay: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: refBox }
  );

  return (
    <div
      ref={refBox}
      className="layout_normal mt-[5em] w-[90%] md:w-[90%] lg:w-[70%]"
    >
      <div className="flex flex-col md:flex-row justify-between flex-wrap md: flex-auto text-typo-primary"
      aria-label="Perspective on brand growth through strategic incubation and creative acceleration for luxury lifestyle, fashion, and beauty brands">
      <p className="sr-only">
        MOTIF® brings a different perspective to brand growth—not as a traditional fashion marketing agency, luxury lifestyle branding agency, or beauty & skincare growth agency—but as a brand incubator and accelerator. Specialized in growing direct-to-consumer and retail fashion, lifestyle, and beauty brands, MOTIF® helps partners overcome stagnation through a unique blend of strategy, artistic direction, and technology. With deep roots in creative storytelling and data-backed scaling, MOTIF® challenges the outdated agency model to deliver sustainable, high-impact growth.
      </p>
        <div className="text-sm md:text-[1vw] font-normal">
          {motto.map((el) => (
            <p
              className="text-persp_title_sm md:text-persp_title_md lg:text-persp_title_lg 2xl:text-persp_title_2xl font-normal leading-[1.2em] font-helvetica text-typo-primary"
              key={el}
            >
              <TextAnimation
                type="fadeUp"
                splitType="words"
                animationOn="words"
              >
                {el}
              </TextAnimation>
              
            </p>
            
          ))}
        </div>
        <div className="text-[6vw] lg:text-[6vw] font-semibold text-right -mt-8 md:mt-0">
          <h2 className="sr-only">
            A different perspective from a fashion growth partner, not a conventional agency
          </h2>

          <p className="justify-end flex overflow-hidden font-clash text-[6vw] md:text-[4rem] lg:text-[6vw] 3xl:text-[clamp(100px,6vw,135px)] leading-[1.2] [word-spacing: 0.1em] font-semibold text-typo-primary">
            <span className="mix-title-element-text opacity-0">WITH A</span>
          </p>
          <p className="justify-end flex overflow-hidden font-clash text-[6vw] md:text-[4rem] lg:text-[6vw] 3xl:text-[clamp(100px,6vw,135px)] leading-[1.2] [word-spacing: 0.1em] font-semibold text-typo-primary">
            <span className="mix-title-element-text opacity-0">DIFFERENT</span>
          </p>
          <p className="justify-end flex overflow-hidden font-clash text-[6vw] md:text-[4rem] lg:text-[6vw] 3xl:text-[clamp(100px,6vw,135px)] leading-[1.2] [word-spacing: 0.1em] font-semibold text-typo-primary">
            <span className="mix-title-element-text opacity-0">
              PERSPECTIVE +{" "}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <div className="relative mix-title-element-image opacity-0 h-[6vw] sm:h-[6vw] md:h-[5.5vw] 3xl:max-h-[clamp(100px,6.5vw,140px)] w-[5vw] sm:w-[25vw] md:w-[6.5vw] rounded-full overflow-hidden ml-auto">
              <Image
                className="absolute top-1/2 left-1/2 w-[5vw] sm:w-[25vw] md:w-[6.5vw] h-auto object-cover transform -translate-x-1/2 -translate-y-1/2 object-center"
                layout="responsive"
                src={
                  "/assets/what_we_do/demo-homepage-Portfolio-Gallery-Uncode-2022.webp"
                }
                alt="Demo homepage portfolio gallery showcasing MOTIF's brand incubation work"
                width={100}
                height={60}
              />
            </div>
            <p className="flex overflow-hidden font-clash text-[5vw] md:text-[4rem] lg:text-[6vw] 3xl:text-[clamp(100px,6vw,135px)] leading-[1.2] [word-spacing: 0.1em] font-semibold text-typo-primary">
              <span className="mix-title-element-text opacity-0">MOTIF®</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-10 md:gap-16 lg:gap-20 w-fit mx-auto my-24 lg:my-40">
        <div className="perspective-brands opacity-0">
          <Image
            src={"/assets/what_we_do/does/do-3.png"}
            width={100}
            height={80}
            alt="What we do icon 3 - Brand strategy and positioning"
          />
        </div>
        <div className="perspective-brands opacity-0">
          <Image
            src={"/assets/what_we_do/does/do-2.png"}
            width={100}
            height={80}
            alt="What we do icon 2 - Creative execution and design"
          />
        </div>
        <div className="perspective-brands opacity-0">
          <Image
            src={"/assets/what_we_do/does/do-1.png"}
            width={100}
            height={80}
            alt="What we do icon 1 - Strategic growth and scaling"
          />
        </div>
      </div>

      <XCards />

      <Specialized data={specializedData} />

      <section className="layout_normal pt-20 lg:pt-40 pb-20">
        <AccordianSection
          description={faq_section.description}
          title="COLLABORATION"
          accordionList={faq_section.accordianList}
          sticky={true}
        />
      </section>

      <section className="layout_normal"
      aria-label="Testimonials and brand recommendations for MOTIF®’s fashion, beauty, and lifestyle brand incubation services"
      >
        <h2 className="sr-only">
          What brands say about MOTIF® as their incubator, accelerator, and growth partner
        </h2>
        <p className="sr-only">
          Explore real testimonials from fashion, beauty, and luxury lifestyle brands MOTIF® has helped scale. These recommendations highlight the success of our incubator and growth partnership model—unlike traditional fashion marketing agencies or beauty branding firms. From eCommerce growth to brand transformation, these voices reflect the long-term impact of working with MOTIF®.
        </p>
        <RecommandationWhatDo />
      </section>
    </div>
  );
};

export default Perspective;
