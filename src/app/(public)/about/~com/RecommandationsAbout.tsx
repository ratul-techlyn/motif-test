import RecommandationCard from "@/components/shared/Recommandations/RecommandationCard";
import Slider from "@/components/shared/Slider";

const recommendations = [
  {
    quote: [
      "Launching FVVO was different from any other project because the ambition was global from day one. There was no room for friction, and every touchpoint had to scale across markets. Motif built more than a website, they created an experience that translated seamlessly from Los Angeles to Berlin. What impressed me was how integrated their approach was, combining brand, growth, and customer experience into one system. That is why FVVO entered markets faster and stronger than forecast."
    ],
    name: "Dominik Kubica",
    position: "Founder",
    company: "FVVO"
  },
  {
    quote: [
      "Motif combined creativity with professionalism in a way that made the entire journey feel collaborative. They listened deeply, adapted quickly, and delivered work that reflected our brand’s essence. Every stage of the process felt transparent and supportive, with no wasted steps. What impressed me most was how invested they were, treating our project with the same seriousness as if it were their own. That level of care made all the difference and gave us lasting confidence."
    ],
    name: "Sarah Dhiman",
    position: "Founder",
    company: "Jewelry Amore"
  },
  {
    quote: [
      "Motif’s dedication to our success was evident from the start. The team was accessible, clear in their guidance, and willing to go beyond the expected. They built a platform that did more than function, it shaped the way we manage and grow. Our sales and customer experience both improved in measurable ways. The process was efficient but never rushed, and every decision carried intention. They felt less like a vendor and more like true co-builders of our business."
    ],
    name: "Alla Ishkirat",
    position: "Founder",
    company: "IDH"
  },
  {
    quote: [
      "Motif helped us organize our vision into a system that actually delivered. They were fast, communicative, and extremely reliable. Every idea was tested, every strategy was explained, and execution felt seamless. We saw performance metrics rise and operations run smoother. What I valued most was how grounded their process was. They never sold us promises, they gave us work that scaled. That kind of consistency is rare and the reason we continue to rely on them."
    ],
    name: "Mohammad Faisal",
    position: "Founder",
    company: "StyleBud"
  },
  {
    quote: [
      "I have worked with many teams, but the responsiveness and clarity that Motif brought stood out. Small changes never became roadblocks, and major milestones were handled with calm efficiency. The quality of their design and functionality was excellent, but what impressed me more was their ability to keep things moving without friction. They became a reliable partner we could trust, and that trust allowed us to focus on growth rather than constant problem solving."
    ],
    name: "Esther Chang",
    position: "Co-Founder",
    company: "Tenshoppe"
  },
  {
    quote: [
      "Motif built more than a site, they built a system tailored to our goals. They took the time to understand what success looked like for us, and then designed with strategy, not just style. Documentation was clear, communication was consistent, and issues were anticipated ahead of time. The result was a tool we could use daily with confidence. It was less about handing off a project and more about setting up a foundation we could continue to scale sustainably."
    ],
    name: "Collin Gray",
    position: "Founder",
    company: "Fable Beard Co."
  },
  {
    quote: [
      "What continues to surprise us, even after several brands, is Motif’s level of obsession. There are no vague timelines or loose ends, just focused partnership. Every idea is tested, every move backed with clear reasoning. They do not behave like outsiders, they work as if the brand were their own. That mindset is rare and makes their contribution invaluable. It gives us the confidence to move faster, knowing each step is built on strategy and designed to hold under pressure."
    ],
    name: "Dominik Kubica",
    position: "Founder & CEO",
    company: "DP Paradis"
  },
  {
    quote: [
      "Motif’s partnership has become indispensable to us. Their responsiveness, discipline, and ability to adapt has allowed us to make progress quickly and consistently. They bring clarity into complex situations and remove friction so we can focus on growth. Every engagement feels like a step forward, not just a task completed. It is this ability to stay sharp, move fast, and remain aligned with our goals that makes them more than a vendor. They are a true long-term ally."
    ],
    name: "Marco",
    position: "Head of Ops",
    company: "SCD"
  },
  {
    quote: [
      "My past experiences left me cautious, but Motif proved to be different. They care deeply about performance and your long-term success. Always responsive, they jump on calls when needed and provide practical advice that feels designed for your brand. Their involvement goes beyond project delivery, they show up like part of your team. Every stage felt thoughtful, collaborative, and rooted in strategy. That investment in outcomes is why I recommend them without hesitation."
    ],
    name: "Jenny Wulace",
    position: "Founder",
    company: "LACE"
  }
];


const RecommandationsAbout = () => {
  return (
    <div className="mt-0 lg:mt-20">
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

export default RecommandationsAbout;
