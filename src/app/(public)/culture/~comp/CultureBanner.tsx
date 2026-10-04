"use client";
import React from "react";

import { TypeAnimation } from "react-type-animation";
const CultureBanner = () => {
  return (
    <div className="layout_normal mt-0 md:mt-12">
      <div className="flex items-center justify-center w-[full] mb-[10%] text-center">
        <span className="uppercase text-2xl md:text-5xl text-white font-bold w-[60%]">
          MOTIF IS NOT OUR BRAND!!!!
          <br />
          IT IS NOT YOUR BRAND, EITHER!!
          <br />
          IT IS THE PROPERTY <br />
          OF{" "}
          <TypeAnimation
            sequence={[
              "Clicker",
              1000,
              "Liker",
              1000,
              "Sharer",
              1000,
              "Tweeter",
              1000,
              "People",
              1000,
            ]}
            speed={50}
            repeat={Infinity}
            className="inline-block text-white"
          />
        </span>
      </div>
    </div>
  );
};

export default CultureBanner;
