"use client";

import TextAnimation from "@/components/ui/textAnimation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  imageSrc: string;
  title: string;
  description: string;
}

interface ServiceScrollGridProps {
  items: ServiceItem[];
  className?: string;
}

const ServiceScrollGrid: React.FC<ServiceScrollGridProps> = ({
  items,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardElements =
        containerRef.current?.querySelectorAll(".service-card");

      cardElements?.forEach((card, index) => {
        const image = card.querySelector(".card-image");

        gsap.set(card, { opacity: 0, y: 60 });
        gsap.set(image, { opacity: 0, scale: 0.96 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        tl.to(
          image,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        ); // Overlap slightly for harmony
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`w-full ${className}`}>
      <div className="px-6 md:px-12 flex justify-center">
        <div
          ref={containerRef}
          className="flex md:grid md:grid-cols-3 gap-x-4 md:gap-x-20 snap-x snap-mandatory md:snap-none scroll-smooth overflow-x-auto md:overflow-visible pb-6 md:pb-0  max-w-[1200px] w-full"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="service-card flex-shrink-0 snap-start md:snap-none w-[clamp(300px,32vw,400px)] flex flex-col items-start"
            >
              {/* Image */}
              <img
                src={item.imageSrc}
                alt={item.title}
                className="card-image transform-gpu w-full h-[clamp(300px,28vw,450px)] object-cover rounded-lg mb-4"
              />

              {/* Title */}
              <TextAnimation
                splitType="words"
                animationOn="words"
                type="fadeUp"
                duration={0.9}
                stagger={0.08}
                delay={0.2 + index * 0.15}
              >
                <span className="text-lg md:text-xl font-semibold text-white mb-2">
                  {item.title}
                </span>
              </TextAnimation>

              {/* Description */}
              <TextAnimation
                splitType="lines"
                animationOn="lines"
                type="fadeUp"
                duration={0.9}
                stagger={0.06}
                delay={0.35 + index * 0.15}
              >
                <p className="text-sm md:text-md text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </TextAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceScrollGrid;
