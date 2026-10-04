"use client";

import React from "react";

interface GridItem {
  label: string; // Can include <br />
  content: string;
}

interface WhyPartnerBlockProps {
  heading: string; // Can include <br />
  items: GridItem[];
  textColor?: string;
  className?: string;
}

const WhyPartnerBlock: React.FC<WhyPartnerBlockProps> = ({
  heading,
  items,
  textColor = "text-white",
  className = "",
}) => {
  return (
    <section className={`flex justify-center ${className}`}>
      <div className="w-full md:w-[70%] max-w-[1400px] px-6 md:px-0">
        {/* Heading (supports <br />) */}
        <h2
          className={`w-[70%]  text-[2rem] md:text-[3rem] font-clash uppercase mt-12 pb-[5rem] font-medium mb-4 ${textColor}`}
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        {/* Top Divider */}
        <div className="w-full h-[1px] mb-12 bg-gray-700"></div>

        {/* Grid */}
        <div className="flex flex-col">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row gap-x-16 w-full py-6 min-h-[350px]">
                {/* Left: Label (top-aligned) */}
                <div className="md:w-1/2 flex flex-col justify-start">
                  <h4
                    className={`text-xs md:text-2xl uppercase font-clash mt-[10%] font-semibold ${textColor}`}
                    dangerouslySetInnerHTML={{ __html: item.label }}
                  />
                </div>

                {/* Right: Content (vertically centered) */}
                <div className="md:w-1/2 flex items-center">
                  <p className="text-sm md:text-md font-normal text-neutral-400">
                    {item.content}
                  </p>
                </div>
              </div>

              {/* Divider (except last row) */}
              {index !== items.length - 1 && (
                <div className="w-full h-[1px] bg-gray-700"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerBlock;
