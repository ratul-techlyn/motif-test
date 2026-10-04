import RecommandationCard from '@/components/shared/Recommandations/RecommandationCard';
import Slider from '@/components/shared/Slider';
import { usePathname } from 'next/navigation';
import React from 'react';

const recommendations = [
  {
    quote: [
      "They don’t build pieces of a puzzle. They architect the whole thing. For DP Paradis, the stakes were higher and the brand needed to be deeply experiential, visually magnetic, and operationally tight. Motif didn’t just understand that, they anticipated it. They guided us through every step, aligned with our vision, and built a foundation that continues to shape the brand’s future."
    ],
    name: "Dominik Kubica",
    position: "Founder & CEO",
    company: "DP PARADIS"
  },
  {
    quote: [
      "Motif’s branding strategy opened up new markets for us. They provided an all-encompassing solution to elevate our business, not just a surface-level presence. Their holistic approach continues to drive measurable results. Every campaign feels intentional, every execution is tied to long-term goals, and the level of dedication has consistently exceeded what we expected."
    ],
    name: "Marco & Dominik Kubica",
    position: "Head Of Ops & Founder",
    company: "SCD"
  },
  {
    quote: [
      "Motif is able to work with companies of any size. They help small companies grow and elevate large brands even further. Their flexibility and willingness to tailor solutions to our goals set them apart. What stood out was how personally invested they were, ensuring every decision made sense for our business. They remain a partner we trust with our brand’s growth and reputation."
    ],
    name: "Jenny Wulace",
    position: "Founder",
    company: "LACE"
  },
  {
    quote: [
      "MOTIF built a digital ecosystem that feels intuitive, immersive, and true to our identity. They transformed our customer journey into a movement, turning everyday supporters into passionate advocates. Their ability to merge design with strategy gave us results beyond aesthetics. The site became a living brand experience that customers return to with loyalty and pride."
    ],
    name: "Cory",
    position: "Founder",
    company: "FABLE"
  },
  {
    quote: [
      "We have a fully functioning site, delivered cost-effectively, at high quality, with excellent design and functionality. MOTIF’s turnaround time was fast, their communication clear, and every request was met with care. Beyond delivery, they made sure we understood the reasoning behind choices and how they would affect future growth. Their approach is reliable and inspiring."
    ],
    name: "Esther Chang",
    position: "Co-Founder",
    company: "TENSHOPPE"
  },
  {
    quote: [
      "Motif’s level of dedication and personalized care was truly incredible. The team was professional, reliable, and always accessible throughout the project. Their work exceeded expectations and directly boosted our sales. They delivered everything on time and brought a hands-on, committed approach to our success. Their involvement felt like that of a true business partner."
    ],
    name: "Alla Ishkirat",
    position: "Founder",
    company: "IHD"
  },
  {
    quote: [
      "Motif provides the perfect balance of professionalism and creativity. They completely captured what we were looking for and executed with high attention to detail. Their communication and support made the entire process smooth. What impressed us most was how genuine and good-natured the team is. They cared about delivering success as much as we did, which built real trust."
    ],
    name: "Sara Dhiman",
    position: "Founder",
    company: "Jewelry Amore"
  }
];



const RecommandationWhatDo = () => {
  const path = usePathname();
    return (
        <div className='mx-auto mt-20 '>
            <Slider
                key={path}
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

export default RecommandationWhatDo;