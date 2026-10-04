import RecommandationCard from '@/components/shared/Recommandations/RecommandationCard';
import Slider from '@/components/shared/Slider';
import React from 'react';

const recommendations = [
  {
    quote: [
      "We have only continued to raise the bar and grow. Motif’s backing has been key to broadening our growth and increasing brand equity in a busy marketplace. Motif gave us a growth system, not just creative assets. The strategy aligned with our goals, the execution was fast, and the results spoke for themselves. They revolutionized how we manage operations their speed, precision, and ability to anticipate needs is unmatched.",
    ],
    name: "Marco",
    position: "Head Of Ops",
    company: "SCD CROWD"
  },
  {
    quote: [
      "My experience with previous agencies was frustrating. Motif cares deeply about the performance of their work and your long-term success. They aren’t just service providers, they become a part of your team who are responsive, thoughtful, and proactive in offering advice. Every recommendation felt tailored, not generic, and their follow-through was consistent. They’re true long-term partners who show up when it matters most. I would highly recommend them.",
    ],
    name: "Jenny Wulace",
    position: "Founder",
    company: "LACE"
  },
  {
    quote: [
      "This wasn’t a leap of faith. This was our fourth brand with them. What makes Motif indispensable isn’t just their ability to design a stunning website or run high-performing ads though they do both flawlessly. It’s their rare capacity to incubate a brand from nothing and bring it to life with a holistic system. They think beyond execution, weaving strategy, creative, and operations into something sustainable. That’s why we continue to trust them.",
    ],
    name: "Dominik Kubica",
    position: "Founder & CEO",
    company: "DP PARADIS"
  },
  {
    quote: [
      "The MOTIF team was amazing from start to finish. Ash and Nithin were patient and helped us despite last-minute changes, which is rare in this industry. Their responsiveness and professionalism made the whole process seamless, and we are very happy with the website they created. Beyond delivery, they made sure we understood the decisions and future impact, showing care for our long-term growth. Their dedication exceeded expectations at every step.",
    ],
    name: "Mariyam Jahan",
    position: "Co-Founder",
    company: "JAHAN JEWELRY"
  },
  {
    quote: [
      "Motif will deliver above and beyond what they promise. Their flexibility, professionalism, fast execution, and creative mindset made them one of the best teams I’ve worked with. If you’re in fashion e-commerce, I highly recommend them. They don’t just complete tasks, they anticipate challenges and offer solutions you didn’t think of. Their ability to balance speed with quality sets them apart, and the confidence they bring to complex projects is invaluable.",
    ],
    name: "Esther Chang",
    position: "Co-Founder",
    company: "TENSHOPPE"
  }
];



const RecommandationWhyMotif = () => {

    return (
        <div className='layout_normal my-20 w-[90%] md:w-[90%] lg:w-[70%]'>
            <Slider
                navigationCustom={true}
                autoplay={false}
                fade={true}
                slides={recommendations.map((el,idx)=><RecommandationCard
                    recommendation={el}
                    key={idx}
                />)}
            />
        </div>
    );
};

export default RecommandationWhyMotif;