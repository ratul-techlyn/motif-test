import { cn } from "@/lib/utils";
import React from "react";

interface GlassoMorphismCardProps {
  title: string;
  description: string;
  numberText?: string;
  className?:string;
  points?:string[];
}

const GlassoMorphismCard: React.FC<GlassoMorphismCardProps> = ({
  title,
  description,
  numberText = "0001",
  points,
  className,
}) => {
  return (
    <div className={cn('relative',className)}>
      <div className="">
        <div
          className={cn(
            `
            w-[40vw]           // Mobile width: 90% of viewport
            h-[22rem]          // Mobile height
            sm:w-[80vw]        // Slightly narrower on small tablets
            md:w-auto md:h-[22rem] // Original styles kick in from md+
            lg:h-[25vw] lg:w-[45vw]
            min-w-[250px]      // Optional: reduce min width for smaller screens
            p-[40px] rounded-xl shadow-lg
            backdrop-blur-[6px] bg-[url("/assets/mask_bg/bg_mask.png")]
            flex flex-col justify-between
            `,
            className
          )}
        >
          <h4 className={`mb-[55px] mb-[75px] w-[200px]  leading-[1.1] font-semibold font-clash text-white
          text-[clamp(26px,1.5vw,26px)]
          sm:text-[clamp(26px,1vw,40px)]
          md:text-[clamp(26px,1vw,44px)]
          lg:text-[clamp(26px,1vw,48px)]
          2xl:text-[clamp(26px,1.5vw,52px)]
          3xl:text-[clamp(26px,2.5vw,53px)]


          `}>
            {title}
          </h4>
          <div>
            <p className="texttext-white/80 text-sm ml-[20px] md:ml-auto w-full md:w-[85%] lg:w-[85%] md:text-sm leading-[1.5] lg:leading-[1.5] font-semibold">
              {description}</p>
              {points && points.length > 0 && (
                <ul className="mt-8 list-none text-white/80 text-sm ml-[20px] md:ml-auto w-full md:w-[85%] md:text-sm leading-[1.5] lg:leading-[1.5] font-normal list-disc">
                {points.map((point, idx) => (
                <li key={idx}>{point}</li>
                ))}
            </ul>
            )}
            
            <div className="h-[4rem] lg:h-[7rem]"></div>
          </div>
          
          <p className="text-[9rem] lg:text-[12vw] font-extrabold absolute -bottom-[3.5rem] sm:-bottom-[3rem] left-1/2 -translate-x-1/2 tracking-normal leading-none text-black opacity-70">
            {numberText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlassoMorphismCard;
