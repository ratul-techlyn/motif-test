"use client";
import AccordianSection from "@/components/cards/AccordianSection";
import TitleImgBanner from "@/components/shared/TitleImgBanner";
import Brands from "@/components/cards/Brands";
import TwoColCard from "@/components/cards/TwoColCard";
import MarqueeNavigation from "@/components/shared/marqueeNav/MarqueeNavigation";
import MarqueeInPage from "@/components/ui/MarqueeInPage";
import { useResponsiveSize } from "@/hooks/useResponsiveSize";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AppearanceCards from "./~com/AppearanceCards";
import HeroMobile from "./~com/HeroMobile";
import FullMediaWidthAnim from "@/components/lib_comp/FullMediaWidthAnim";

// ✅ Dynamically import SEOHead with SSR enabled
// const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });


gsap.registerPlugin(ScrollTrigger, SplitText);

const canvaImgs = {
  image: "/assets/luxuryLifestyle/Luxury_Lifestyle_Motif.png",
  altText:
    "Luxury fashion marketing campaign photography by MOTIF advertising agency, specializing in branding for lifestyle brands in NYC, LA, and SF.",
  displacementImage: "/assets/luxuryLifestyle/Luxury_Lifestyle_Motif.png",
};

const partnerData = {
  title: "Partnerships",
  description:
    "Brand success isn't easy so we partnered up with best in classes to change the brand experience, connecting with people and culture.",
};

const mainBanner = {
  lines: [
    [
      "Stop",
      "Positioning",
      "Luxury",
      " BRANDS",
      "Like",
      "Soap",
      {
        imageSrc: "/assets/luxuryLifestyle/luxury_lifestyle_brand_motif.jpg", altText: "brand image",
      },
    ],
  ],
  description: [
    "Luxury demands depth, design, and a compelling narrative, rather than the scalable approach of CPG. Motif® acts as an incubator, enabling luxury lifestyle brands to grow through culturally-driven strategies, emotionally resonant creative work, and performance based on genuine connection.",
  ],
};

const adSlider = [
  "CRAFT OVER COMMERCE",
  "NOT FAST. FOREVER.",
  "RULES REWRITTEN",
  "OBSESSION IS THE STRATEGY",
  "LUXURY DEMANDS MEANING",
  "POWER IN RESTRAINT",
  "MEMORY SELLS",
  "CUT THE STATIC",
  "SILENCE SPEAKS LOUDER",
  "BRAND DEPTH",
  "GROW DIFFERENT",
  "CREATIVE CORE",
  "GROWTH WITH GRAVITY",
  "BE UNFORGETTABLE",
];

