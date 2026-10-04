import React from 'react';
import Slider from "@/components/shared/Slider";
import RecommandationCard from "@/components/shared/Recommandations/RecommandationCard";
const recommendations = [
  {
    quote: [
      "Motif provided the perfect balance of professionalism and creativity. They listened closely, refined ideas with care, and executed with precision. Communication was always clear, and support felt consistent at every step. What impressed me most was how invested they were in the outcome. They cared about our goals as much as we did, which made the process collaborative and inspiring. The final result captured our vision while opening space for future growth."
    ],
    name: "Sarah Dhiman",
    position: "Founder",
    company: "Jewelry Amore"
  },
  {
    quote: [
      "Motif’s dedication and personalized care stood out from day one. The team was accessible, dependable, and clear in their reasoning, guiding us through complex choices with confidence. They built a platform that supported both B2B and retail operations and simplified our workflows. The results improved sales and strengthened customer experience. What made the difference was their steady commitment and ability to make challenges feel manageable and solvable."
    ],
    name: "Alla Ishkirat",
    position: "Founder",
    company: "IDH"
  },
  {
    quote: [
      "Working with Motif felt seamless. They handled strategy, creative, and execution with speed while keeping quality high. Every brainstorming session was structured, feedback loops were short, and decisions were backed with clarity. Our performance metrics and brand recall improved significantly. What stood out most was how they reduced friction and gave us momentum. They simplified the process, removed bottlenecks, and delivered outcomes we could build on confidently."
    ],
    name: "Mohammad Faisal",
    position: "Founder",
    company: "StyleBud"
  },
  {
    quote: [
      "The flexibility Motif showed was a game changer. I have worked with many teams where small changes became big challenges, but they were quick, responsive, and clear. The process was easy to follow, and every milestone was met with care. They respected our constraints without ever lowering the quality bar. The site we launched worked exactly as promised, and the collaboration felt smooth from start to finish. Their reliability gave us confidence in every decision we made together."
    ],
    name: "Esther Chang",
    position: "Co-Founder",
    company: "Tenshoppe"
  },
  {
    quote: [
      "Motif built more than a website for us, they created a business tool designed to scale. They took time to understand our identity and goals, then designed a system that felt intuitive and conversion focused. Every part of the process was documented and thoughtful, and issues were anticipated before they appeared. The launch was smooth and the impact measurable. What impressed us most was their calm, methodical approach that kept our team confident through each stage."
    ],
    name: "Collin Gray",
    position: "Founder",
    company: "Fable Beard Co."
  },
  {
    quote: [
      "From day zero, Motif crafted a strategy that was part art and part science, positioning us clearly in a crowded market. They built technology that not only worked but converted, and set up a growth engine that valued profitability as much as scale. Every idea was tested and refined until it made sense. What impressed me was how they never treated us like clients. They moved as if the brand were their own, making sure every choice was built to last."
    ],
    name: "Dominik Kubica",
    position: "Founder & CEO",
    company: "DP Paradis"
  },
  {
    quote: [
      "Motif’s speed of communication is almost unmatched, often replying in minutes. They adapt quickly, handle feedback with clarity, and evolve strategies without losing sight of long term goals. That level of responsiveness built trust fast and allowed us to move with confidence. I always felt supported, whether we were tackling new campaigns or refining existing systems. They act as partners who think ahead and solve problems before they appear."
    ],
    name: "Marco",
    position: "Head of Ops",
    company: "SCD"
  },
  {
    quote: [
      "My experience with previous agencies was frustrating, but Motif is different. They care deeply about performance and your long term success. They are responsive, willing to jump on a call anytime, and always bring practical advice that feels tailored to the situation. What stood out was how invested they were, working like an extension of our team rather than outsiders. Every step felt collaborative, and the growth we achieved together was both measurable and lasting."
    ],
    name: "Jenny Wulace",
    position: "Founder",
    company: "LACE"
  }
];

const RecommandationMpr = () => {
    return (
        <div>
            <Slider
                navigationCustom={true}
                autoplay={false}
                slides={recommendations.map((el, idx) => <RecommandationCard
                    recommendation={el}
                    key={idx}
                />)}
            />
        </div>
    );
};

export default RecommandationMpr;