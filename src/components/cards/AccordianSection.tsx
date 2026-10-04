"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import Accordion, { TAccordionItem } from "../shared/Accordion";
import TextAnimation from "../ui/textAnimation";

gsap.registerPlugin(ScrollTrigger);

interface CollaborationProps {
  title?: string;
  description: string[];
  accordionList: TAccordionItem[];
  sticky?: boolean;
}

const AccordianSection: React.FC<CollaborationProps> = ({
  title,
  description,
  accordionList,
  sticky = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (sticky && sectionRef.current) {
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=100",
            end: "+=300",
            pin: true,
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-[35%_55%] gap-4 md:gap-x-[10%] w-full mx-auto"
    aria-label="MOTIF®’s strategic brand collaboration and incubator capabilities for scaling fashion, beauty, and luxury lifestyle brands"
    >

      <h2 className="sr-only">
        Explore how MOTIF® partners with fashion, beauty, and lifestyle brands as a growth partner—not an agency
      </h2>
      <p className="sr-only">
        MOTIF® offers a deep collaboration framework across brand strategy, marketing implementation, and creative acceleration.
        These accordion items detail our approach to incubating and scaling luxury lifestyle, fashion, and beauty brands through end-to-end services—beyond the limitations of traditional agencies.
      </p>
      <div
        ref={sectionRef}
        className="self-start md:sticky md:top-20 text-left pl-0"
      >
        {title && (
          <h5 className="uppercase font-helvetica text-section_title_sm md:text-section_title_md lg:text-section_title_lg 2xl:text-section_title_2xl font-semibold text-typo-primary mb-4">
            <TextAnimation type="fadeUp" splitType="words" animationOn="words">
              {title}
            </TextAnimation>
          </h5>
        )}

        {description.map((line, index) => (
          <h4
            key={index}
            className="font-clash text-lft_section_heading_sm md:text-lft_section_heading_md lg:text-lft_section_heading_lg 2xl:text-lft_section_heading_2xl font-semibold leading-tight text-typo-primary"
          >
            <TextAnimation type="fadeUp" splitType="words" animationOn="words">
              {line}
            </TextAnimation>
          </h4>
        ))}
      </div>
      <div
        className={`ml-auto mt-16 ${
          sticky ? "md:mt-16" : "md:mt-0"
        }  md:pl-5 pr-3 flex justify-end`}
      >
        <section>
          <Accordion items={accordionList} titleClass="font-clash" />
        </section>
      </div>
    </section>
  );
};

export default AccordianSection;
