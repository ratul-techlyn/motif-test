"use client";
import AnimatedLines from "@/components/AnimatedLines";
import { useAnimationComplete } from "@/context/AnimationContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import Marquee from "react-fast-marquee";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { img: "/assets/home/brand/brand1.png" },
  { img: "/assets/home/brand/brand2.png" },
  { img: "/assets/home/brand/brand3.png" },
  { img: "/assets/home/brand/brand4.png" },
  { img: "/assets/home/brand/brand5.png" },
  { img: "/assets/home/brand/brand6.png" },
  { img: "/assets/home/brand/brand7.png" },
  { img: "/assets/home/brand/brand8.png" },
];

const AsSeenOn = () => {
  const [direction, setDirection] = useState<"left" | "right">("left");
  const onFinish = () => {
    setDirection(direction === "left" ? "right" : "left");
  };

  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeContainer = useRef<HTMLDivElement>(null);
  const { hasLoadedAnimationFinished, hasPageTransitionFinished, isBot } =
    useAnimationComplete();

  useGSAP(
    () => {
      if (marqueeRef.current && marqueeContainer.current && !isBot) {
        let lastDirection = 0;

        gsap.to(marqueeContainer.current, {
          scrollTrigger: {
            trigger: marqueeContainer.current,
            start: "top center",
            end: "bottom center",
            onUpdate: (self) => {
              const currentDirection = self.direction;

              if (currentDirection !== lastDirection) {
                lastDirection = currentDirection;

                // Subtle horizontal "nudge"
                gsap.fromTo(
                  marqueeContainer.current,
                  { x: currentDirection > 0 ? -15 : 15 },
                  {
                    x: 0,
                    duration: 0.4,
                    ease: "power2.out",
                  }
                );

                setDirection(currentDirection > 0 ? "right" : "left");
              }
            },
          },
        });
      }
    },
    {
      scope: marqueeRef,
      dependencies: [hasLoadedAnimationFinished, hasPageTransitionFinished, isBot],
    }
  );

  return (
    <section
      ref={marqueeRef}
      className="layout_normal relative mt-3 md:mt-[6%] py-3 md:py-8 w-[90%] md:w-[90%] lg:w-[70%] md:px-0"
      aria-label="Press features and brand mentions of MOTIF® as a fashion and beauty incubator"
    >
      <div className="absolute left-0 right-0 -top-[2.2vw] md:-top-[1vw] lg:-top-[calc(100vw/150)] left-0 flex items-center gap-4 px-3 w-full font-helvetica uppercase font-bold text-section_title_sm md:text-section_title_md lg:text-section_title_lg 2xl:text-section_title_2xl text-typo-primary bg-primary">
        <span className="whitespace-nowrap"><h5>AS SEEN ON</h5></span>
        <h5 className="sr-only">
          Featured press coverage and brand collaborations – MOTIF® as a global fashion marketing agency, luxury lifestyle branding partner, and beauty growth incubator.
        </h5>
        <p className="sr-only sr-only-as-seen-on-description">
          MOTIF® has been featured by global media outlets and press platforms, showcasing its role as a brand incubator, growth partner, and strategic force in scaling luxury fashion, beauty, and lifestyle brands.
        </p>
        <div className="flex-1 flex justify-end">
          <div className="w-full">
            <AnimatedLines
              direction="left"
              triggerRef={marqueeContainer as React.RefObject<HTMLElement>}
              delay={0}
            />
          </div>
        </div>
      </div>

      <div
        ref={marqueeContainer}
        className="relative overflow-hidden min-h-[64px]"
      >
        <Marquee
          gradient={false}
          speed={120}
          direction={direction}
          className="w-full overflow-y-hidden h-[4rem]"
          onFinish={onFinish}
        >
          {brands.map((brand, index) => (
            <span
              key={index}
              className="flex items-center w-[20vw] sm:w-[26vw] md:w-[calc(100vw/7)] lg:w-[calc(100vw/9)] text-white font-bold mx-[3vw] sm:mx-[3vw] md:mx-6"
            >
              <Image
                src={brand.img || "/placeholder.svg"}
                width={130}
                height={60}
                alt=""
              />
            </span>
          ))}
        </Marquee>

        {/* Left gradient overlay */}
        <div
          className="absolute left-0 top-0 h-full w-[150px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        {/* Right gradient overlay */}
        <div
          className="absolute right-0 top-0 h-full w-[150px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to left, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
      </div>

      <AnimatedLines
        direction="right"
        position="bottom"
        absolute
        triggerRef={marqueeContainer as React.RefObject<HTMLElement>}
        delay={0.4}
      />
    </section>
  );
};

export default AsSeenOn;
