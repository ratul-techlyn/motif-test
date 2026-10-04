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
  image: "/assets/pulseb2b/shopifyb2b/Shopify-B2B-Agency.png",
  altText:
    "MOTIF Pulse B2B Shopify Agency - Specialized B2B commerce solutions for Shopify Plus brands, wholesale infrastructure, enterprise-level B2B platforms, and scalable ecommerce development.",
  displacementImage: "/assets/pulseb2b/shopifyb2b/Shopify-B2B-Agency.png",
  altTextDisplacement:
    "Pulse B2B Shopify Agency by MOTIF - Building scalable B2B commerce infrastructure for Shopify Plus brands addicted to volume and growth.",
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
      "Pulseb2b",
      "For ", "Shopify ",
      "Brands ",
      "Addicted ", "to",
      "Volume",
      {
        imageSrc: "/assets/pulseb2b/pulse_b2b.webp",
        position: "center",
        altText:
          "Showing shot of a fashion marketing campaign photography by MOTIF which is better than a Fashion Branding & Marketing Agency",
      },
      
    ],
  ],
  description: [
    "PulseB2B helps brands unlock the full power of Shopify B2B with infrastructure, workflows, and ops systems built to scale. Not a DTC team moonlighting as B2B. It’s a dedicated team of real B2B specialists built for scale, not surface."
  ],
};

const adSlider = [
  "Ops-Led Thinking",
  "Experience That Moves",
  "Buyers First. Always.",
  "Connected, Not Patched",
  "Click. Sync. Sell.",
  "Built to Scale",
  "CUT THE STATIC",
  "High Volume, Low Drama",
  "Beyond Edition Limits",
  "GROW DIFFERENT",
  "One Size Breaks",
  "Beyond the Box",
];

