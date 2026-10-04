"use client";
import AccordianSection from "@/components/cards/AccordianSection";
import Brands from "@/components/cards/Brands";
import TwoColCard from "@/components/cards/TwoColCard";

import TitleImgBanner from "@/components/shared/TitleImgBanner";
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
  image: "/assets/dtc/DTCAgency.png",
  altText:
    "Fashion-forward models representing MOTIF®—a fashion branding, marketing, and design incubator, not a traditional agency.",
  displacementImage: "/assets/fashion_agency/Updated-Fashion-agency-hero.png",
  altTextDisplacement:
    "Fashion-forward models representing MOTIF®—a fashion branding, marketing, and design incubator, not a traditional agency.",
};

const partnerData = {
  title: "Partnerships",
  description:
    "Brand success isn't easy so we partnered up with best in classes to change the brand experience, connecting with people and culture.",
};

const serviceItems = [
  {
    imageSrc: "/assets/test/image/bg.png",
    title: "Direct To Consumer",
    description:
      "From migrations to Shopify, to full redesigns and ongoing optimization, we design, build, and optimize ecommerce websites on Shopify for brands selling direct-to-consumer (DTC) online.",
  },
  {
    imageSrc: "/assets/test/image/bg.png",
    title: "B2B & Wholesale",
    description:
      "We unlock business-to-business (B2B) commerce on Shopify, enabling brands to shape the right experience for every customer, including trade, wholesale, and more.",
  },
  {
    imageSrc: "/assets/test/image/bg.png",
    title: "Retail & Commerce",
    description:
      "We build seamless integrations for Shopify Point-of-Sale (POS), empowering brands to unify online and in-store sales, inventory, and customer data.",
  },
];

const mainBanner = {
  lines: [
    [
      "Build the",
      "Brand",
      "That",
      "Becomes",
      "feeling",
      {
        imageSrc: "/assets/fashion_agency/fashionBanner.png",
        altText:
          "Showing shot of a fashion marketing campaign photography by MOTIF which is better than a Fashion Branding & Marketing Agency",
      },
      
    ],
  ],
  description: [
    "Consumer behaviors shift, channels evolve, platforms become more complex. But what never changes is how people feel. MOTIF® builds brands with clarity, culture, and creative courage. Brands that outlast tactics, outperform trends, and outlove the competition. For those thinking beyond conversion."
  ],
};

const adSlider = [
  "HUMAN FIRST",
  "BE RELEVANT",
  "CULTURE BUILT",
  "SCALE WITH SOUL",
  "NO NOISE",
  "MEMORY SELLS",
  "CUT THE STATIC",
  "EXPERIENCE",
  "BRAND DEPTH",
  "GROW DIFFERENT",
  "CREATIVE CORE",
  "EXPERIENCE",
  "BE UNFORGETTABLE",
];

