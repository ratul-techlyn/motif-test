'use client';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap } from '@/lib/gsap'; // pulls registered GSAP + ScrollTrigger
import Image from 'next/image';
import { useRef } from 'react';
import SplitType from 'split-type';

const HeroMobile = () => {
  const refBox = useRef<HTMLDivElement>(null);
  const capsulesRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!refBox.current) return;

    const ctx = gsap.context(() => {
      // ⬆️ Headers Animation
      const headers = refBox.current?.querySelectorAll('.anm-hero-h2');
      if (headers?.length) {
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

      // ↔️ Paragraph Animation
      const para = refBox.current?.querySelector('.anm-hero-pera');
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

      // ✨ Capsule Image Animation
      const capsules = capsulesRef.current?.querySelectorAll('.capsule');
      if (capsules?.length) {
        gsap.fromTo(
          capsules,
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
    }, refBox);

    return () => ctx.revert(); // Safely kill all triggers on unmount
  }, []);

  return (
    <section
      ref={refBox}
      className="sm:hidden overflow-hidden layout_normal mt-[11%] px-2 w-[90%] font-clash font-semibold text-typo-primary text-hero_title_sm mt-[75px] mb-[45px]"
    >
      <h2 className="text-[1.9rem] leading-[1.2] anm-hero-h2 uppercase">
        The B2B Agency For BigCommerce
      </h2>
      <h2 className="text-[1.9rem] leading-[1.2] anm-hero-h2 uppercase">
        You Wished Existed
      </h2>

      <div ref={capsulesRef} className="flex items-center justify-between gap-2">
        <div className="capsule mt-10 w-[22vw] h-[8vw] rounded-full overflow-hidden bg-cover bg-center bg-no-repeat ml-[3%] flex-shrink-0">
          <Image
            src="/assets/about/slide/luxury_lifestyle_brand_motif.png"
            alt="Lifestyle portrait"
            width={320}
            height={220}
            className="w-full h-full object-cover object-top-center"
          />
        </div>
        <div className="capsule -mt-5 w-[22vw] h-[8vw] rounded-full overflow-hidden bg-cover bg-center bg-no-repeat ml-[3%] flex-shrink-0">
          <Image
            src="/assets/about/slide/motif_not_an_agency_bbeauty_brand_marketing.png"
            alt="Beauty brand marketing"
            width={320}
            height={220}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="capsule mt-3 w-[22vw] h-[8vw] rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0">
          <Image
            src="/assets/about/slide/beauty_brand_motif_inc-1.jpeg"
            alt="Fashion group with sunglasses"
            width={280}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-[35px]">
        <p className="anm-hero-pera font-helvetica text-hero_subtitle_sm md:text-hero_subtitle_md lg:text-hero_subtitle_lg 2xl:text-hero_subtitle_2xl 3xl:text-[clamp(22px,1.47vw,30px)] font-normal leading-[1.4] md:leading-[1.2] lg:leading-[1] text-[#848484] max-w-full">
          BigCommerce has the backbone to support serious B2B. But building the
          systems, workflows, and integrations that actually scale? That takes more than
          platform knowledge. PulseB2B is a team of real B2B specialists team who build powerful, logic-led infrastructure
          on BigCommerce to help you grow without cracking your ops.
        </p>
      </div>
    </section>
  );
};

export default HeroMobile;
