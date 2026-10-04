"use client";

import TextAnimation from "@/components/ui/textAnimation";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonLabel?: string;
  linkHref?: string;
  onButtonClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const SectionInnerHero = ({
  title,
  subtitle,
  description,
  buttonLabel = "Learn More",
  linkHref,
  onButtonClick,
  imageSrc,
  imageAlt = "",
  className = "",
}: HeroSectionProps) => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0.5, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );
    }
  }, []);

  return (
    <section className={`py-16 w-full ${className}`}>
      {/* Hero Image */}
      <div className="relative w-[70%] mx-auto" ref={imageContainerRef}>
        <Image
          src={imageSrc || ""}
          alt={imageAlt}
          width={1920}
          height={900}
          priority
          className="w-full h-auto object-cover rounded-2xl"
        />

        {/* Overlay Title + Subtitle */}
        <div className="absolute bottom-[-10%] left-12 text-white max-w-[30%] z-10">
          {subtitle && (
            <TextAnimation
              splitType="words"
              animationOn="words"
              type="fadeUp"
              duration={0.6}
              stagger={0.1}
              wordsClass="subtitle-word"
            >
              <h4 className="text-xs md:text-xs uppercase font-medium mt-2">
                {subtitle}
              </h4>
            </TextAnimation>
          )}

          <TextAnimation
            splitType="lines"
            animationOn="lines"
            type="fadeUp"
            duration={0.8}
            stagger={0.2}
            linesClass="title-line"
          >
            <h3
              className="text-[1rem] md:text-[3.5rem] font-heading font-medium leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </TextAnimation>
        </div>
      </div>

      {/* Description + CTA */}
      <div className="mt-12 px-4 md:px-0 md:max-w-[60%] mx-auto flex justify-end">
        <div className="w-full md:w-[40%] text-left">
          <TextAnimation
            splitType="lines"
            animationOn="lines"
            type="fadeUp"
            duration={0.8}
            stagger={0.1}
            wordsClass="paragraph-word"
          >
            <p className="text-sm md:text-md font-body font-normal">
              {description}
            </p>
          </TextAnimation>

          {buttonLabel && (
            <div className="mt-10">
              {linkHref ? (
                <Link
                  href={linkHref}
                  className="inline-block bg-transparent border border-white text-white text-xs font-medium font-clash py-2 px-8 rounded-full hover:bg-white hover:text-black transition"
                >
                  {buttonLabel}
                </Link>
              ) : (
                <button
                  onClick={onButtonClick}
                  className="bg-transparent border border-white text-white text-xs font-medium font-clash py-2 px-8 rounded-full hover:bg-white hover:text-black transition"
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionInnerHero;
