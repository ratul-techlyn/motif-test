"use client";
import { useAnimationComplete } from "@/context/AnimationContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from "split-type";

const rollingWords = ["FASHION", "BEAUTY", "LUXURY", "LIFESTYLE"];

const HeroMobile = () => {
  const refBox = useRef<HTMLDivElement>(null);
  const rollingRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const ofContainerRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const { hasLoadedAnimationFinished, hasPageTransitionFinished } =
    useAnimationComplete();

  // Text Reveal Sequence
  useGSAP(
    () => {
      if (refBox.current && hasLoadedAnimationFinished) {
        const headers = Array.from(
          refBox.current?.querySelectorAll(".anm-hero-split") ?? []
        );
        const para = paragraphRef.current;
        const of = ofContainerRef.current;
        const rolling = rollingRef.current;
        const brand = brandRef.current;

        if (!headers.length || !para) return;

        const tl = gsap.timeline();

        // 1 & 2: Animate each heading - start immediately
        headers.forEach((header, index) => {
          const split = new SplitType(header as HTMLElement, {
            types: "words",
            tagName: "span",
          });
          tl.from(
            split.words,
            {
              y: 60,
              opacity: 1,
              stagger: 0.05, // Reduced from 0.07 for faster reveal
              duration: 1, // Reduced from 1.2 for snappier animation
              ease: "power3.out",
              onComplete: () => {
                split.revert();
              },
            },
            index === 0 ? 0 : "-=0.7" // Increased overlap for faster sequence
          );
        });

        // 4: "OF" - start sooner
        if (of) {
          tl.from(
            of,
            {
              y: 40,
              opacity: 0,
              duration: 0.8, // Reduced from 1s
              ease: "power2.out",
            },
            "-=0.8" // Increased overlap
          );
        }

        // 5: Rolling - start sooner
        if (rolling) {
          tl.from(
            rolling,
            {
              y: 40,
              opacity: 0,
              duration: 0.8, // Reduced from 1s
              ease: "power2.out",
            },
            "-=0.9" // Increased overlap from -=0.8
          );
        }

        // 6: BRANDS - start sooner
        if (brand) {
          const splitBrand = new SplitType(brand, {
            types: "words",
            tagName: "span",
          });
          tl.from(
            splitBrand.words,
            {
              y: 50,
              opacity: 0,
              stagger: 0.03, // Reduced from 0.05 for faster reveal
              duration: 0.8, // Reduced from 1s
              ease: "power2.out",
            },
            "-=0.7" // Increased overlap from -=0.6
          );
        }

        // 7: Paragraph - start sooner with less delay
        const splitPara = new SplitType(para, {
          types: "words",
          tagName: "span",
        });
        tl.from(
          splitPara.words,
          {
            x: 30,
            opacity: 0,
            stagger: 0.03, // Reduced from 0.05 for faster reveal
            duration: 0.8, // Reduced from 1s
            delay: 0.1, // Reduced from 0.2s
            ease: "power2.out",
          },
          "-=0.7" // Increased overlap from -=0.6
        );

        const currentCapsule = refBox.current.querySelector(".jb-capsoul");

        if (currentCapsule) {
          gsap.from(currentCapsule, {
            width: 0,
            opacity: 0,
            duration: 1, // Reduced from 1.2s
            delay: 0.8, // Reduced from 1s
            ease: "power2.out",
          });
        }

        const container = ofContainerRef.current?.parentElement;
        const containerPx = container?.offsetWidth || 300;

        const circleWidths = [72, 84, 84, 45];
        const containerWidths = [0.4, 0.4, 0.9, 0.6].map(
          (w) => `${w * containerPx}px`
        );
        const rollingHeight =
          rollingRef.current?.firstElementChild?.clientHeight || 40;

        gsap.set(rollingRef.current, { y: 0 });
        gsap.set(circleRef.current, { width: `${circleWidths[0]}px` });
        gsap.set(ofContainerRef.current, { width: containerWidths[0] });

        const tlNew = gsap.timeline({
          repeat: -1,
          onRepeat: function () {
            gsap.set(rollingRef.current, { y: 0 });
          },
        });

        const wordScrollDuration = 0.4; // Reduced from 0.5s for snappier transitions
        const circleResizeDuration = 0.6; // Reduced from 0.8s
        const stepDelay = 1.8; // Reduced from 2s for faster word cycling

        for (let i = 0; i <= rollingWords.length; i++) {
          const idx = i % rollingWords.length;
          const startTime = i * stepDelay;

          tlNew
            .to(
              rollingRef.current,
              {
                y: -i * rollingHeight,
                duration: wordScrollDuration,
                ease: "power1.inOut",
              },
              startTime
            )
            .to(
              circleRef.current,
              {
                width: `${circleWidths[idx]}px`,
                duration: circleResizeDuration,
                ease: "power1.inOut",
              },
              "<-0.15" // Adjusted timing
            );
        }
      }
    },
    {
      scope: refBox,
      dependencies: [hasLoadedAnimationFinished, hasPageTransitionFinished],
    }
  );

  return (
    <section
      data-mobile-label="The Motif"
      ref={refBox}
      className="hidden sm:block layout_normal mt-[11%] md:mt-[11%] 2xl:mt-[4%] px-2 w-[90%] md:w-[90%] lg:w-[70%] 2xl:w-[70%]"
    >
      <h2 className="uppercase anm-hero-split text-home_hero_title_sm md:text-home_hero_title_md lg:text-[3vw] font-clash font-semibold text-typo-primary leading-[1.2] [word-spacing:0.1em]">
        Shaping The Success
        <span
          ref={ofContainerRef}
          className="absolute left-0 flex items-center anm-hero-of pt-0.5"
        >
          <span className="ml-0">F</span>
          <span className="relative mr-2 flex items-end justify-center">
            <span
              ref={circleRef}
              className="inline-block h-[2rem] border-[6px] border-current rounded-full"
            />
          </span>
          <span className="ml-0">R</span>
        </span>
        <span
          className="anm-hero-rolling ml-[5.5rem] block overflow-hidden"
          style={{ height: "2.4rem", lineHeight: "2.4rem" }}
        >
          <div
            ref={rollingRef}
            className="text-right"
            style={{ willChange: "transform" }}
          >
            {[...rollingWords, rollingWords[0]].map((word, i) => (
              <div
                key={i}
                className="block"
                style={{ height: "2.5rem", lineHeight: "2.5rem" }}
              >
                {word}
              </div>
            ))}
          </div>
        </span>
        with strategy, obsession and
      </h2>

      <div className="text-[clamp(1.6rem,3vw+2rem,3.5rem)] uppercase inline-flex gap-2 text-home_hero_title_sm md:text-home_hero_title_md xl:text-home_hero_title_lg font-clash font-semibold text-typo-primary leading-[1.2]">
        <span>bold Ideas For</span>
        <span className="relative gap-2 flex items-center">
          <span
            ref={ofContainerRef}
            className="absolute left-0 flex items-center anm-hero-of pt-0.5"
          >
            <span className="ml-0">F</span>
            <span className="relative mr-2 flex items-end justify-center">
              <span
                ref={circleRef}
                className="inline-block h-[2rem] border-[6px] border-current rounded-full"
              />
            </span>
            <span className="ml-0">R</span>
          </span>
          <span
            className="anm-hero-rolling ml-[5.5rem] block overflow-hidden"
            style={{ height: "2.4rem", lineHeight: "2.4rem" }}
          >
            <div
              ref={rollingRef}
              className="text-right"
              style={{ willChange: "transform" }}
            >
              {[...rollingWords, rollingWords[0]].map((word, i) => (
                <div
                  key={i}
                  className="block"
                  style={{ height: "2.5rem", lineHeight: "2.5rem" }}
                >
                  {word}
                </div>
              ))}
            </div>
          </span>
        </span>
      </div>

      <h2 className="text-[clamp(1.6rem,3vw+2rem,2.3rem)] leading-[1.2] flex items-center uppercase">
        <span className="overflow-hidden ml-[3%] w-[28vw] h-[10vw] rounded-full jb-capsoul">
          <span
            className="inline-block relative visible rounded-full w-[28vw] h-[10vw] bg-cover bg-center bg-no-repeat hero_ani_text"
            style={{
              aspectRatio: "1 / 1",
              backgroundSize: "28vw",
              margin: "0 0 1% 3%",
            }}
          />
        </span>
      </h2>

      <div className="mt-[15px]">
        <p
          ref={paragraphRef}
          className="anm-hero-pera overflow-hidden 2xl:max-w-[90%] lg:max-w-[90%] sm:max-w-full font-helvetica text-hero_subtitle_sm md:text-hero_subtitle_md lg:text-hero_subtitle_lg 2xl:text-hero_subtitle_2xl 3xl:text-[clamp(20px,30px,32px)]  md:w-[95%] font-medium text-typo-mute"
        >
          Once an advertising and branding agency, now a global incubator that
          builds, grows, and scales luxury lifestyle, fashion, and beauty brands
          through innovative strategies, human-first approaches, powerful
          creatives & crazy ideas.
        </p>
      </div>
    </section>
  );
};

export default HeroMobile;
