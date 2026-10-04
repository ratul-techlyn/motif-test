"use client";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import React, { useRef } from "react";

type HomeTitleMixImgProps = {
  data: (string | { imageSrc: string; altText?: string })[][];
  classNameLine?: string;
  classNameText?: string;
  classNameWrap?: string;
};

const Specialized: React.FC<HomeTitleMixImgProps> = ({
  data,
  classNameLine,
  classNameText,
  classNameWrap,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (sectionRef.current) {
        const headings =
          sectionRef.current.querySelectorAll(".specialized-text");
        const images = sectionRef.current.querySelectorAll(".specialized-img");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
            pin: true,
            toggleActions: "play none none none",
          },
        });

        tl.from(images, {
          x: (i) => Math.random() * 500 - 250,
          y: (i) => Math.random() * 150 - 25,
          opacity: 0,
          duration: 0.5,
          ease: "circ.inOut",
        }).from(headings, {
          x: (i) => (i % 2 !== 0 ? -100 : 100),
          opacity: 0,
          stagger: 0.2,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      aria-label="MOTIF® specialized approach for scaling fashion, beauty, and luxury lifestyle brands through brand incubation, strategic communication, and experience design — not just another fashion marketing agency"
      className={[
        "layout_normal w-[90%] md:w-[90%] h-screen flex items-center uppercase text-special_hero_title_sm md:text-special_hero_title_md lg:text-special_hero_title_lg xl:text-special_hero_title_lg font-clash font-semibold text-typo-primary transform translate-x-0 translate-y-0 opacity-100 ",
        classNameWrap,
      ].join(" ")}
    >
      <h1>
        <span className="sr-only">
          MOTIF® is a brand incubator and strategic growth partner for fashion, beauty, and luxury lifestyle brands — offering a smarter alternative to traditional agencies through design, marketing, and full-stack execution.
        </span>
        {data.map((row, rowIndex) => (
          <span
            key={rowIndex}
            className={[
              "flex flex-wrap items-center gap-x-2 leading-[1.1] tracking-[1.5px] justify-center",
              classNameLine,
            ].join(" ")}
          >
            {row.map((item, itemIndex) =>
              typeof item === "string" ? (
                <span
                  key={itemIndex}
                  className={[
                    cn("relative visible inline-block", {
                      " text-justify": rowIndex !== data.length - 1,
                    }),
                    "specialized-text font-clash font-semibold uppercase leading-[1.2] [word-spacing:0.1em]",
                    classNameText,
                  ].join(" ")}
                >
                  {item}
                </span>
              ) : (
                <span
                  key={itemIndex}
                  className="specialized-img relative visible inline-block rounded-full w-[20vw] md:w-[7vw] h-[40px] md:h-[3vw] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${item.imageSrc})`,
                    aspectRatio: "1 / 1",
                  }}
                >
                  <Link
                    href={"/"}
                    className="inner absolute top-[0] left-[0] w-full h-full flex items-center justify-center text-white text-sm font-bold"
                  >
                    Go
                  </Link>
                </span>
              )
            )}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Specialized;
