"use client";
import FlyingText from "@/components/lib_comp/FlyingText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import QuoteSvg from "../icons/QuoteSvg";

gsap.registerPlugin(ScrollTrigger);

const QuoteData = {
  author: "A$H OME",
  description:
    "I believe that every brand should have a motif behind it that fuels them to grow and scale with purpose. Based on this belief, I started MOTIF® and till now, I am fueled by the same thing. A brand without a motif or purpose is just another business out there.",
};

const Quote = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".anm-quote-icon svg",
        {
          y: 80,
          opacity: 0,
          scale: 0.85,
          rotate: -8,
          filter: "drop-shadow(0 0 0px rgba(255, 111, 24, 0))",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "drop-shadow(0 0 18px rgba(255, 111, 24, 0.7))",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anm-quote-icon",
            start: "top center+=80",
            end: "top center",
            scrub: 0.4,
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".anm-quote-author",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anm-quote-author",
            start: "top 85%",
            end: "top 50%",
            scrub: 0.4,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto px-6 py-8 md:py-12 transition-all duration-500 will-change-[filter]"
    >
      <div className="anm-quote-icon w-fit">
        <QuoteSvg fill="#FF6F18" />
      </div>

      <blockquote>
        <FlyingText
          className="mt-[5%] font-clash text-large_para_sm md:text-3xl lg:text-3xl 2xl:text-3xl font-semibold leading-[1.2] text-typo-primary"
          text={QuoteData.description}
        />
        <p className="anm-quote-author mt-[5%] font-bold text-[#aaa] text-[1rem] tracking-wider">
          {QuoteData.author}
        </p>
      </blockquote>
    </div>
  );
};

export default Quote;
