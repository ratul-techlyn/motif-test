"use client";

import React from "react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface props {
  children: React.ReactNode;
  splitType: string;
  animationOn: string;
  type: string;
  duration?: number;
  stagger?: number;
  linesClass?: string;
  wordsClass?: string;
  charsClass?: string;
  delay?: number;
}

export default function TextAnimation({
  splitType,
  animationOn,
  children,
  type,
  duration = 1,
  stagger = 0.1,
  linesClass,
  wordsClass,
  charsClass,
  delay = 0,
}: props) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const splitText = new SplitText(textRef.current, {
          type: splitType as string,
          linesClass: linesClass,
          wordsClass: wordsClass,
          charsClass: charsClass,
        });

        const items =
          animationOn === "lines"
            ? splitText.lines
            : animationOn === "words"
            ? splitText.words
            : splitText.chars;

        // Safety check: ensure items exists and has length
        if (!items || items.length === 0) {
          console.warn("TextAnimation: No items found for animation", { animationOn, splitType });
          return;
        }

        const fadeUp = {
          y: 100,
          opacity: 0,
        };

        const fadeIn = {
          x: 10,
          opacity: 0,
        };

        const scrub = {
          opacity: 0.5,
        };

        let animation = {};

        switch (type) {
          case "fadeUp":
            animation = fadeUp;
            break;
          case "fadeIn":
            animation = fadeIn;
            break;
          case "scrub":
            animation = scrub;
            break;
          default:
            animation = fadeUp;
            break;
        }

        // Safety check: ensure gsap is available
        if (!gsap) {
          console.error("TextAnimation: GSAP is not available");
          return;
        }

        gsap.from(items, {
          ...animation,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top bottom",
            end: "bottom bottom+=200",
            toggleActions: "restart none none reset",
          },
          onComplete: () => splitText.revert(),
        });
      }
    });

    return () => ctx.revert();
  }, [animationOn, duration, splitType, stagger, type]);
  return (
    <span className="overflow-hidden flex flex-wrap">
      <span ref={textRef} className="text-animation-fade-up">
        {children}
      </span>
    </span>
  );
}