const faq_section = {
  description: [
    "Growing & Scaling Luxury Lifestyle Brands that move culture not just sell product.",
  ],
  accordionList: [
    {
      title: "Strategy Built to Scale",
      description: [
        {
          text: "Growth without structure costs more than it creates.\n",
        },
        {
          text: "Most luxury brands scale reactively pumping ad budgets, adding SKUs, and entering new markets without a plan. The result? Brand dilution, wasted spend, and cultural irrelevance.\n",
        },
        {
          text: "Luxury demands precision. Strategy for Luxury Lifestyle brands should not be static, it should be dynamic in nature. So that the strategy aligns vision, operations, and influence to scale intelligently & without sacrificing.\n"
        },
        {
          text: "We conduct a comprehensive brand audit to identify loopholes and opportunities to establish your branding, proposition and positioning. This research helps us understand your requirements, get insights on what works, and plan your next steps better.\n",
        },
        {
          text: "Then we come up with actual strategies and plan out that combine cultural intelligence, commercial planning, and creative clarity. Every roadmap connects heritage to growth opportunities, protecting exclusivity while opening the right doors for expansion for your Luxury Lifestyle Brand.\n"
        },
        {
          text: "WHAT'S INSIDE\n",
        },
        {
          list: [
                { text: "- Brand Positioning Strategy" },
                { text: "- Cultural + market intelligence Analysis" },
                { text: "- Multi-channel Growth Strategy (digital + physical)" },
                { text: "- Market Expansion Strategy" },
              ]
        },
      ],
    },
    {
      title: "Branding That Commands Influence",
      description: [
        {
          text: "Most luxury founders think branding begins with logos and color palettes. That’s decoration, not definition. Real branding starts long before the visuals with strategy, communication, and cultural codes that shape perception and behavior.\n"
        },
        {
          text: "But the truth is a logo doesn’t build loyalty. A font or typeface won’t create influence. What does? Your brand positioning and the brand communication strategy. And that tells people what your brand stands for, why it matters, and how it behaves across every touchpoint. Without that, design ended up in decoration and marketing becomes noise.\n"
        },
        {
          text: "We take Brand Strategy & communication very seriously from the day one. And we work on that from the ground up. Motif is strategy first, messaging next, aesthetics last. The result? A brand that owns its category, speaks with clarity, and looks as powerful as it feels everywhere from flagships to feeds.\n"
        },
        {
          text: "Our proven method has helped Lifestyle Luxury brands like yours build a narrative around their brand, increasing their visibility and recall.",
        },
        {
          list: [
                { text: "- Positioning frameworks to define your place in culture" },
                { text: "- Messaging architecture for global consistency" },
                { text: "- Narrative systems that create emotional relevance" },
                { text: "- Identity design tied to strategic intent, not trends" },
                { text: "- Verbal + Visual Brand Identity"},


          ]

        },
      ],
    },
    {
      title: "Commerce as an Experience",
      description: [
        {
          text: "Luxury shouldn’t feel like a catalog. Yet most brand sites look identical: flat grids, sterile layouts, and copy that reads like a manual. No emotion, No intimacy, No reason to explore. That isn’t luxury that’s logistics.\n",
        },
        {
          text: "Luxury lives in immersion and emotions. Branded ecommerce experience should feel like walking through your flagship not scrolling through a spreadsheet. That means editorial storytelling, AR-powered try-ons, VR showrooms, cinematic interactions, and copy that feels like conversation, not conversion bait. Every detail should seduce the senses.\n"
        },
        {
          text: "And the future? Zero storefront. AI-driven commerce will move beyond pages and menus into predictive flows, conversational shopping, and voice-activated experiences. If your brand is still stuck in “add to cart” land, you’re already behind.\n"
        },
        {
          text: "MOTIF® builds experience for both today and tomorrow. Every build merges editorial storytelling with tech sophistication, creating platforms that preserve brand experience and evolve seamlessly into a zero-click future.\n"
        },
        {
                  list: [
                        { text: "- Brand-enhancing design exploration" },
                        { text: "- Customer Experience Optimization" },
                        { text: "- Human-first copy that builds desire" },
                        { text: "- Customer Experience Journey Mapping" },
                        { text: "- AI-ready architecture for zero-click commerce" },
                        { text: "- Creative & Art Direction for Omnichannel Experiences"},
                  ]
                },
      ],
    },
    {
      title: "Marketing To Create Desires",
      description: [
        {
          text: "Most luxury brands reduce marketing to performance dashboards. CTR, CPM, ROAS and a bunch of other vanity metrics. When the conversation becomes numbers-first, the brand voice disappears, and brand prestige gets traded for performance.\n",
        },
        {
          text: "Quick wins. Endless A/B tests. Obsession with ROAS. It’s the playbook that turns luxury brands into promo machines. The result? Shallow ads, cheap tricks, and customers trained to wait for discounts. Promotion first marketing kill luxury brands and made it like a CPG Brand like soap!\n",
        },
        {
          text: "Luxury isn’t built on hacks. It’s built on heritage. Marketing should shape culture, create desires and not chase clicks. When campaigns sound like everyone else’s, desire disappears.\n"
        },
        {
          text: "MOTIF® flips the script. From high-touch experiential campaigns to strategic media buying, every move positions your brand as a cultural reference not a discount code. Digital, print, and physical activations work in harmony to drive growth without diluting identity.\n"
        },
        {
          list: [
                { text: "- Marketing Strategy & Implementation" },
                { text: "- Story-driven content that sparks desire"},
                { text: "- Integrated strategy across digital + physical channels"},
                { text: "- Retention Marketing (Mobile app + SMS + Email)" },
                { text: "- Revenue forecasting by channel" },
                { text: "- Social media Ad Management" },
                { text: "- Paid Search Management"}, 
                { text: "- Experiential activations that turn campaigns into conversations"},
              ]
        },
      ],
    },
    {
      title: "Migration Without the Mess",
      description: [
        {
          text: "A poorly executed migration doesn’t just lose traffic it kills trust. One glitch, one broken flow, and years of prestige disappear overnight. For high-value customers, a single friction point feels like carelessness. That’s a risk luxury brands can’t take.\n",
        },
        {
          text: "Most agencies treat migration like a technical task: move data, flip the switch, hope for the best. But in luxury, migration is choreography. Every detail from design, UX, SEO, to tech integrations must remain seamless while opening the door for what’s next.\n",
        },
        {
          text: "MOTIF® handles migration as the strategist, not like mechanics. From platform consulting to compliance, every step is engineered to preserve your equity, protect performance, and future-proof your commerce ecosystem. This isn’t just about switching platforms, it's about elevating the entire brand experience without a single compromise.\n"
        },
        {
          list: [
             { text: "- Technology & Platform Consultation" },
             { text: "- SEO First Migration" },
             { text: "- Data Mapping & Arrangement" },
             { text: "- Scalable Architecture" },
             { text: "- SEO First Migration" },
             { text: "- Tech Integration + Orchestrattion (eg: ERP, OMS, CRM)"},
          ]
        },
      ],
    },
    {
      title: "Optimization That Feels Human",
      description: [
        {
          text: "Growth hackers & CRO experts are not for Luxury Lifestyle Brands, and if they are working on any actually they are going to kill that brand eventually.\n",
        },
        {
          text: "They promise quick wins. They deliver broken brands. Pop-ups everywhere. Countdown clocks screaming “Hurry!” Discount wheels spinning like a carnival game. That’s not optimization it’s brand vandalism.\n"
        },
        {
          text: "Luxury isn’t built on hacks. It’s built on harmony. Every touchpoint before purchase, during checkout, after delivery should feel like part of the same experience. Not a funnel. A feeling. That’s why we don’t do CRO. Instead we take the CXO route to optimize actual customer experience on site + off site!\n",
        },
        {
          text: "CXO means optimizing the entire customer experience and experiences. Not just a site. The emails. The unboxing moment. The mobile app. The follow-up that feels like a conversation, not automation. Every detail signals status, builds trust, and keeps desire alive.\n"
        },

        {
          list: [
             { text: "- Customer Experience Strategy" },
             { text: "- Customer journey defination" },
             { text: "- User & Heatmap Testing" },
             { text: "- Story-driven A/B testing for emotional lift" },
             { text: "- Physical touchpoint refinements: packaging, inserts, retail rituals" },
             { text: "- Ongoing CX evolution to keep luxury magic intact"},
          ]
        },

      ],
    },
    {
      title: "Zero Click Optimization™ (AI)",
      description: [
        {
          text: "Consumers don’t scroll anymore. They ask. They expect curated answers, instant transactions, and effortless personalization. This is the zero-click era where discovery, consideration, and purchase happen inside conversations.\n",
        },
        {
          text: "MOTIF® makes sure you’re in that conversation.\n Our Zero Click Optimization™ framework places your brand inside AI-driven answers, builds conversational commerce flows for frictionless transactions, and creates retention loops that feel intuitive, not automated.\n",
        },
        {
          text: "What we will do:"
        },
        {
          list: [
             { text: "- Answer Engine Optimization (AEO) (ChatGPT, Perplexity, Google AI)" },
             { text: "- Conversational Commerce: Enable purchases inside intelligent interfaces—before the click" },
             { text: "- Personalization That Feels Bespoke: Predictive recommendations for curated luxury shopping" },
             { text: "- Retention That Anticipates Desire: AI-powered loyalty experiences that feel human" },
          ]
        },
      ],
    },
    {
      title: "Scaling Without Dillution",
      description: [
        {
          text: "There is a swift difference between “Growth” and “Strategy”. Growth is easy. Scaling while being profitable is harder.\n",
        },
        {
          text: "Agencies love “growth” because it looks good in a Quick Book. Run bigger ads. Push more SKUs. Offer discounts. That’s not strategy, that's survival. And here’s the secret: they get paid whether you win or not. Retainers, billable hours, upsells it’s a game where the agency always profits, even when the brand bleeds.\n",
        },
        {
          text: "MOTIF® doesn’t play that game. We’re not an agency. We don’t live on retainers or campaign fluff. We scale brands as partners aligned on performance, invested in outcomes. We win when you win. No smoke. No mirrors. But with a partnership that creates lasting value.\n"
        },
        {
          text: "With our continuous hands-on analysis of every little market change, we work towards maximizing your ROI, helping you reach more audiences and converting them better.",
        },
      ],
    },
  ],
};




