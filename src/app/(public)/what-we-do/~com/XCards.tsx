"use client";
import Image from "next/image";
import { useRef } from "react";
import { FiMinus } from "react-icons/fi";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    XName: "ThrivePlan®",
    title: "The Growth Strategy",
    img: "/assets/what_we_do/Main-graphic-1x1-1.png",
    description:
      "Today, you are competing 24/7 for a digitally connected customer. We create strategies that empower you to beat competition, grow revenue, and win in the digital age.",
    seoContext:
      "ThrivePlan® by MOTIF® is a fashion growth strategy framework developed for direct-to-consumer and retail brands looking to scale. Unlike traditional fashion marketing agencies or beauty growth consultants, MOTIF® acts as a true incubator and strategic growth partner—combining digital strategy, omni-channel audits, competitive benchmarking, and persona-driven planning to fuel long-term brand impact.",
    packagePoints: [
      "Digital Strategy",
      "Omni-Channel Audits",
      "Planning, Forecasting & Benchmarking",
      "Growth Consultation",
      "Competitive Analysis",
      "Audience & Personas",
      "Social Media Strategy",
      "Email Marketing Strategy",
      "DTC & Retail Strategy",
    ],
  },
  {
    XName: "ImpactCX®",
    title: "The Experience Design",
    img: "/assets/what_we_do/Impact-cs-graphic-1x1-size.png",
    description:
      "We craft gold-standard websites, eCommerce, and mobile experiences that build brands and drive cross-channel business growth.",
    seoContext:
      "ImpactCX® is MOTIF®’s approach to digital brand experience, combining beauty and fashion web design agency expertise with human-first UI/UX strategy. Tailored for luxury lifestyle and skincare brands, it delivers full-stack eCommerce, creative direction, mobile experience design, and customer journey mapping—making it far more powerful than any design agency’s offer. Built for impact. Built to convert.",
    packagePoints: [
      "Creative Direction",
      "Experience Strategy",
      "Customer Journey Mapping",
      "Web Design & UX",
      "eCommerce",
      "Engineering",
      "Platform Implementation",
      "Full Stack Development",
      "Copy & Content",
      "Packaging Design",
    ],
  },
  {
    XName: "EngageMax®",
    title: "The Engagement Machine",
    img: "/assets/what_we_do/Engage-max-graphic-asset-1x1-size.png",
    description:
      "Integrated search, SEO, social, display, influencer, email, and CRO programs that drive awareness, traffic, and sales.",
    seoContext:
      "EngageMax® is a full-funnel performance program by MOTIF®, engineered to drive awareness and conversion across fashion, beauty, and luxury verticals. More than a fashion marketing agency or media buyer, MOTIF® integrates programmatic advertising, influencer marketing, CRO, CRM, and omnichannel ads into a single system—designed for brand engagement and revenue growth at scale.",
    packagePoints: [
      "Marketing Strategy",
      "Campaign Development",
      "Creative Assets Production",
      "Programmatic Ads",
      "Search Engine Marketing",
      "Social Media Ads",
      "Display & Video Advertising",
      "Print & Billboards",
      "Email, SMS & CRM",
      "Influencer Marketing",
    ],
  },
  {
    XName: "BrandX®",
    title: "The Brand Transformation",
    img: "/assets/what_we_do/uxd_motif_incubator_agency.PNG",
    description:
      "Evolving brands, modernizing visual identities, and creating communication strategies for the digital age.",
    seoContext:
      "BrandX® is MOTIF®’s proprietary brand transformation model for scaling fashion, beauty, and luxury lifestyle companies. Unlike agencies focused only on visuals, MOTIF® handles brand messaging, architecture, and positioning with surgical precision—bridging strategy with creative to build brands that last. This is not branding for the feed—it’s branding for the future.",
    packagePoints: [
      "Branding Strategy",
      "Brand Guideline",
      "Brand Positioning",
      "Brand Messaging",
      "Visual Identity",
      "Brand Architecture",
      "Brand Assets Production",
      "Brand Campaigns",
      "Creative & Art Direction",
    ],
  },
];

