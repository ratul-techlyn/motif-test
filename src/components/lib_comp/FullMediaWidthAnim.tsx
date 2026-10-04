"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface FullMediaWidthAnimProps {
  children: React.ReactNode;
  startWidth?: string;
  endWidth?: string;
  blur?: boolean;
  scale?: boolean;
  contrast?: boolean;
  clipPath?: boolean;
  velocitySensitive?: boolean;
  className?: string;
}

const FullMediaWidthAnim = ({
  children,
  startWidth = "60%",
}: FullMediaWidthAnimProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "top top-=500",
            scrub: true,
          },
        });

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (!isMobile) {
          tl.from(containerRef.current, {
            width: startWidth,
            duration: 1,
            ease: "power2.out",
          });
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <div className="overflow-hidden w-full h-auto lg:h-screen flex items-center justify-center m-0 p-0">
      <div ref={containerRef} className="w-full h-auto lg:h-screen">
        {children}
      </div>
    </div>
  );
};

export default FullMediaWidthAnim;
