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
  image: "/assets/beauty/Beauty-skincare-hero.png",
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



const mainBanner = {
  lines: [
    [
      "Scaling Beauty Brands", "with","Creativity", "and Care",
      {
        imageSrc: "/assets/beauty/beautyTitleImage.jpg", altText: "Beauty image",
      },
    ],
  ],
  description: [
    "True growth in beauty doesn’t come from noise, hacks, or discounts. It comes from clarity, consistency, and connection. MOTIF® helps beauty brands scale through human-first creativity, cultural insight, and brand strategy that connects deeper than campaigns ever could.",
  ],
};

const adSlider = [
  "HUMAN FIRST",
  "TRUST BUILDS",
  "CULTURE BUILT",
  "SEEN & FELT",
  "MEANING WINS",
  "EMPATHY SELLS",
  "CUT THE STATIC",
  "NO FILTERS",
  "BRAND DEPTH",
  "NURTURE OBSESSION",
  "CREATIVE CORE",
  "DESIRE DRIVEN",
  "AUDIENCE INTIMACY",
  "DEEPER THAN VIRAL",
];

const faq_section = {
  description: [
    "Scaling beauty brands that make people feel something without losing soul or magic.",
  ],
  accordionList: [
    {
      title: "Strategy That Builds Desire",
      description: [
        {
          text: "Most beauty brands start with a product, not a plan. They launch with a “vibe,” a founder story, and a dream but no market clarity. Six months later, they’re stuck throwing money at ads and influencers, wondering why no one’s obsessed. Agencies throw in funnels, fake personas, and channel plans copied from their last client. It all looks “strategic,” but there’s one problem: it doesn't make anyone care.\n",
        },
        {
          text: "In the beauty industry, you’re not just selling a product. You’re selling desire. If your strategy doesn’t tap into human psychology, behavior loops, culture, and visual codes, it’s dead weight. They buy rituals, transformations, confidence, identity. And if your strategy doesn’t create that emotional pull, no media plan will save you. While most agencies push we help you pull. Because pushing ads at people doesn’t work if they’re not already drawn to the brand. \n",
        },
        {
          text: "MOTIF® builds a strategy that creates gravity. We help you shape desire, build relevance, and show up where beauty decisions actually begin emotionally, culturally, and commercially.\n"
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
                { text: "- Brand story and strategy that creates pull" },
                { text: "- Market Expansion Strategy" },
                { text: "- Retail, DTC, and hybrid go-to-market planning"},
              ]
        },
      ],
    },
    {
      title: "Branding That Builds Obsession",
      description: [
        {
         text: "Ever wonder why some beauty brands go viral once and vanish, while others quietly build cult followings? The answer’s not in the font. It’s in the feeling.\n"
        },
        {
          text: "Most beauty brands obsess over the look. They get a logo, a moodboard, and a tagline that sounds like every clean, conscious, curated brand out there. It looks nice. But nobody feels anything.\n"
        },
        {
          text: "That’s because branding isn’t design. It’s desire, translated. It's how people recognize you, remember you, and repeat your name when no one’s watching. If your branding doesn’t make someone feel, seen or understood it’s not invisible.\n"
        },
        {
          text: "And here’s the real problem: agencies sell branding like its design. But what they hand you is a brand identity kit, not a branding strategy or brand communication strategy. No emotional hooks. No verbal DNA. No story people can repeat. Just another clean beauty brand with beige packaging.\n"
        },
        {
          text: "MOTIF® builds beauty brands that live in people’s heads and on their bathroom shelves. We connect your look, tone, rituals, and language into one living identity system that whispers familiarity and commands obsession. Whether it’s a product name, a tagline, or a signature scent everything should stick.\n"
        },
        {
          text: "Our proven method has helped skincare and beauty brands like yours build a narrative around their brand, increasing their visibility and recall.",
        },
        {
          list: [
                { text: "- Brand Positioning that connects logically and emotionally" },
                { text: "- Founder story woven into brand DNA" },
                { text: "- Narrative systems that create emotional relevance" },
                { text: "- Identity design tied to strategic intent, not trends" },
                { text: "- Verbal + Visual Brand Identity"},
          ]

        },
      ],
    },
    {
      title: "Experience That Feels Intimate",
      description: [
        {
          text: "Most beauty websites are built like sales machines, not brand homes. Performance marketers promise quick wins, so founders end up with the same formula: a landing page, quiz, before-and-after section, then a loud call to action. It’s all funnel, no feeling. Sure, it might convert a stranger once but it never creates real connection.\n"
        },
        {
          text: "When a website feels like it’s solving a math problem, people click but they don’t care. You get one-time sales, not long-term love.\n"
        },
        {
          text: "In beauty, emotion sells before ingredients ever do. The site isn’t just a storefront  it’s your flagship.Every scroll should feel intuitive. Every detail should whisper: this brand gets me. If your store doesn’t connect like a human, people bounce like bots.\n"
        },
        {
          text: "We design experiences that seduce before they sell. Every build blends brand storytelling, premium design, and behavior psychology to turn casual visitors into brand believers. Every build blends brand storytelling, editorial design, and behavioral psychology to turn casual visitors into brand advocates. Whether it’s the homepage or a PDP, we design experiences that whisper, “This is made for you.” Beauty is personal. Your site should be too.\n"
        },
        {
                  list: [
                        { text: "- Brand-enhancing design exploration" },
                        { text: "- Customer Experience Optimization" },
                        { text: "- Copy writing that feels conversational, not conversional" },
                        { text: "- Customer Experience Journey Mapping" },
                        { text: "- Branded Ecommerce Experience that build trust, not pressure" },
                        { text: "- Creative & Art Direction for Omnichannel Experiences"},
                  ]
                },
      ],
    },
    {
      title: "Marketing that Connects",
      description: [
        {
          text: "Most beauty brands are stuck in a loop: chasing algorithms, copying viral ads, and praying for low CAC. Agencies promise ROAS with loud creative, trend-hopping reels, and over using direct response copywriting..\n"
        },
        {
          text: "Marketing becomes a volume game. Spray ads everywhere. Test hooks. Launch offers. Then blame the platform when it doesn’t work. But sustainable beauty brands aren’t built in a Meta Ads dashboard. They’re built in culture. In memory. In people’s daily lives.\n"
        },
        {
          text: "If your content doesn’t create emotional pull, no media budget can fix it. Beauty is personal. Your marketing should feel that way too.\n"
        },
        {
          text: "We’ve seen it too many times performance-first agencies turning meaningful brands into shallow machines. When everything becomes a funnel, you lose the feeling. The brand stops breathing..\n"
        },
        {
          text: "MOTIF® builds campaigns that connect deeper. Stories that stay in people’s minds. Creative that moves culture. Strategy that drives sales without sacrificing what made the brand beautiful in the first place. We craft marketing campaigns that tell your story clearly, consistently, and creatively across every channel that matters. \n"
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
          text: "Most beauty brands outgrow their platforms at some points. But platform migration feels terrifying. One bad move suddenly your store crashes, SEO tanks, and customers get locked out. One wrong step? Years of brand trust? Just gone.\n"
        },
        {
          text: "Worse? Most agencies treat migration like a tech task. Drag and drop. Flip the switch. Hope for the best. They forget that beauty brands are built on emotion, consistency, and experience.\n"
        },
        {
          text: "At MOTIF®, migration isn’t a site swap. It’s a brand transplant. Whether you’re moving to Shopify, BigCommerce, or a headless build, we map everything with precision and empathy. The tech gets upgraded. The customer never notices a bump. That’s how it should be.\n"
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
          text: "Most beauty brands get trapped in the CRO trap. All the so-called “CRO experts” tell you to test your way to more sales, tweak the CTA, change the color, and move the button.\n"
        },
        {
          text: "And sure, the metrics might look better. But if the customer doesn’t feel anything, what are you really optimizing?\n"
        },
        {
          text: "When you optimize for conversion only, you lose the human connection. Your beauty brand website ends up looking like every other generic beauty and skincare website: soulless, generic, transactional.\n"
        },
        {
          text: "But beauty is personal. Ritual-based. Sensory. You can’t A/B test your way to trust. You have to earn it with small moments that feel like care, not conversion traps.\n"
        },
        {
          text: "That’s why we ditched the “CRO” thing. We optimize the entire customer experience. We look at how your customers move, scroll, hesitate, and feel and refine the brand experience to match. From homepage to unboxing, email to app, every touchpoint should feel like care. Not conversion bait. From landing page to loyalty email, we rebuild trust, one click at a time.\n"
        },
        {
          text: "You don’t need to test 37 button colors. You need a brand that makes people want to come back. Because the best kind of optimization doesn’t feel like optimization at all.\n"
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
          text: "The way people discover beauty is changing fast. They don’t scroll through Google. They ask ChatGPT. They ask Perplexity. “Best clean mascara?” “Gentle retinol that actually works?” And if your brand doesn’t show up in those answers, you don’t exist. \n"
        },
        {
          text: "You can run perfect ads. Build the prettiest website. But if AI can’t find you your customers won’t either. That’s what we call the “Zero Click Era” when decisions happen before the click, before the scroll. Most beauty brands aren’t ready for this. Most agencies don’t even know how to prepare. They’re still optimizing headlines for Google while the next generation of buyers is getting answers from AI. \n"
        },
        {
          text: "At MOTIF®, we make your brand answer-worthy. We optimize your content, structure, and stories so AI tools recognize you as the solution. It’s not SEO. It’s (AEO) Answer Engine Optimization. Because your next loyal customer is already asking they just need to hear your name.\n"
        },
        {
          text: "What we will do:"
        },
        {
          list: [
             { text: "- Answer Engine Optimization (AEO) (ChatGPT, Perplexity, Google AI)" },
             { text: "- Personalization That Feels Bespoke: Predictive recommendations" },
             { text: "- Retention That Anticipates Desire: AI-powered loyalty experiences" },
          ]
        },
      ],
    },
    {
      title: "Scale → Care → Repeat",
      description: [
        {
          text: "Scaling is a chapter, not the whole book. Beauty & Skincare Industry’s graveyard is full of brands that grew, then froze. Reinvention is survival. Endurance is art.\n",
        },
        {
          text: "Most beauty brands chase scale like it’s a sprint. More SKUs. More ads. More discounts. Agencies push faster funnels, hacky retention, and big media budgets. But no one’s asking: Is any of this actually sustainable?\nHere’s the pattern:\n Quick growth → customer fatigue → discounts → decline → silence.\nAnd the agency still gets paid. That’s not a growth model. That’s a brand burnout loop.\n"
        },
        {
          text: "Agencies love “growth” because it looks good in a Quick Book. Run bigger ads. Push more SKUs. Offer discounts. That’s not strategy, that's survival. And here’s the secret: they get paid whether you win or not. Retainers, billable hours, upsells it’s a game where the agency always profits, even when the brand bleeds.\n ",
        },
        {
          text: "MOTIF® doesn’t play that game. We’re not an agency. We don’t live on retainers or campaign fluff. We scale brands as partners aligned on performance, invested in outcomes. We win when you win. With a partnership that creates lasting value.\n Our model is simple. If your brand earns more, we earn more. No empty performance reports. Just real growth, real alignment, and real shared upside.\n"
        },
        {
          text: "With our continuous hands-on analysis of every little market change, we work towards maximizing your ROI, helping you reach more audiences and converting them better.",
        },
      ],
    },
  ],
};

 

const BeautyAgency = () => {
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
      {/* <SEOHead seo={beautySEO} /> */}
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

export default BeautyAgency;
