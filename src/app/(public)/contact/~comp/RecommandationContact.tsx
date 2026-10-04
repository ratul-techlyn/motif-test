import RecommandationCard from '@/components/shared/Recommandations/RecommandationCard';
import Slider from '@/components/shared/Slider';
import React from 'react';

const recommendations = [
  {
    quote: [
      "The launch of FVVO required precision and global scale from day one. Motif handled the challenge with discipline and creativity, building systems that worked seamlessly across markets. Every part of the rollout was intentional and designed to scale without friction. Their ability to combine brand, growth, and customer experience into one process gave us clarity and confidence. That is why FVVO hit new markets faster and stronger than we had forecast, proving this partnership essential."
    ],
    name: "Dominik Kubica",
    position: "Founder",
    company: "FVVO"
  },
  {
    quote: [
      "Motif worked with honesty and care, turning ideas into clear steps and finished work we could rely on. Communication was steady and decisions were explained with detail, making us confident in the process. They treated our project with seriousness and care, and the support continued after launch. For any founder, this kind of relationship is rare. Motif made us feel like partners with a shared goal, and that trust is why I recommend them for anyone seeking long-term success."
    ],
    name: "Sarah Dhiman",
    position: "Founder",
    company: "Jewelry Amore"
  },
  {
    quote: [
      "The team at Motif was professional, reliable, and always accessible. They helped us navigate complexity with clarity, built technology that worked for both B2B and retail, and guided us through every decision with care. The results exceeded our expectations, improving sales and customer experience at the same time. Their commitment never felt temporary. It felt like they had a real stake in our growth, which is why I consider them an indispensable long-term partner."
    ],
    name: "Alla Ishkirat",
    position: "Founder",
    company: "IDH"
  },
  {
    quote: [
      "Motif has become the partner I trust to deliver outcomes that matter. They respond quickly, handle execution with precision, and keep communication open at every step. Brainstorming is fast, campaigns are sharp, and results speak for themselves. Their ability to simplify the process and keep the team focused has made a huge difference. I know I can reach out anytime with new challenges and they will meet them with clarity and speed. That reliability is rare and valuable."
    ],
    name: "Mohammad Faisal",
    position: "Founder",
    company: "StyleBud"
  },
  {
    quote: [
      "You should definitely work with Motif. I have been in fashion e commerce for many years, and they are among the most professional, flexible, and communicative teams I have ever worked with. Their ability to deliver fast without cutting corners set them apart. They kept the process simple and clear, and every request was handled with precision. It felt like working with a team that understood both urgency and quality, which is exactly what we needed for long-term growth."
    ],
    name: "Esther Chang",
    position: "Co-Founder",
    company: "Tenshoppe"
  },
  {
    quote: [
      "Motif designed more than just a site for us. They created a system that was practical, scalable, and fully aligned with our goals. They anticipated challenges and solved them before they could slow us down, and the documentation made it easy for our team to manage after launch. The impact on sales and customer experience was immediate. What impressed me most was their calm, methodical approach that kept us steady from start to finish. This is a partnership built to last."
    ],
    name: "Collin Gray",
    position: "Founder",
    company: "Fable Beard Co."
  },
  {
    quote: [
      "Motif’s partnership is not optional for us, it has become essential. Their speed of communication, ability to adapt, and focus on outcomes make them stand out in this industry. They handle feedback with clarity and solve problems before they become obstacles. Every time we reach out, they act quickly and decisively. The relationship gives us confidence to take bigger steps, knowing that we have a partner who understands both urgency and strategy. That reliability is why we stay."
    ],
    name: "Marco",
    position: "Head of Ops",
    company: "SCD"
  },
  {
    quote: [
      "My experience with Motif has been consistently positive. They are invested in performance and long-term success, not just short-term wins. Always responsive, they jump into calls, bring thoughtful advice, and work as if they are part of your team. They adapt to budgets and still keep quality high, which makes them a trusted partner at every stage of growth. What impressed me most was their commitment to our outcomes, making the relationship valuable far beyond a project."
    ],
    name: "Jenny Wulace",
    position: "Founder",
    company: "LACE"
  }
];


const RecommandationContact = () => {

    return (
      <section className="layout_normal mt-10 md:mt-20 w-[90%] md:w-[90%] lg:w-[70%]">
        <div className='layout_normal py-6 '>
            <Slider
                navigationCustom={true}
                autoplay={false}
                slides={recommendations.map((el,idx)=><RecommandationCard
                    recommendation={el}
                    key={idx}
                />)}
            />
        </div>
        </section>
    );
};

export default RecommandationContact;