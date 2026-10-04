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
  image: "/assets/fashion_agency/Updated-Fashion-agency-hero.png",
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
      "MOTIF®",
      "For",
      "Fashion",
      " BRANDS",
      "That",
      "Break",
      "Patterns",
      {
        imageSrc: "/assets/fashion_agency/fashionBanner.png",
        altText:
          "Showing shot of a fashion marketing campaign photography by MOTIF which is better than a Fashion Branding & Marketing Agency",
      },
    ],
  ],
  description: [
    "Forget typical fashion brand marketing agencies. Motif® works as an incubator designed to grow fashion brands through culture-led strategy, emotionally intelligent creative, and performance rooted in real connection.It’s about building cultural presence, emotional relevance, and systems designed to last.",
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
    "Scaling fashion brands with creativity & grit not empty agency promises.",
  ],
  accordionList: [
    {
      title: "Strategy That Changes Everything",
      description: [
        {
          text: "Brands break when the foundation is missing. Most fashion businesses scale like they’re sprinting a marathon fast, messy, and without structure. Strategy isn’t a deck collecting dust. It’s the blueprint for every dollar, design, and decision.\n",
        },
        {
          text: "Fashion moves fast. Without a strategy that connects vision, product, and market signals. And fashion brands collapse under trend fatigue and ad spend waste.\n",
        },
        {
          text: "An airtight brand & eCommerce strategy is crucial to set your luxury fashion brand up for success. Our eCommerce experts work with you to understand your niche industry. From your target market & competitors, to what your brand’s mission is.\n"
        },
        {
          text: "We conduct a comprehensive brand audit to identify loopholes and opportunities to establish your branding, proposition and positioning. This research helps us understand your requirements, get insights on what works, and plan your next steps better.\n",
        },
        {
          text: "WHAT'S INSIDE\n",
        },
        {
          list: [
                { text: "- Deep-dive brand and cultural audit" },
                { text: "- Market intelligence for positioning clarity"},
                { text: "- Cultural + market intelligence Analysis" },
                { text: "- Marketing architecture for sustainable growth" },
                { text: "- Market Expansion Strategy" },
                { text: "- Roadmaps that feel less like theory, more like momentum"},
              ]
        },
      ],
    },
    {
      title: "Branding That Creates Cultural Impact",
      description: [
        {
          text: "A truly impactful brand goes beyond aesthetics, resonating with people on visual, verbal, and emotional levels. It actively shapes culture, rather than merely boosting click-through rates.\n"
        },
        {
          text: "Fashion is crowded. Identity without cultural depth becomes noise. Branding must tell a story worth repeating, shareable in whispers and in wardrobes.\n"
        },
        {
          text: "To deliver a unique and instantly recognizable customer experience, your brand needs a clear identity and strategic positioning. We collaborate with you to figure out who you are as a brand and how you need to present yourself to create a lasting impact. Our proven methodology has helped luxury brands like yours to build compelling narratives, enhance visibility, and improve brand recall.\n"
        },
        {
          text: "Our proven method has helped Lifestyle & Fashion Luxury brands like yours build a narrative around their brand, increasing their visibility and recall.",
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
          text: "Forget the “online store” mindset. A fashion storefront should feel like a flagship which is fluid, editorial, emotional. If the design doesn’t evoke a mood, it’s leaving money on the table.\n",
        },
        {
          text: "People don’t shop products. People either shop emotions or connections. If your eCommerce experience feels like a catalog, it’s invisible. A site should seduce before it sells.\n"
        },
        {
          text: "As soon as your branding is in place, your store design becomes our first priority and is the first touchpoint for any new store visitor. We ensure that your brand’s design and development is unique and responsive, helping you deliver a memorable shopping experience.\n"
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
      title: "Marketing That Shapes Belief",
      description: [
        {
          text: "Great fashion brands aren't just about making sales, they're about sending a message. Forget about vanity metrics like CPM or CPA, what really matters is building belief. Because belief beats discount codes every time. Great marketing doesn’t chase trends it creates them.\n",
        },
        {
          text: "Quick wins. Endless A/B tests. Obsession with ROAS. It’s the playbook that turns luxury lifestyle and fashion brands into promo machines. The result? Shallow ads, cheap tricks, and customers trained to wait for discounts. Click-driven campaigns die fast. Brands built on meaning become timeless. Marketing should feel like storytelling, not stalking.\n",
        },
        {
          text: "MOTIF® flips the script. From high-touch experiential campaigns to strategic media buying, every move positions your brand as a cultural reference not a discount code. Digital, print, and physical activations work in harmony to drive growth without diluting identity.\n"
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
      title: "Migration Without the Mess",
      description: [
        {
          text: "Platform migration shouldn’t feel like open-heart surgery. Done wrong, it kills SEO, crashes operations, and scars customer trust. Growth needs better tech but the leap should feel seamless.\n",
        },
        {
          text: "Fashion thrives on consistency. A botched migration can erase years of trust overnight. This isn’t about flipping a switch; it’s about orchestrating a flawless handover.\n"
        },
        {
          text: "Most agencies treat migration like a technical task: move data, flip the switch, hope for the best. But in luxury, migration is choreography. Every detail from design, UX, SEO, to tech integrations must remain seamless while opening the door for what’s next.\n",
        },
        {
          text: "MOTIF® handles migration as the strategist, not like mechanics. If you outgrow your current eCommerce platform, we're here to help you choose a better alternative and do your site migration for you. During migration, we ensure that your data is in one place and ensure that you have all the resources you need to get started on the new platform.\n"
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
          text: "Forget CRO! For the sake of CRO agencies optimize things for robots who have no soul! Most of the time it breaks the brand experience & totally removes the essence of the brand. Buttons don't convert, feelings do. Customer Experience Optimization shouldn't be a cold A/B test, it's about refining a conversation, building trust, and designing intent. More importantly optimize the experience for the end users.\n",
        },
        {
          text: "Fashion is emotional. Optimization that ignores emotion kills the sale. When data rules unchecked, you get sterile design and static growth.Listen, when it comes to fashion, it's all about feelings. If you ignore that when you're trying to optimize things, your sales are going to take a hit. And honestly, just letting data run wild can lead to super boring designs and your business just won't grow. You'll basically kill the emotional connection that makes fashion, well, no fashion just another label.\n"
        },
        {
          text: "That’s why we reject the typical CRO approach. Instead, we optimize the entire customer experience across all channels, from pre-purchase website interactions to post-purchase emails, mobile apps, and even packaging. We help you identify revenue opportunities, explore new channels, and improve underperforming ones. Our human-first, data-assisted strategy maximizes conversions while maintaining a lean spend.\n",
        },
        {
          text: "CXO means optimizing the entire customer experience and experiences. Not just a site. The emails. The unboxing moment. The mobile app. The follow-up that feels like a conversation, not automation. Every detail signals status, builds trust, and keeps desire alive.\n"
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
      title: "Scaling > Reinventing > Enduring",
      description: [
        {
          text: "Scaling is a chapter, not the whole book. Fashion’s graveyard is full of brands that grew, then froze. Reinvention is survival. Endurance is art.\n",
        },
        {
          text: "Agencies love “growth” because it looks good in a Quick Book. Run bigger ads. Push more SKUs. Offer discounts. That’s not strategy, that's survival. And here’s the secret: they get paid whether you win or not. Retainers, billable hours, upsells it’s a game where the agency always profits, even when the brand bleeds.\n ",
        },
        {
          text: "MOTIF® doesn’t play that game. We’re not an agency. We don’t live on retainers or campaign fluff. We scale brands as partners aligned on performance, invested in outcomes. We win when you win. No smoke. No mirrors. But with a partnership that creates lasting value.\n What worked last season won’t work next. Culture shifts fast. Brands that outlast trends adapt without losing their identity."
        },
        {
          text: "With our continuous hands-on analysis of every little market change, we work towards maximizing your ROI, helping you reach more audiences and converting them better.",
        },
      ],
    },
  ],
};

  



const FashionAgency = () => {
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
      {/* <SEOHead seo={fashionSEO} /> */}
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

export default FashionAgency;
