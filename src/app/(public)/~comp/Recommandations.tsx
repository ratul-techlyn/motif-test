import RecommandationCard from "@/components/shared/Recommandations/RecommandationCard";
import Slider from "@/components/shared/Slider";

const recommendations = [
  {
    quote: [
      "Motif cares about the performance of their work and your long-term success. They’re responsive, always ready to jump on a call even on weekends because they truly care about your brand. They can work with any budget, large or small. Their ideas push boundaries but stay rooted in what actually works, and more importantly, we felt understood. They make complex things simple and stand by you through challenges. They’re a fantastic long-term partner.",
    ],
    name: "Jenny Wulace",
    position: "Founder",
    company: "LACE",
  },
  {
    quote: [
      "What made FVVO different was the scale of ambition. This wasn’t just about launching another brand, it had to be global from day one. The stakes were higher: international markets, multiple customer touchpoints, zero room for friction. That’s where Motif proved, once again, why they’re non-negotiable for us. They didn’t just build a website, they built an experience that translated across borders. Every page, every flow, every piece of content was designed to work as well in Berlin as it did in Los Angeles. The tech wasn’t just functional; it converted, and it scaled.",
    ],
    name: "Dominik Kubica",
    position: "Founder",
    company: "FVVO",
  },
  {
    quote: [
      "Motif is the best to work with. They deliver above and beyond, are very flexible, fast, and communicative. One of the most professional teams I’ve worked with in fashion e-commerce. They understood our brand from the start and gave us a site that felt premium and strategic which is not only conversion-focused but also built to drive branded experience. Their suggestions, cost-conscious mindset, and outstanding communication are unmatched. Truly a rare team.",
    ],
    name: "Esther Chang",
    position: "Co-Founder",
    company: "TENSHOPPE",
  },
  
   {
    quote: [
      "Motif completely transformed our business. Their team is faster than anyone we’ve worked with. They reply in minutes, deliver consistently, and always keep quality high. They didn’t just help us scale they have built the foundation for our growth. Their ability to align with our vision made them a real partner, not a service provider. Every decision felt collaborative, and every milestone delivered exactly as promised.",
    ],
    name: "Dominik Kubica",
    position: "Founder & CEO",
    company: "SCD CROWD",
  },
  
  {
    quote: [
      "When we launched DP Paradis, we knew what we didn’t want: another agency, another pitch deck, another surface-level vendor. We’d seen that movie before. What we did want was someone aligned with our ambition and able to move fast without breaking the brand. That’s why we chose Motif. Four brands later, that decision still pays off. They continue to prove themselves as partners who adapt, innovate, and care about long-term impact.",
    ],
    name: "Marco",
    position: "Head Of Ops",
    company: "DP PARADIS",
  },
  {
    quote: [
      "Our experience with MOTIF has been truly transformative. They approached our project with dedication, understanding us deeply before starting any design work. MOTIF built a business tool, not just a website. Their strategic thinking and focus on results had a direct impact on our bottom line. What impressed us most was their ability to anticipate problems before they arose and guide us through with clarity, making growth feel effortless.",
    ],
    name: "Collin Gray",
    position: "Founder",
    company: "FABLE Beard Co.",
  },
];


const Recommandations = () => {
  return (
    <div className="layout_normal mx-auto mt-20 mb-40  px-3 md:px-0 w-[90%] md:w-[90%] lg:w-[70%]"
          aria-label="Client testimonials and brand partnership results from MOTIF® incubator programs"
      >
        <h2 className="sr-only">
          Brand Testimonials — MOTIF® incubator clients share growth stories in fashion, beauty, and luxury lifestyle.
        </h2>
        <p className="sr-only">
          Hear what fashion, beauty, and lifestyle brand founders have to say about working with MOTIF® as their growth partner. These testimonials reflect the transformation brands experience when strategy, creativity, and technology are handled by one incubator. From brand positioning to customer retention, the outcomes speak for themselves.
        </p>

      <Slider
        navigationCustom={true}
        autoplay={false}
        fade={true}
        slides={recommendations.map((el, idx) => (
          <RecommandationCard recommendation={el} key={idx} />
        ))}
      />
    </div>
  );
};

export default Recommandations;