const XCards = () => {
  const refBox = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (refBox.current) {
        const cards = refBox.current.querySelectorAll(".article_card");

        const totalHeight = Array.from(cards).reduce(
          (acc: number, card: Element) => {
            return acc + (card as HTMLElement).clientHeight + 160;
          },
          0
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: refBox.current,
            start: "top top+=100",
            end: `+=${totalHeight}`,
            scrub: 0.5,
            pin: true,
            toggleActions: "restart none none reset",
          },
        });

        timeline
          .from(cards, {
            top: (index) =>
              `${
                cards[index]?.clientHeight * index + (index === 0 ? 0 : 360)
              }px`,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
          })
          .to(
            cards,
            {
              transform: (index) => {
                const minScale = 0.8;
                const maxScale = 1.0;
                const step = (maxScale - minScale) / (cards.length - 1);
                return `translateX(-50%) scaleX(${minScale + index * step})`;
              },
              duration: 1.2,
              delay: 0.3,
              stagger: 0.3,
              ease: "power3.out",
            },
            "<+0.4"
          );
      }
    },
    { scope: refBox }
  );

  return (
    <>
      {/* Mobile version */}
      <section
        aria-label="MOTIF’s strategic brand incubation services including growth strategy, experience design, full-funnel marketing, and brand transformation for fashion, lifestyle, and beauty brands"
        className="block md:hidden w-full flex flex-col gap-12 px-4 py-8"
      >
        <h2 className="sr-only">
          Strategic brand growth services tailored for fashion, beauty, and
          lifestyle brands
        </h2>

        <p className="sr-only">
          MOTIF® delivers four proprietary brand-building programs: ThrivePlan®
          for growth strategy, ImpactCX® for experience design, EngageMax® for
          full-funnel engagement marketing, and BrandX® for complete brand
          transformation. These services help direct-to-consumer and retail
          fashion, beauty, and luxury lifestyle brands scale beyond traditional
          agency limits. As an incubator and growth partner—not just another
          marketing agency—MOTIF® combines creative direction, digital strategy,
          omni-channel execution, and brand storytelling to drive long-term
          impact.
        </p>

        {data.map((item) => (
          <article
            className="w-full rounded-2xl"
            key={item.XName}
          >
            {/* SEO + AI optimized hidden content */}
            <p className="sr-only">{item.seoContext}</p>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-clash font-semibold [letter-spacing: 1.2px]">
                {item.XName}
              </h3>
              <p className="font-clash font-semibold text-lg sm:text-xl leading-[1.2]">
                {item.title}
              </p>
              <p className="font-helvetica font-normal text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>

              <ul className="space-y-2 mt-4">
                {item.packagePoints.map((el) => (
                  <li
                    className="flex items-center gap-2 text-sm sm:text-base font-medium"
                    key={el}
                  >
                    <FiMinus size={16} />
                    {el}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-center">
              <Image
                className="object-contain block max-w-full h-56 sm:h-64 rounded-lg"
                src={item.img}
                width={280}
                height={220}
                alt={item.title}
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 767px) 280px"
              />
            </div>
          </article>
        ))}
      </section>

      {/* Desktop version */}
      <section
        ref={refBox}
        aria-label="MOTIF’s strategic brand incubation services including growth strategy, experience design, full-funnel marketing, and brand transformation for fashion, lifestyle, and beauty brands"
        className="hidden md:block w-full h-[100vh] relative flex items-center justify-center md:w-[85%] lg:w-[100%] xl:w-[90%] mx-auto"
      >
        <h2 className="sr-only">
          Strategic brand growth services tailored for fashion, beauty, and
          lifestyle brands
        </h2>

        <p className="sr-only">
          MOTIF® delivers four proprietary brand-building programs: ThrivePlan®
          for growth strategy, ImpactCX® for experience design, EngageMax® for
          full-funnel engagement marketing, and BrandX® for complete brand
          transformation. These services help direct-to-consumer and retail
          fashion, beauty, and luxury lifestyle brands scale beyond traditional
          agency limits. As an incubator and growth partner—not just another
          marketing agency—MOTIF® combines creative direction, digital strategy,
          omni-channel execution, and brand storytelling to drive long-term
          impact.
        </p>

        {data.map((item, index) => (
          <article
            className={`bg-black/90 w-full grid grid-cols-1 md:grid-cols-2 gap-4 article_card backdrop-blur-[60px] backdrop-brightness-[50%] bg-[url("/assets/mask_bg/bg_mask.png")] p-11 rounded-2xl absolute left-[50%] translate-x-[-50%] z-10`}
            key={item.XName}
            style={{
              top: `${20 * index}px`,
              willChange: "transform, top, filter, opacity",
            }}
          >
            {/* SEO + AI optimized hidden content */}
            <p className="sr-only">{item.seoContext}</p>
            <div className="order-2 md:order-none max-w-[500px] text-white">
              <h3 className="text-white float_card_text_title_2xl float_card_text_title_lg float_card_text_title_sm  md:float_card_text_title_md font-clash font-semibold [letter-spacing: 1.2px] mt-2 ">
                {item.XName}
              </h3>
              <p className="mt-[10px] font-clash font-semibold text-section_subtitle_sm md:text-section_subtitle_md lg:text-section_subtitle_lg 2xl:text-section_subtitle_2xl leading-[1.2] text-typo-primary">
                {item.title}
              </p>
              <p className="text-white md:w-[22vw] float_card_text_desc_2xl float_card_text_desc_lg float_card_text_desc_sm  md:float_card_text_desc_md mt-4 font-helvetica  font-normal">
                {item.description}
              </p>
              <hr className="md:w-[22vw] lg:w-[18vw] border-b-1 border-mute mt-4 lg:mt-8 mb-12" />

              <ul>
                {item.packagePoints.map((el) => (
                  <li
                    className="flex items-center gap-1 float_card_text_desc_2xl float_card_text_desc_lg float_card_text_desc_sm  md:float_card_text_desc_md font-medium"
                    key={el}
                  >
                    <FiMinus size={20} />
                    {el}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-none relative mx-auto md:mr-0">
              <Image
                className="object-fill block ml-auto w-[180px] md:w-full lg:w-full lg:h-full"
                src={item.img}
                width={380}
                height={900}
                alt={item.title}
                quality={80}
                sizes="(max-width: 768px) 180px, 100vw"
              />
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default XCards;