const faq_section = {
  description: [
    "We build brands people believe in. That grow with clarity. And stay remembered.",
  ],
  accordionList: [
    {
      title: "Strategy That Gets Loud",
      description: [
        {
          text: "The loudest brand isn’t always the one with the biggest budget. It’s the one that knows exactly who it is, what it stands for, and why people should give a damn. Most direct to consumer brands don’t have a strategy.\n"
        },
        {
          text: "They have a checklist. Launch plan. Ads. Offers. Email flows. And a hundred tactics duct-taped together.\n"
        },
        {
          text: "They launched with a bang. Cool logo. Decent sales. Instagram loved them. But by year two, it all went quiet. No traction. No retention. Ads weren’t hitting. And worst of all no one remembered the brand.\n"
        },
        {
          text: "That’s what happens when the Direct to consumer (DTC) strategy is built for launch, not for longevity. Strategy isn’t planning. It’s positioning. It’s not how fast you go, it's whether you’re headed in the right direction. And most brands are speeding straight into sameness.\n"
        },
        {
          text: "MOTIF® builds strategy like infrastructure. Which is hardwired into your margins, your market, your moments. Rooted in emotional relevance and informed by commerce. Shaped by clarity. Designed to scale loud not just for going live.\n"
        },
      ],
    },
    {
      title: "Identity That Cuts Through",
      description: [
       {
        text: "Most Direct to consumer businesses don’t have a brand. They have a product, a logo, and a color palette that looks good on a moodboard. Maybe a slogan that sounds smart in a deck. But when the ad stops or the sale ends, so does the memory.\n"
       },
       {
        text: "Because they never make a brand communication strategy and identity worth rallying. In a world of copycat SKUs and AI-generated marketing, brand is the only edge that can’t be stolen. It’s what makes you unforgettable. It’s how you outlive your last campaign and outlast the next competitor.\n"
       },
        {
          text: "Our proven method has helped DTC Lifestyle & Fashion and Luxury brands like yours build a narrative around their brand, increasing their visibility and recall.",
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
      title: "EX, Not UX",
      description: [
        {
          text: "Everyone says “optimize the journey.” But when did the journey get so… hollow? Most DTC sites are engineered to work. Fast page speeds. Clear CTAs. Easy clicks. But zero feeling, no memory and no meaning.\n"
        },
        {
          text: "That’s the difference between UX and EX. While UX is usable  EX is an emotional experience. The kind of experience that makes someone care. Your site isn’t just a storefront that’s a flagship.\n"
        },
        {
          text: "In a world of endless sameness, swipeable brands, templated stores, soulless interactions your site is either an experience… or a missed opportunity.\n"
        },
        {
          text: "At MOTIF®, we don’t only build for users, we build for humans. We don’t optimize pixels, we design for moments. We build immersive, sensorial, brand-safe experiences in digital spaces that create desire, not just drive conversion.\n"
        },
        {
          text: "Because what good is fast checkout if no one remembers the brand? We connect your strategy, design, and tech into one branded experience system. That’s not UX, that's what we call Emotional Experience (EX).\n"
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
      title: "Marketing That Moves People",
      description: [
        {
          text: "You did everything right according to the internet. Ran Meta ads, built flows with the retention agency layered in SMS. You tried it all. The ad agency that promised 5x ROAS. The email firm with “revenue-first flows.” The UGC studio that said fake customers make real impact. The metrics looked great until they didn’t. But somewhere along the line, your brand started sounding like everyone else’s. What you got wasn’t a brand. It was a vending machine: optimized, automated, forgettable.\n"
        },
        {
          text: "And that’s when the trouble started. This is what happens when marketing worships data and ignores desire. Because no dashboard full of data ever created obsession. That’s built with story, soul, and strategic commerce. And when people feel something they come back.\n"
        },
        {
          text: "At MOTIF®, we rebuild marketing where it should’ve started. And that starts in the emotion and with the story. Then we add the commerce. That means everything we do, from brand marketing, performance ads, content, creative, retention, SMS, to mobile apps, everything is rooted in human behavior, cultural relevance, and brand truth. We don’t chase short-term metrics. We build long-term memory. We don’t separate brands from performance because they were never separate to begin with.\n"
        },
        {
          list: [
                { text: "- Full-stack marketing strategy & execution" },
                { text: "- Paid media ecosystems across Meta, TikTok & Google"},
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
      title: "The Last Migration You’ll Need",
      description: [
        {
          text: "At some points DTC brands outgrow their current platforms at. But platform migration feels terrifying. One bad move suddenly your store crashes, SEO tanks, and customers get locked out. One wrong step? Years of brand trust? Just gone.\n"
        },
        {
          text: "Worse? Most agencies treat migration like a tech task. Drag and drop. Flip the DNS, move data from platform A to Platform B and hope for the best. They forget that platform migration for DTC  brands is a strategic move.\n"
        },
        {
          text: "At MOTIF®, migration isn’t a site swap. It’s a brand transplant. Whether you’re moving to Shopify, BigCommerce, or a headless build, we map everything with precision and empathy. The tech gets upgraded. The customer never notices a bump. That’s how it should be.\n"
        },
        {
          text: "From Magento to BigCommerce. Shopify to composable. Wherever you’re going, we make sure it’s the last time you’ll need to. Because you’re not just moving platforms you’re upgrading the entire future of the brand.\n"
        },
        {
          list: [
             { text: "- Technology & Platform Consultation" },
             { text: "- SEO First Migration" },
             { text: "- Data Mapping & Arrangement" },
             { text: "- Scalable Architecture" },
             { text: "- SEO First Migration" },
             { text: "- Tech Integration + Orchestrattion (eg: ERP, OMS, CRM)"},
             { text: "- Fail-proof launch process for zero downtime"},
          ]
        },
      ],
    },
    {
      title: "Optimization That Feels Human",
      description: [
        {
          text: "Most DTC brands chase conversion rate like it’s a finish line. They hire Conversion Rate Optimization (CRO) agencies that turn storytelling into button color tests, shrink the funnel, and celebrate 0.3% uplifts like they changed the world.\n"
        },
        {
          text: "Here’s the truth Fashion, beauty, and lifestyle don’t sell on urgency.Fashion, beauty, and lifestyle brands win when they move people, not just the needle.\n"
        },
        {
          text: "They sell on memory, on meaning, and on the feeling that this brand gets them.\n"
        },
        {
          text: "That’s why MOTIF® doesn’t do CRO. We do CXO: Customer Experience Optimization. Because it’s never just a site. It’s the entire system email, PDPs, packaging, follow-ups tuned to protect desire and deepen trust. CXO turns first-time buyers into loyalists, not just conversions. That’s how brands stop blending in and start scaling with sacrificing the brand experience.\n"
        },
        {
          list: [
             { text: "- Customer journey definition + conversion roadmap" },
             { text: "- Pre Purchase Channel Optimizations" },
             { text: "- Customer journey defination" },
             { text: "- Post Purchase Channel & Medium Optimizations" },
             { text: "- Personalization that feels thoughtful, not creepy"},
             { text: "- Story-driven A/B testing for emotional lift" },
             { text: "- Ongoing CX evolution to keep luxury magic intact"},
          ]
        },

      ],
    },
    {
      title: "Zero Click Optimization™ (AI)",
      description: [
        {
          text: "The future of commerce isn’t about louder ads or more pixels. It’s about being present where buying decisions begin before the click, before the scroll, in conversations shaped by intelligence.\n",
        },
        {
          text: "Customers don’t browse the way they used to. They ask. They expect answers that feel curated, effortless, and personal. Large Language Models like ChatGPT, Perplexity, and Google AI now shape those answers and if your brand isn’t optimized for these systems, you’re invisible.\n"
        },
        {
          text: "MOTIF® makes sure you’re in that conversation.\n Our Zero Click Optimization™ makes your brand discoverable and desirable in an AI-first world. We architect your presence for pre-purchase discovery, conversational commerce, and retention across every intelligent touchpoint that matters.\n",
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
      title: "Build > Grow > Scale (Repeat)",
      description: [
        {
          text: "You scaled fast. Then you stalled. Margins shrank, Ops cracked, Agencies pushed more ads and then Growth lost its meaning.\n"
        },

        {
          text: "Agencies love “growth” because it looks good in a Quick Book. Run bigger ads. Push more SKUs. Offer discounts. That’s not strategy, that's survival. And here’s the secret: they get paid whether you win or not. Retainers, billable hours, upsells it’s a game where the agency always profits, even when the brand bleeds.\n ",
        },
        {
          text: "MOTIF® doesn’t play that game. We’re not an agency. We don’t live on retainers or campaign fluff. We design brands to hold it. From strategy to systems, we build toward $400K/month with profit, team, and clarity in place. That’s our ceiling not because we can’t scale you further but because we won’t break what we’ve built. At that point, you’re a company, not just a brand. We step into a strategic role, help build your internal team, and if aligned, bring in REV(IX)  our co-investment model for the next chapter. Growth isn’t about doing more. It’s about building smarter.\n"
        },
        {
          text: "With our continuous hands-on analysis of every little market change, we work towards maximizing your ROI, helping you reach more audiences and converting them better.",
        },
      ],
    },
  ],
};

  



const DtcAgency = () => {
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
      {/* <SEOHead seo={dtcSEO} /> */}
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
          width={1000}
          height={1000}
          alt=""
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

export default DtcAgency;
