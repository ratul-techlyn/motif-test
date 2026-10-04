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
  image: "/assets/pulseb2b/bigcommerceb2b/PluseB2B-Agency-By-motif.png",
  altText:
    "MOTIF Pulse B2B BigCommerce Agency - Specialized B2B commerce solutions for BigCommerce brands, wholesale infrastructure, enterprise-level B2B platforms, and scalable ecommerce development.",
  displacementImage: "/assets/pulseb2b/bigcommerceb2b/PluseB2B-Agency-By-motif.png",
  altTextDisplacement:
    "Pulse B2B BigCommerce Agency by MOTIF - Building scalable B2B commerce infrastructure for brands addicted to volume and growth.",
};

const partnerData = {
  title: "Partnerships",
  description:
    "Brand success isn't easy so we partnered up with best in classes to change the brand experience, connecting with people and culture.",
};



const mainBanner = {
  lines: [
    [
      "The BigCommerce ",
      "B2B", {
        imageSrc: "/assets/pulseb2b/pulse_b2b.webp",
        position: "center",
        altText:
          "Showing shot of a fashion marketing campaign photography by MOTIF which is better than a Fashion Branding & Marketing Agency",
      },
      "Agency ", 
      "You Wished", 
      "Existed",
     
      
    ],
  ],
  description: [
    "BigCommerce has the backbone to support serious B2B. But building the systems, workflows, and integrations that actually scale? That takes more than platform knowledge. PulseB2B is a team of real B2B specialists not that typical DTC agency moonlighting in wholesale. We build powerful, logic-led infrastructure on BigCommerce to help you grow without cracking your ops."
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
    "PulseB2B builds the kind of backend your wholesale arm always needed clean, fast, & ready to scale with BigCommerce B2B Edition",
  ],
  accordionList: [
    {
      title: "Strategy That Reflects Operations",
      description: [
        {
          text: "Most BigCommerce agencies start with the wrong blueprint: DTC thinking.They build for shoppers, not buyers. Focus on storefronts, not systems. And when wholesale breaks? They throw on a bandaid portal. Wholesale isn’t just a sales channel. It’s a different business model. One that breaks when you try to retrofit DTC logic into it.\n"
        },
        {
          text: "PulseB2B starts by mapping how your team really works, not how a platform demo says it should. We sit with sales, ops, and fulfillment. We trace every step from quote to order to ERP. And we design a backend that matches the real flow.\n"
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
                { text: "- What tools make sense: native B2B, custom stack, or API-led setup with BigCommerce"},
          ]
        },
      ],
    },
    {
      title: "Architecture That Doesn’t Break",
      description: [
       {
        text: "You spent six figures on a B2B build. The system looks fine until it’s actually used. Buyers can’t see what they’re supposed to. Sales reps can’t assist accounts without breaking something. Draft orders don’t support pricing tweaks, so quotes happen in Gmail. Inventory syncs late, so ops ships the wrong SKU. There’s no safety net, one mistake, and the whole process gets rerouted through Slack. Eventually, your team stops using the system altogether. Not because they’re lazy but because it’s faster to go around it than through it.\n"
       },
       {
        text: "PulseB2B solves this by building infrastructure that holds at volume, under pressure, and during chaos. We stress-test them before you need them. We don’t just work around platform features. We build the foundation your team can rely on, even when things go wrong.\n"
       },
       {
        text: "We map the chaos, fix the logic, define the edge cases, and build for the ugly stuff the $300K PO with 40 SKUs, net-45 terms, and custom shipping. We make sure your system works when it matters, not just when the client is watching. Whether you're on BigCommerce B2B edition we design infrastructure that holds.\n"
       },
        {
          list: [
                { text: "- Role-based permission mapping for buyers, reps, and internal teams" },
                { text: "- Catalog segmentation based on accounts, contracts, or tagsy" },
                { text: "- Draft order support with editable pricing, partial approvals, and fallback logic" },
                { text: "- Platform-specific architecture planning" },     
          ]

        },
      ],
    },
    {
      title: "Experience That Works for Buyers",
      description: [
        {
          text: "Most B2B experiences feel like a downgrade. Buyers log in to clunky portals that look five years old. Products are hard to search. Pricing looks off. Reordering is a hassle. And the moment something breaks, they email your sales team because that’s faster than fighting the UI. And then you wonder ‘We Built the entire B2B Portal, why are our buyers still emailing for Quotes?’\n"
        },
        {
          text: "When that happens, your tech stops being useful and becomes a blocker.\n"
        },
        {
          text: "PulseB2B fixes that by designing B2B experiences that make sense to the people actually using them. Everything is built around their habits, not just your features. PulseB2B helps brands design experiences that feel custom not just 'good enough for B2B' on BigCommerce, and beyond.\n"
        },
      ],
    },
    {
      title: "Automation That Unclogs Ops",
      description: [
        {
          text: "You’ve got a B2B system but somehow your ops team is still copy-pasting orders, triple-checking prices, chasing sales for approvals, and fixing errors after they ship. Half the work happens outside the platform. The automation only covers the easy stuff. Everything else? People patch it with emails and workarounds. That’s not sustainable. And it sure as hell isn’t automation.\n"
        },
        {
          text: "PulseB2B digs into the real workflows the messy, high-friction ones and builds systems that handle them without burning your team out. Not theoretical flows. Not ideal cases. Just automation that matches how your team already works, and makes it 10x faster. We implement platform-native logic (like BigCommerce workflows) and build custom triggers where the platform falls short.\n"
        },

        {
          list: [
                { text: "- Quote and price approvals that run automatically, not over email" },
                { text: "- Conditional routing by warehouse, inventory, or account size"},
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
          text: "Most B2B builds fall apart at the integrations.The frontend looks great but nothing’s talking properly. Inventory updates late. POs get stuck. Credit terms live in someone’s inbox. Sales can’t see what shipped. Ops can’t see what’s approved. Finance runs their own spreadsheet to keep track of what’s real.\n"
        },
        {
          text: "That’s what happens when your tools don’t talk to each other. Most B2B setups throw in some quick plug-ins or Zapier hacks and call it integrated. But once you hit real volume, things break. Quietly.\n"
        },
        {
          text: "PulseB2B builds real integrations that hold. We connect your systems the right way  so orders move, data flows, and your team stops chasing updates. Whether you're running on BigCommerce B2B Edition we make the systems talk properly.\n"
        },
      ],
    },
    {
      title: "Scale Without Burnout",
      description: [
        {
          text: "You’re growing but behind the scenes, everything feels like it’s about to snap. Sales volume is up. Wholesale accounts are rolling in. But ops is drowning. The tech stack is stretched thin. Quotes take too long. Approvals bottleneck. And every “big month” feels like a fire drill.\n"
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
      title: "Go Big, Go Beyond BigCommerce",
      description: [
        {
          text: "Most platforms make you work around their limitations. They offer the basics a buyer portal, some pricing controls, and a few workflows that almost work. But once you start dealing with real volume, real rules, and real teams things break. The tech doesn’t match your business. And your agency doesn’t know how to fix it.\n"
        },
        {
          text: "PulseB2B builds systems around your actual operations, not the other way around. We design and develop custom infrastructure on top of BigCommerce Catalyst tuned to how you sell, fulfill, and scale.\n"
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

  



const BigCommerceB2bAgency = () => {
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
      {/* <SEOHead seo={bigcommerceB2BSEO} /> */}
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
          src="/assets/pulseb2b/bigcommerceb2b/PluseB2B-Agency-By-motif.png"
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

export default BigCommerceB2bAgency;
