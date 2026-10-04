"use client";

import { useAnimationContext } from "@/context/AnimationContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface FlyingTextProps {
  text: string;
  className?: string;
  addToTimeline?: boolean;
}

export default function FlyingText({
  text,
  className,
  addToTimeline = false,
}: FlyingTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { timeline } = useAnimationContext();

  useIsomorphicLayoutEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;
    const parent = el.parentElement;

    const ctx = gsap.context(() => {
      el.innerHTML = "";

      const words = text.split(" ");
      words.forEach((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.willChange = "transform, opacity";
        el.appendChild(span);
      });

      const spans = el.querySelectorAll("span");
      const icon = parent?.querySelector(".anm-quote-pera");
      const author = parent?.querySelector(".anm-quote-author");

      // Animate spans
      spans.forEach((word, i) => {
        const x = gsap.utils.random(-200, 200);
        const y = gsap.utils.random(-150, 150);
        const rotation = gsap.utils.random(-30, 30);

        const anim = gsap.fromTo(
          word,
          {
            opacity: 0,
            scale: 5,
            rotation,
            x,
            y,
            rotationX: 20,
            rotationY: 20,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: word,
              start: "top center",
              end: "top 25%",
              scrub: 0.25,
              toggleActions: "play reverse",
            },
          }
        );

        if (addToTimeline && timeline.current) {
          timeline.current.add(anim, `+=${i * 0.05}`);
        }
      });

      // Animate icon
      if (icon) {
        gsap.fromTo(
          icon,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: parent,
              start: "top center",
              end: "top 40%",
              scrub: 0.3,
            },
          }
        );
      }

      // Animate author
      if (author) {
        gsap.fromTo(
          author,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: parent,
              start: "top center+=20%",
              end: "top 20%",
              scrub: 0.3,
            },
          }
        );
      }
    }, textRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <p
      ref={textRef}
      className={cn(
        "text-2xl md:text-xl sm:text-lg flex flex-wrap [&>span]:inline-block [&>span]:mx-1 quote-paragraph font-helvetica text-testimonial_sm md:text-testimonial_md lg:text-testimonial_lg 2xl:text-testimonial_2xl 3xl:text-[clamp(20px,1.7vw,35px)] font-medium leading-[1.2] text-typo-primary",
        className
      )}
    ></p>
  );
}
