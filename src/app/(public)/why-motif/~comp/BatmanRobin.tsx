import React from "react";
import Image from "next/image";
import TextAnimation from "@/components/ui/textAnimation";

const BatmanRobbinImage = {
  batmanLeft: "/assets/why_motif/batman/batman-left.png",
  batmanRight: "/assets/why_motif/batman/batman-right.png",
  batmanRight1: "/assets/why_motif/batman/batman-right1.png",
};
const BatmanRobin = () => {
  return (
    <div>
      <div className=" flex flex-col md:flex-row  justify-between gap-6 md:gap-12 p-2">
        <div className="space-y-8 w-full md:w-1/2">
          <h1 className="text-white text-section_heading_sm md:text-section_heading_md lg:text-section_heading_lg 2xl:text-section_heading_2xl font-clash font-semibold leading-[1.1] mb-[15%]">
            <TextAnimation
              splitType="words, lines"
              animationOn="words"
              type="fadeUp"
              duration={1}
              stagger={0.2}
              linesClass="flex overflow-hidden"
            >
              You&apos;re the &quot;Batman&quot;
              <br />
              We are the &#34;Robin&#34;
              <br /> not an agency!
            </TextAnimation>
          </h1>
          <Image
            className=" w-full"
            src={BatmanRobbinImage.batmanLeft}
            width={500}
            height={500}
            alt="Batman illustration representing the client in MOTIF's partnership model"
          />
        </div>
        <div className="space-y-8 w-full md:w-1/2">
          <div className="flex gap-x-3 md:gap-x-4 w-full lg:mb-[10%] xl:mb-[15%]">
            <Image
              className="w-1/2"
              src={BatmanRobbinImage.batmanRight}
              width={490}
              height={500}
              alt="Robin illustration representing MOTIF as the supportive partner"
            />
            <Image
              className="w-1/2"
              src={BatmanRobbinImage.batmanRight1}
              width={490}
              height={500}
              alt="Dynamic partnership illustration between client and MOTIF agency"
            />
          </div>
          <p className="font-clash text-large_para_sm md:text-large_para_md lg:text-large_para_md xl:text-large_para_xl 2xl:text-large_para_2xl leading-[1.2] font-medium">
            <TextAnimation
              type="fadeUp"
              splitType="lines, words"
              animationOn="words"
              linesClass="overflow-hidden"
              stagger={0.005}
              delay={0.5}
              duration={0.8}
            >
              Motif put their partners in the driver’s seat — Not an agency not
              the typical company we want to be true partner of your journey and
              make a relationship like Robin has with Batman.
            </TextAnimation>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatmanRobin;