const Luxury = () => {
  const iconSize = useResponsiveSize();
  const refTextbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (refTextbox.current) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: refTextbox.current,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reset",
          },
        });

        const textSplit = new SplitText(refTextbox.current, {
          type: "chars",
        });

        timeline
          .from(
            textSplit.chars,
            {
              opacity: 0.2,
              ease: "power3.out",
              duration: 0.7,
              stagger: 0.1,
            },
            0
          )
          .to(
            textSplit.chars,
            {
              opacity: 1,
              ease: "power3.out",
              duration: 0.7,
              stagger: 0.1,
            },
            0
          )
          .to(
            textSplit.chars,
            {
              opacity: 0.2,
              ease: "power3.out",
              duration: 0.7,
              stagger: 0.1,
            },
            1
          );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* <SEOHead seo={luxuryLifestyleSEO} /> */}
      <section className="hidden sm:block layout_normal pt-28 pb-20 lg:pt-40 lg:px-0 w-[90%] md:w-[90%] lg:w-[70%]">
        <TitleImgBanner
          lines={mainBanner.lines}
          description={mainBanner.description}
        />
      </section>

      <HeroMobile />

      <section className="w-full">
      <FullMediaWidthAnim startWidth="85%">
        <Image
          className="image-distortion w-full"
          src={canvaImgs.image}
          width={1080}
          height={570}
          alt={canvaImgs.altText}
          priority
          quality={80}
          sizes="100vw"
        />
      </FullMediaWidthAnim>
      </section>

      <section className="layout_normal my-[10%]  w-[90%] md:w-[90%] lg:w-[70%]">
        <AccordianSection
          description={faq_section.description}
          title="WHAT & WHY"
          accordionList={faq_section.accordionList}
        />
      </section>

      <AppearanceCards />

      <section className="py-10">
        <MarqueeInPage
          text={adSlider}
          speed={1.5}
          iconClass="text-[#ED5F09]"
          iconSize={"5vw"}
          direction={1}
        />
        <MarqueeInPage
          text={adSlider}
          speed={1.5}
          iconClass="text-[#ED5F09]"
          iconSize={"5vw"}
          direction={-1}
        />
      </section>


      <section className="layout_normal my-36 w-[90%] md:w-[90%] lg:w-[70%]">
        <TwoColCard
          description={partnerData.description}
          title={partnerData.title}
        />
      </section>
      <Brands />

      <MarqueeNavigation
        text={["WHAT WE DO"]}
        href="/what-we-do"
        speed={2.5}
        iconClass="text-[#ED5F09]"
        iconSize={iconSize}
      />
    </div>
  );
};

export default Luxury;
