'use client';

import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import SplitType from 'split-type';

interface Capsule {
  src: string;
  alt: string;
  bgPosition?: 'top' | 'center' | 'bottom';
  ariaLabel?: string;
  srOnly?: string;
}

interface MobileHeroProps {
  headlines: string[];
  paragraph: string;
  capsules: Capsule[];
  ariaLabel?: string;
  srOnly?: string;
}

const MobileHeroSection = ({
  headlines,
  paragraph,
  capsules,
  ariaLabel,
  srOnly,
}: MobileHeroProps) => {
  const refBox = useRef<HTMLDivElement>(null);
  const capsulesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (refBox.current && capsulesRef.current) {
      const headers = refBox.current.querySelectorAll('.anm-hero-h2');
      if (headers.length) {
        const splitHeaders = new SplitType(Array.from(headers) as HTMLElement[], {
          types: 'words',
          tagName: 'span',
        });

        gsap.fromTo(
          splitHeaders.words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            ease: 'power3.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: headers[0],
              start: 'top 90%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      const para = refBox.current.querySelector('.anm-hero-pera');
      if (para) {
        const splitPara = new SplitType(para as HTMLElement, {
          types: 'words',
          tagName: 'span',
        });

        gsap.fromTo(
          splitPara.words,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.05,
            delay: 0.2,
            ease: 'power2.out',
            duration: 1,
            scrollTrigger: {
              trigger: para,
              start: 'top 95%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      const capsuleElems = capsulesRef.current.querySelectorAll('.capsule');
      if (capsuleElems.length) {
        gsap.fromTo(
          capsuleElems,
          { y: 60, scale: 0.95, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: capsulesRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }
  }, { scope: refBox });

  return (
    <section
      ref={refBox}
      className="sm:hidden overflow-hidden layout_normal mt-[11%] px-2 w-[90%] font-clash font-semibold text-typo-primary text-hero_title_sm mt-[75px] mb-[45px]"
      aria-label={ariaLabel}
    >
      {srOnly && <span className="sr-only">{srOnly}</span>}

      {headlines.map((text, i) => (
        <h2 key={i} className="text-[1.9rem] leading-[1.2] anm-hero-h2 uppercase">
          {text}
        </h2>
      ))}

      <div ref={capsulesRef} className="flex items-center justify-between gap-2">
        {capsules.map((capsule, i) => {
          const positionClass =
            capsule.bgPosition === 'top'
              ? 'object-top'
              : capsule.bgPosition === 'bottom'
              ? 'object-bottom'
              : 'object-center';

          // Preserve original staggered layout
          const capsuleMarginClass =
            i === 0 ? 'mt-10' : i === 1 ? '-mt-5' : 'mt-3';

          return (
            <div
              key={i}
              className={`capsule ${capsuleMarginClass} w-[22vw] h-[8vw] rounded-full overflow-hidden bg-cover bg-no-repeat flex-shrink-0`}
              aria-label={capsule.ariaLabel}
            >
              {capsule.srOnly && <span className="sr-only">{capsule.srOnly}</span>}
              <Image
                src={capsule.src}
                alt={capsule.alt}
                width={320}
                height={220}
                className={`w-full h-full object-cover ${positionClass}`}
              />
            </div>
          );
        })}

      </div>

      <div className="mt-[35px]">
        <p className="anm-hero-pera font-helvetica text-hero_subtitle_sm md:text-hero_subtitle_md lg:text-hero_subtitle_lg 2xl:text-hero_subtitle_2xl 3xl:text-[clamp(22px,1.47vw,30px)] font-normal leading-[1.4] md:leading-[1.2] lg:leading-[1] text-[#848484] max-w-full">
          {paragraph}
        </p>
      </div>
    </section>
  );
};

export default MobileHeroSection;
