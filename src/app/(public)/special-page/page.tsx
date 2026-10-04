"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionInnerHero from "@/components/extrasc/SectionInnerHero";
import ServiceScrollGrid from "@/components/extrasc/ServiceGid";
import StatsHighlight from "@/components/extrasc/StatHighlight";
import WhyPartnerBlock from "@/components/extrasc/WhyPartnerBlock";

gsap.registerPlugin(ScrollTrigger);

const partnerPoints = [
  {
    label: "Global scale, <br/> local relevance",
    content:
      "Navigating the complexities of global expansion requires a partner who understands the nuances of each market. DEPT® excels at helping brands scale internationally while maintaining authentic local connections. We leverage Shopify’s robust platform to build multi-language, multi-currency stores, ensuring seamless customer experiences worldwide. Our strategic approach addresses the “multi/multi/multi” challenge head-on, delivering tailored solutions that resonate with diverse audiences.",
  },
  {
    label: "AI-powered <br/> commerce innovation",
    content:
      "In an era defined by data and AI, we’re at the forefront of innovation. We harness the power of artificial intelligence to personalize shopping journeys, optimize content creation, and streamline commerce operations. Imagine dynamic product recommendations, AI-generated marketing copy, and predictive analytics anticipating customer needs. Our AI-native approach transforms Shopify into a powerful engine for growth and engagement.",
  },
  {
    label: "End-to-end <br/>strategic partnership",
    content:
      "Unlike agencies focusing on a single aspect of Shopify implementation, we offer comprehensive, end-to-end expertise. From initial discovery and strategic planning to design development, optimization, and ongoing support, we’re your trusted partner at every stage. Our holistic approach ensures seamless integration and maximum ROI. We provide round-the-clock support, working closely with Shopify’s Merchant Success Program to keep your store at the cutting edge.",
  },
  {
    label: "Future-proofing your <br/>digital transformation",
    content:
      "Today’s commerce landscape is constantly evolving. We help you future-proof your digital strategy by building scalable, adaptable Shopify solutions. We don’t just solve immediate challenges; we anticipate future trends and ensure your platform is ready for what’s next. Our work demonstrates our ability to drive impactful digital transformations that stand the test of time.",
  },
];

const statData = [
  { value: "8+", label: "Years of experience" },
  { value: "150+", label: "Shopify developers" },
  { value: "300+", label: "Live Shopify sites" },
];

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

export default function SpecialTestPage() {
  return (
    <main>
      <SectionInnerHero
        title={"Fueled By<br/> Culture"}
        subtitle="Strategic vision X Cultural Depth"
        description="Motif’s incubator was built for those who create differently. We don’t follow playbooks we shape them. Rooted in culture and driven by human instinct, we craft, accelerate, and evolve brands that move with purpose and stay ahead of time."
        buttonLabel="WHY MOTIF"
        onButtonClick={() => console.log("CTA clicked")}
        linkHref="/why-motif"
        imageSrc="/assets/motif-hero-office.jpg"
        imageAlt="Hero Sample Image"
      />

      <StatsHighlight
        stats={statData}
        textColor="text-white"
        borderColor="border-neutral-100"
      />

      <WhyPartnerBlock
        heading="Why clients choose MOTIF® </br> as their Shopify partner"
        items={partnerPoints}
        textColor="text-white"
      />

      <ServiceScrollGrid items={serviceItems} />
    </main>
  );
}
