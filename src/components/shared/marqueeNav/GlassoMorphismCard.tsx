import { cn } from "@/lib/utils";
import React from "react";

interface GlassoMorphismCardProps {
  title: string;
  description: string;
  numberText?: string;
  className?: string;
}

const GlassoMorphismCard: React.FC<GlassoMorphismCardProps> = ({
  title,
  description,
  numberText = "0001",
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="">
        <div
          className={cn(
            `
            w-[40vw]           // Mobile width: 90% of viewport
            h-[22rem]          // Mobile height
            sm:w-[80vw]        // Slightly narrower on small tablets
            md:w-auto md:h-[22rem] // Original styles kick in from md+
            lg:h-[22vw] lg:w-[22vw]
            min-w-[250px]      // Optional: reduce min width for smaller screens
            p-[40px] rounded-xl shadow-lg
            backdrop-blur-[20px]
            flex flex-col justify-between
            relative
            `,
            className
            // backdrop-blur-[6px] bg-[url("/assets/mask_bg/bg_mask.png")]
          )}
        >
          <div
            className={`w-full h-full absolute top-0 left-0 opacity-30 bg-[url("/assets/mask_bg/bg_mask.png")]`}
          ></div>
          <h4
            className={`mb-[55px] mb-[75px] w-[200px]  leading-[1.1] font-semibold font-clash text-white
          text-[clamp(26px,1.5vw,26px)]
          sm:text-[clamp(26px,1vw,40px)]
          md:text-[clamp(26px,1vw,44px)]
          lg:text-[clamp(26px,1vw,48px)]
          2xl:text-[clamp(26px,1.5vw,52px)]
          3xl:text-[clamp(26px,2.5vw,53px)]


          `}
          >
            {title}
          </h4>
          <div>
            <p className="text-white/80 text-sm ml-[20px] md:ml-auto w-full md:w-[75%] md:text-sm leading-[1.5] lg:leading-[1.5] font-normal">
              {description}
            </p>
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
