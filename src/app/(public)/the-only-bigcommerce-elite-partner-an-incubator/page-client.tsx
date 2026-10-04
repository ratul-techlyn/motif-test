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
import HeroMobile from "./~com/HeroMobile";
import FullMediaWidthAnim from "@/components/lib_comp/FullMediaWidthAnim";
import ServiceScrollGrid from "@/components/extrasc/ServiceGid";

// ✅ Dynamically import SEOHead with SSR enabled
// const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });


gsap.registerPlugin(ScrollTrigger, SplitText);

const serviceItems = [
  {
    imageSrc: "/assets/channels/dtc.png",
    title: "Direct To Consumer",
    description:
      "MOTIF® grows DTC brands that don’t just look good they last. From rebrands and migrations to full-stack growth, we rebuild the system behind the scroll. Real retention. Cultural connection. Engineered to scale.",
  },
  {
    imageSrc: "/assets/channels/Wholesale.png",
    title: "B2B & Wholesale",
    description:
      "We turn clunky wholesale flows into modern B2B experiences on BigCommerce. From gated storefronts, tiered pricing, ERP sync, to personalized portals that look and feel like your brand. We build brand-grade B2B experiences that feel custom.",
  },
  {
    imageSrc: "/assets/channels/retail.png",
    title: "Retail & Commerce",
    description:
      "From BigCommerce online store to inventory sync in offline to packaging and in-store moments retail isn’t just a channel. It’s the moment your brand becomes real. MOTIF® connects digital and physical into one seamless system from scroll to shelf to swipe.",
  },
];

const canvaImgs = {
  image: "/assets/bigcommerce/BigCommercePartner.png",
  altText:
    "MOTIF BigCommerce Elite Partner - Premier ecommerce agency specializing in luxury lifestyle branding, BigCommerce development, and enterprise commerce solutions for high-end fashion and beauty brands seeking exceptional digital experiences.",
  displacementImage: "/assets/luxuryLifestyle/luxuryBanner.webp",
};

const partnerData = {
  title: "Partnerships",
  description:
    "Brand success isn't easy so we partnered up with best in classes to change the brand experience, connecting with people and culture.",
};



const mainBanner = {
  lines: [
    [
      "The Only",
      "BigCommerce",
      {
        imageSrc: "/assets/instagram/Rules_not_for_you.jpg",
        altText:
          "Showing shot of a fashion marketing campaign photography by MOTIF which is better than a Fashion Branding & Marketing Agency",
      },
      "Partner You",
      "Hoped",
      "Existed", 
    ],
  ],
  description: [
   "You’ve done the hard part. Built the product. Held the vision. But every agency misses the point. And you’re tired of teaching it. MOTIF® gets it without the pitch deck. Brand, Tech, Belief and Culture blended in our DNA. Since 2015 building BigCommerce brands that feel human and scale with purpose. Not an agency.\n An incubator that builds from the inside out.",
  ],
};

const adSlider = [
  "BIGCOMMERCE DONE RIGHT",
  "CRAFT OVER COMMERCE",
  "NOT FAST. FOREVER.",
  "RULES REWRITTEN",
  "OBSESSION IS THE STRATEGY",
  "BUILT DIFFERENTLY",
  "POWER IN RESTRAINT",
  "MEMORY SELLS",
  "DESIRE. TRUST. REPEAT",
  "CUT THE STATIC",
  "SILENCE SPEAKS LOUDER",
  "BRAND DEPTH",
  "GROW DIFFERENT",
  "CREATIVE CORE",
  "GROWTH WITH GRAVITY",
  "BE UNFORGETTABLE",
  "STRATEGY. COMMERCE. EXPERTS",
];