const faq_section = {
  description: [
    "This isn’t B2B on training wheels. PulseB2B builds the kind of backend your B2B arm always needed clean, fast, and ready to scale with Shopify Plus",
  ],
  accordionList: [
    {
      title: "Strategy Meets Infrastructure",
      description: [
        {
          text: "Everyone talks about B2B growth. Nobody talks about the infrastructure it needs to hold. Most Shopify agency teams build B2B by copying their DTC flow.Then pricing breaks. Quotes jam. And ops becomes the middleman. It’s not a strategy problem it’s an infrastructure gap.\n"
        },
        {
          text: "PulseB2B rebuilds from the core combining platform logic and your operational flow into one solid system.\n"
        },
        {
          text: "Everything we do is based on how your team quotes, fulfills, and recovers from things breaking, not how the UI looks on a pitch deck. It’s a system blueprint that sales won’t avoid and ops won’t curse. PulseB2B is a true B2B eCommerce agency  built for real ops\n"
        },
        {
          list: [
                { text: "- How quotes are created, approved, and changed" },
                { text: "- What pricing rules exist (and where they break)" },
                { text: "- What buyers can see and do based on account roles" },
                { text: "- How orders pass to ERP, WMS, or your finance system" },
                { text: "- What tools make sense: native B2B, custom stack, or API-led setup — across Shopify, Commerce Components, and BigCommerce"},
          ]
        },
      ],
    },
    {
      title: "Architecture That Holds",
      description: [
      {
        text: "Shopify B2B gives you the foundation but foundations aren’t finished systems. Most brands hit a wall the moment pricing, permissions, fulfillment logic, and buyer accounts start to scale. Quoting workflows stall. Inventory mismatches. Ops gets buried. It’s not the platform’s fault, it’s the missing architecture between what’s possible and what works\n."
      },
       {
        text: "PulseB2B builds that middle layer: custom logic, smarter structures, and resilient backend systems that keep B2B from breaking when wholesale demand spikes.\n"
       },
       {
        text: "We map the chaos, fix the logic, define the edge cases, and build for the ugly stuff the $300K PO with 40 SKUs, net-45 terms, and custom shipping. We make sure your system works when it matters, not just when the client is watching. Whether you're on Shopify B2B, BigCommerce, or building with Commerce Components, we design infrastructure that holds.\n"
       },
        {
          list: [
                { text: "- Role-based permission mapping for buyers, reps, and internal teams" },
                { text: "- Catalog segmentation based on accounts, contracts, or tagsy" },
                { text: "- Draft order support with editable pricing, partial approvals" },
                { text: "- Shopify B2B specific architecture planning" },     
          ]

        },
      ],
    },
    {
      title: "Experience Built Right",
      description: [
        {
          text: "Most B2B stores feel like internal tools clunky, slow, and designed for admin, not the buyer. When buyers struggle to find SKUs, reorder fast, or view relevant pricing your brand loses more than just the sale. It loses trust. And your ops team ends up fixing what your frontend should’ve handled.\n"
        },
        {
          text: "When that happens, your tech stops being useful and becomes a blocker.\n"
        },
        {
          text: "PulseB2B designs the B2B experience to feel intentional on Shopify Plus with intuitive interfaces, clean flows, and buyer journeys built for long-term wholesale relationships.\n"
        },
        {
          list: [
                { text: "- Custom UX/UI flows built for B2B logic" },
                { text: "- Personalized storefronts by buyer type"},
                { text: "- Quick order forms + saved carts"},
                { text: "- Easy reorder and invoice access"},
                { text: "- Product visibility by customer group"},
                { text: "- Experience separated from DTC "},
              ]
        },
      ],
    },
    {
      title: "Ops Without Friction",
      description: [
        {
          text: "No B2B system should depend on three ops people remembering to do five things manually. But that’s how most are set up. And B2B operations shouldn’t need a 20-tab spreadsheet to function.\n"
        },

        {
          text: "PulseB2B digs into the real workflows the messy, high-friction ones and builds systems that handle them without burning your team out. Not theoretical flows. Not ideal cases. Just automation that matches how your team already works, and makes it 10x faster. We implement platform-native logic (like Shopify Functions) and build custom triggers where the platform falls short.\n"
        },

        {
          list: [
                { text: "- Rule-based automation for approvals, quotes, and terms" },
                { text: "- Conditional routing by warehouse, inventory, or account size"},
                { text: "- Ops flows built inside Shopify B2B not outside of it"},
                { text: "- Workflow triggers that go to the right people, not everyone"},
                { text: "- Fallback logic that doesn’t break when something weird happens"},
              ]
        },
      ],
    },
    {
      title: "Integrations That Talk to Your Stack",
      description: [
        {
          text: "B2B success isn’t just about how your store looks. It’s about how every part of your system talks to each other eg: ERP, CRM, 3PL, accounting, tax, and shipping. When inventory, orders, CRM, and accounting don’t talk your ops team becomes the human middleware. And that’s not scalable. Most Shopify B2B agencies skip this part. So your ops team ends up copy-pasting data between disconnected tools.\n"
        },
        {
          text: "PulseB2B builds tight, logical integrations that automate the backend chaos and let you run wholesale at scale without breaking a sweat. Also we integrate Shopify B2B directly into your backend systems so the entire operation flows without bottlenecks.\n"
        },
      ],
    },
    {
      title: "Scale Without Burnout",
      description: [
       {
        text: "Wholesale brands don’t grow linearly. They spike. And most systems aren’t ready for it so your team scrambles and customers feel the cracks. \n"
       },
        {
          text: "That’s the dark side of scaling B2B, most systems aren’t built for it. They’re stitched together just enough to get going but they break once the real numbers hit. You didn’t plan to grow into dysfunction. But that’s what happens when the backend never got built to scale.\n"
        },
        {
          text: "PulseB2B designs your wholesale infrastructure with scale in mind. We look beyond today’s order volume and build systems that hold at $100K, $250K, $500K/month without needing a full-time firefighter on your team.\n"
        },
      ],
    },
    {
      title: "Go Beyond Native Shopify",
      description: [
        {
          text: "Shopify B2B is powerful but not perfect. When native tools hit their limit, most agencies shrug. Native features only go so far. But your wholesale model isn’t cookie-cutter. Neither is your logic. The best B2B experiences aren’t built from set templates. They’re built from the realities of how your team works and how your buyers buy.\n"
        },
        {
          text: "PulseB2B builds systems around your actual operations, not the other way around. We design and develop custom infrastructure on top of Shopify B2B and Commerce Components tuned to how you sell, fulfill, and scale.\n"
        },
         {
          list: [
                { text: "- Quote workflows with auto-logic, approvals, and rep-level edits" },
                { text: "- Role-based buyer accounts with visibility controls"},
                { text: "- Custom pricing, inventory views, and terms per buyer or region"},
                { text: "- Personalized storefronts with reorder flows and cross-sells"},
                { text: "- True multi-currency, tax, and PO format support"},
                { text: "- Clean, reliable integrations across ERP, OMS, CRM, and finance"},
              ]
        },
      ],
      
    },
  ],
};

  


const ShopifyB2bAgency = () => {
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
      {/* <SEOHead seo={shopifyB2BSEO} /> */}
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
          src="/assets/pulseb2b/shopifyb2b/Shopify-B2B-Agency.png"
          width={1000}
          height={1000}
          alt={canvaImgs.altText}
          priority={true}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 70vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
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

export default ShopifyB2bAgency;