const faq_section = {
  description: [
    "We blend the strategy, experience, and creative edge that turns chaos into clarity and clarity into revenue.",
  ],
  accordionList: [
    {
      title: "Strategy that scales",
      description: [
        {
          text: "Most of the times eCommerce and business strategies aren’t broken. They’re just built for the wrong game. Generic growth plans. Agency “playbooks.” Buzzwords without backbone.\n",
        },
        {
          text: "They chase traffic instead of traction. They sound smart in a pitch, then crumble at $100K/month. You’re left firefighting instead of building."
        },
        {
          text: "\n"
        },
        {
          text: "That’s what happens when strategy is built by marketers, not brand architects."
        },
        {
          text: "\n"
        },
        {
          text: "MOTIF® builds brand strategy like infrastructure: layered, intentional, and scale-tested. From product economics to emotional resonance. From market gaps to cultural cues. We map everything holding you back and build a roadmap for scale. Positioning. Brand Archetype. Channels. Margins. Strategy, in our world, isn’t a phase. It’s the foundation.\n"
        },
        {
          text: "Intentionally. Creatively. Profitably. Because a $10M brand won’t be built on a $10K roadmap."
        },
      ],
    },
    {
      title: "Brands That Don’t Blur",
      description: [
        {
          text: "Most dtc and eCommerce businesses don’t have a brand. They have a logo. A moodboard. Maybe a slogan. Most DTC busibnesses never make it past the tab they’re opened in.\n"
        },
        {
          text: "Because they never built a brand just a storefront. Logos don’t build legacy. Aesthetics doesn’t create equity.\n"
        },
       {
        text: "Nike didn’t become Nike because of a “look.” Zara didn’t scale through vibes. Real-world brands are architected with emotional positioning, cultural clarity, and obsessive communication systems that work across every channel: digital, retail, packaging, ads, PR, product.\n"
       },
       {
        text: "Most businesses don’t even know their brand archetype. They don’t speak in one voice. They don’t create memories. You want to be Nike. But you’re selling like it’s Temu. You want to be on shelves but you’ve only built for scrolls.\n"
       },
       {
        text: "MOTIF® changes that and helps brands go from noise to memory. We build the emotional, strategic, and creative foundation that separates product pushers from iconic brands. We builds brands that move differently. Emotion-led. Clarity-obsessed. From brand platform to product packaging, we make sure your identity travels like a story not a SKU.\n"
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
      title: "Beyond UX. Into Experience",
      description: [
        {
          text: "Most BigCommerce sites work. But function isn’t the same as feeling. Enterprise buyers and premium consumers don’t just want speed. They want significance."
        },
        {
          text: "Most brands chase UX and forget the X stands for experience. They optimize checkout buttons, not how people feel. They forget the site is the first proof of the brand. For beauty, fashion, and luxury brands, that’s a fatal mistake.\n"
        },
        {
          text: "In fashion, beauty, and luxury your site isn’t just a storefront. It’s your flagship. Your first fitting room. Your fragrance counter. It’s where perception is formed and brand magic happens or dies. And it definitely doesn’t stop at the homepage.\n"
        },
        {
          text: "A flagship store makes you feel something before you ever buy. The lighting. The music. The scent. The weight of the door handle. Now ask yourself: Does your website do the same?\n"
        },
        {
          text: "Most don’t.\n They’re fast, but not emotional.\n Branded, but not ownable.\n Usable, but never unforgettable.\n"
        },
        {
          text: "If your $700 coat or $150 skincare system feels luxurious, your site should, too. And not just on the web across email, mobile, AR, VR, packaging.\n"
        },
        {
          text: "At MOTIF®, we build immersive, sensorial, brand-safe experiences digital spaces that create desire, not just drive conversion. Because what good is fast checkout if no one remembers the brand?\n"
        },
        {
          text: "MOTIF® builds experience for both today and tomorrow. Every build merges editorial storytelling with tech sophistication, creating platforms that preserve brand experience and evolve seamlessly into a zero-click future.\nBecause great brands don’t just optimize interfaces. They craft experiences that last."
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
          text: "First you’ve hired a performance agency. They promised 3x ROAS. You got the numbers but not the connection. No story. No brand love. Just another ad in a forgettable feed.\n"
        },
        {
          text: "Then the email agency. Retention junkies. They flooded inboxes with “high-converting flows” that didn’t sound like you. Automated noise that chased sales, not retention and loyalty.\n"
        },
        {
          text: "Then you hired organic marketing gurus and by default came in the UGC guys. “Authenticity sells,” they said. Except the videos were scripted. The users were actors. The trust? Gone cause it’s overly used and consumers can spot it.\n"
        },
        
        {
          text: "You weren’t building a brand. You were betraying your own brand. And somewhere in that mess… You realized what was missing.\n"
        },
        {
          text: "That’s what happens when your marketing is all about performance and your team chase for metrics rather than creating memories. Brands are built on Meaning + Emotion + Identity. Culture + Connection.\n"
        },
        {
          text: "And that’s what MOTIF® restores. We don’t run campaigns.\n We build communication systems that move people."
        },
        {
          text: "We don’t just sell products, we sell emotions. We connect brands with people and culture at the right moment, in the right voice, with the right intent. We don’t choose between performance and creativity.\n We use strategy × commerce × creativity to drive desire and growth together.\n"
        },
        {
          text: "This isn’t data-worship. It’s human-first, arts-led marketing where data’s the tool, not the god. Since 2015, we’ve helped fashion, beauty, and luxury lifestyle brands go from noise to memory. From hacked funnels to holistic growth. From rented attention to obsessed audiences. Because when marketing moves people the performance follows.\n"
        },
        {
          text: "For fashion, beauty, and luxury lifestyle brands, marketing should feel like magic, not machinery. That’s the difference between attention… and obsession."
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
          text: "You didn’t build your brand to fight your platform. But here you are — duct-taping apps just to launch a promo. Paying through the nose for features that should’ve been native. Struggling with headless. Blocked by checkout. Held hostage by rising fees and rigid logic.\n",
        },
        {
          text: "Shopify feels like it’s made for startups. Magento? Like it's still 2011."
        },
        {
          text: "You’ve outgrown them both. And you feel it in your ops, your growth, your margins.\n"
        },
        {
          text: "But migration? That’s a different fear.\n"
        },
        {
          text: "\n"
        },
        {
          text: "A poorly executed migration doesn’t just lose traffic it kills trust. One glitch, one broken flow, and years of prestige disappear overnight. For high-value customers, a single friction point feels like carelessness. That’s a risk luxury lifestyle, fashion or highend beauty brands can’t take.\n"
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
             { text: "- Shopify-to-BigCommerce"},
             { text: "- Magento-to-BigCommerce Migration"},
             { text: "- Tech Stack Mapping + Rebuilding (ERP, OMS, CRM, PIM)" },
             { text: "- International + Multi-Storefront Setup"},
             { text: "- Scalable Architecture" },
             { text: "- SEO First Migration" },
             { text: "- Post-Migration Monitoring, Optimization & Strategy"},
          ]
        },
      ],
    },
    {
      title: "Emotion + Experience + Conversion",
      description: [
        {
          text: "Most optimization playbooks are built to squeeze. Squeeze more clicks. Shorter copy. Faster checkout. Congratulations! You gained 0.6% conversion and what’s left is just... a product page with a button. And a brand with no feeling. Conversion Rate Optimization (CRO) is a race to the bottom."
        },
        {
          text: "Conversion shouldn’t cost you your brand. But most optimization does exactly that. They strip the story. Kill the detail. Flatten the feel. Just to chase a button click.\n"
        },
        {
          text: "Luxury, fashion, and beauty don’t scale with hacks. They scale with harmony. From homepage to checkout, mobile app to unboxing, every moment should feel connected not like a funnel, but a feeling.\n"
        },
        {
          text: "Most CRO treats premium brands like SaaS trials, cut the story, shrink the funnel, run the test But beauty, fashion, and luxury don’t convert on urgency. CRO works for what’s replaceable products that win on price, convenience, or speed.\n"
        },
        {
          text: "But fashion, beauty, and luxury aren’t bought that way. They’re felt. Desired. Remembered. They convert on emotion, presence, and trust.\n"
        },
        {
          text: "That’s why MOTIF® doesn’t do CRO. We do CXO: Customer Experience Optimization. Because it’s never just a site. It’s the entire system email, PDPs, AR/VR, packaging, follow-ups tuned to protect desire and deepen trust. CXO turns first-time buyers into loyalists, not just conversions. That’s how brands stop blending in and start scaling with sacrificing the brand experience."
        },
        {
          text: "CXO means optimizing the entire customer experience and experiences. Not just a site. The emails. The unboxing moment. The mobile app. The follow-up that feels like a conversation, not automation. Every detail signals status, builds trust, and keeps desire alive.\n"
        },

        {
          list: [
             { text: "- Customer Experience Strategy & Mapping" },
             { text: "- Customer journey defination" },
             { text: "- User Behavior, Heatmap & Drop-Off Analysis" },
             { text: "- Story-driven A/B testing for emotional lift" },
             { text: "- Physical Touchpoint Refinement: Packaging, unboxing & post-purchase" },
             { text: "- Post-Purchase Flow & Follow-up Moments That Build Loyalty"},
             { text: "- End-to-End Optimization That Protects Story, Style & Value"},
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
      title: "Build > Grow > Scale (LOOP)",
      description: [
        {
          text: "There is a swift difference between “Growth” and “Strategy”. Growth is easy. Scaling while being profitable is harder.\n",
        },
        {
          text: "Agencies love “growth” because it looks good in a Quick Book. Run bigger ads. Push more SKUs. Offer discounts. That’s not strategy, that's survival. And here’s the secret: they get paid whether you win or not. Retainers, billable hours, upsells it’s a game where the agency always profits, even when the brand bleeds.\n",
        },
        {
          text: "Most BigCommerce agencies chase 'Growrth' not sustainability. They flood the funnel. Launch more SKUs. Push more ads. Then walk away when it breaks.\n"
        },
        {
          text: "MOTIF® doesn’t play that game. We’re not an agency. We don’t live on retainers or campaign fluff. We scale brands as partners aligned on performance, invested in outcomes. We win when you win. No smoke. No mirrors. But with a partnership that creates lasting value.\n"
        },
        {
          text: "With our continuous hands-on analysis of every little market change, we work towards maximizing your ROI, helping you reach more audiences and converting them better\n",
        },
        {
          text: "Our model is designed to scale your fashion, beauty, or luxury lifestyle brand up to $400K/month in revenue profitably, sustainably, and soul-first.\n We map your strategy, margins, team roles, tech stack, capital needs, and CX systems to hold that level of growth before we chase scale.\n"
        },
        {
          text: "But here’s the truth: We do not scale brands beyond $400K/month inside the MOTIF® model. Not because we can’t. But because we won’t risk breaking what we built. After $400K/month, you’re no longer just a brand. You’re a company in need of a great internal team and system.\n"
        },
        {
          text: " At that point, we shift gears.\n"
        },
        {
          list: [
             { text: "→ MOTIF® steps into a consultative and strategic oversight role." },
             { text: "→ We help build your internal team, hire key talent, and design the next evolution." },
             { text: "→ If aligned, we introduce your brand to Revix our one-brand-one-investor growth capital model where we co-invest and scale with you." },
          ]
        },
        {
          text: " \n"
        },
        {
          text: "We don’t sell dreams.\n We build realities."
        },
        {
          text: "And we stop before it becomes fantasy.\n"
          
        },
        {
        text: "Because great brands don’t get big by doing more. They get smart about when to pause, re-architect, and loop forward.That’s not an agency. That’s a growth partner."
        },
      ],
    },
  ],
};


const BigCommerce = () => {
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
      {/* <SEOHead seo={bigcommerceEliteSEO} /> */}
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

      <section className="py-28">

      <ServiceScrollGrid items={serviceItems} />
      </section>


      <section className="layout_normal my-36 w-[90%] md:w-[90%] lg:w-[70%]">
        <TwoColCard
          description={partnerData.description}
          title={partnerData.title}
        />
      </section>
      <Brands />

      <MarqueeNavigation
        text={["THE ORIGIN"]}
        href="/about"
        speed={2.5}
        iconClass="text-[#ED5F09]"
        iconSize={iconSize}
      />
    </div>
  );
};

export default BigCommerce;
