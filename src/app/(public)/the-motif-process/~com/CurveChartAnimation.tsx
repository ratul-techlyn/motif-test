"use client";

import TextAnimation from "@/components/ui/textAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

const positions = ["0% 16%", "18% 36%", "37% 58%", "58% 78%", "78% 100%"];

const buttonData = [
  {
    count: "001",
    title: "Finding fit",
    desc: "After you apply to be a partner with MOTIF, one of our brand strategist will jump on a free strategy session with your key stake holders. We'll dive into your brand, current situations, & goals to help you succeed. If we are a great fit for each others we will move forward.",
  },
  {
    count: "002",
    title: "Roadmapping",
    desc: "Based on our previous stage if we will able to help we'll move to the next stage. We’ll create a one-of-a-kind roadmap and the right strategy with a laser-focused objective. It's designed to be effortlessly embraced, and will start producing tangible results.",
  },
  {
    count: "003",
    title: "Implementation",
    desc: "After shaping the roadmap, we roll up our sleeves for the next step. We'll make your eCommerce marketing look and feel just right, in line with your brand. Plus, we'll put lots of data to work – Google Analytics, heat mapping, and tracking – so you keep getting the best results.",
  },
  {
    count: "004",
    title: "Optimization",
    desc: "In our first 90 days, we craft, test, and refine. We’re your performance stewards, optimizing as we sail. With data in hand, we set revenue goals, aiming for a winning ROI and lasting customer value. We’re a team of strategists, marketers & technologists who are focused on delivering results.",
  },
  {
    count: "005",
    title: "On Going Success",
    desc: "After the initial 90 days, we regroup to fine-tune our goals. We analyze the recent data and collaboratively set revenue targets and marketing budgets by channels. Our aim is to set achievable objectives and work diligently to meet them. We're true partners, committed to maximizing results.",
  },
];

const CurveChartAnimation = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartSvgRef = useRef<SVGSVGElement | null>(null);
  const pathHighlightRef = useRef<SVGPathElement | null>(null);
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (chartRef.current && chartSvgRef.current && pathHighlightRef.current) {
        // Reset initial states - SET PATHS TO FLAT INITIALLY
        gsap.set(pathHighlightRef.current, { drawSVG: "0% 18%" });

        // Set paths to flat line initially
        gsap.set("#path-full, #path-highlight", {
          attr: { d: "M39 307.126c432 0 514-0 966-0" },
        });

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        // Reset bars to initial state
        gsap.set(".btn_box.tow .bar", { height: "40px" });
        gsap.set(".btn_box.three .bar", { height: "40px" });
        gsap.set(".btn_box.four .bar", { height: "40px" });
        gsap.set(".btn_box.five .bar", { height: "40px" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chartRef.current,
            start: "bottom bottom",
            end: "+=1000",
            pin: true,
            // pinType: "fixed",
            anticipatePin: 1,
            pinReparent: true,
            invalidateOnRefresh: true,
            scrub: true,
            toggleActions: "restart none none reverse",
            onUpdate: (self) => {
              const index = Math.floor(self.progress * positions.length);

              if (index <= 4) {
                buttonsRef.current.forEach((btn, i) => {
                  btn?.classList.toggle("active", i === index);
                });

                gsap.to(pathHighlightRef.current, {
                  drawSVG: positions[index],
                  duration: 0.1,
                  ease: "none",
                });
              }
            },
          },
        });

        tl
          .to("#path-full, #path-highlight", {
            morphSVG: "#path-target",
            duration: isMobile ? 0.3 : 0.5,
            ease: "power2.inOut",
          })
          .fromTo(
            ".btn_box.tow .bar",
            { height: "40px" },
            { height: "90px" },
            isMobile ? "<" : "<0.2"
          )
          .fromTo(
            ".btn_box.three .bar",
            { height: "40px" },
            { height: "250px" },
            "<"
          )
          .fromTo(
            ".btn_box.four .bar",
            { height: "40px" },
            { height: "400px" },
            "<"
          )
          .fromTo(
            ".btn_box.five .bar",
            { height: "40px" },
            { height: "320px" },
            "<"
          );

        // Store references to event handlers so they can be removed later
        const buttons = document.querySelectorAll<HTMLDivElement>(".btn_box");
        const handleEnters: ((e: Event) => void)[] = [];

        buttons.forEach((button, index) => {
          const handleEnter = () => {
            buttons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            gsap.to(pathHighlightRef.current, {
              drawSVG: positions[index],
              duration: 0.3,
              ease: "power2.inOut",
            });
          };

          button.addEventListener("mouseenter", handleEnter);
          handleEnters.push(() =>
            button.removeEventListener("mouseenter", handleEnter)
          );
        });

        // Cleanup
        return () => {
          handleEnters.forEach((removeListener) =>
            removeListener(new Event("mouseenter"))
          );
        };
      }
    },
    { scope: chartRef }
  );

  const btnClass = ["one", "tow", "three", "four", "five"];

  return (
    <div
      ref={chartRef}
      className="j_curve_chart_section relative lg:h-[120vh] overflow-hidden"
    >
      <div className="layout_normal relative z-[0] w-[90%] md:w-[90%] lg:w-[70%]">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-xl lg:text-[1.5rem] font-semibold leading-relaxed font-clash">
                <TextAnimation
                  type="fadeUp"
                  splitType="lines, words"
                  animationOn="words"
                  linesClass="overflow-hidden"
                  stagger={0.02}
                >
                  Your "Creative agency" is "Dumb" and Your "Marketing" is
                  "Dull" Motif is neither
                </TextAnimation>
              </h1>
            </div>

            {/* Two Column Text using Flex */}
            <div className="flex flex-col md:flex-row gap-8 text-sm leading-relaxed">
              <div className="flex-1">
                <p className="para1 font-normal">
                  <TextAnimation
                    type="fadeUp"
                    splitType="lines, words"
                    animationOn="words"
                    linesClass="overflow-hidden"
                    stagger={0.005}
                    delay={0.5}
                    duration={0.8}
                  >
                    Motif doesn’t play agency games we build & operate brands
                    like they’re our own. While others push shiny campaigns and
                    buzzwords, we cultivate relationships, grow from the inside
                    out, and scale what actually matters.
                  </TextAnimation>
                </p>
              </div>
              <div className="flex-1">
                <p className="para1 font-normal">
                  <TextAnimation
                    type="fadeUp"
                    splitType="lines, words"
                    animationOn="words"
                    linesClass="overflow-hidden"
                    stagger={0.005}
                    delay={0.5}
                    duration={0.8}
                  >
                    We’re not here to sell. We’re here to grow with strategy,
                    commerce, and expertise that drives meaning, not just
                    revenue. Your brand deserves more than an agency. It
                    deserves a Motif.
                  </TextAnimation>
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex justify-end">
            <div className="text-right">
              <h2 className="text-white text-5xl lg:text-6xl xl:text-[5rem] font-medium font-clash text-right">
                <TextAnimation
                  type="fadeUp"
                  splitType="lines, words"
                  animationOn="words"
                  linesClass="overflow-hidden"
                  stagger={0.02}
                >
                  The
                  <br />
                  In Side-Out
                  <br />
                  Curve
                </TextAnimation>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:absolute lg:left-0 lg:bottom-[-130px] w-full h-auto z-[1]">
        <div className="content_wrapper">
          <div className="chart_svg">
            <svg
              ref={chartSvgRef}
              id="chart_svg_main"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1044 419"
              fill="none"
            >
              {/* <mask id="complacency-mask">
                <path
                  id="path-complacency-mask"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="20"
                  d="M39 307.126c432 0 514-0 966-0"
                  fill="red"
                />
              </mask> */}
              <path
                id="path-target"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
                d="M39 307.126c432 0 514-628.126 966-42.126"
              />
              <path
                id="path-full"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
                d="M39 307.126c432 0 514-0 966-0"
              />
              <path
                id="path-highlight"
                ref={pathHighlightRef}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
                strokeDashoffset="1480"
                strokeDasharray="180 1400"
                mask="url(#complacency-mask)"
                d="M39 307.126c432 0 514-0 966-0"
              />
            </svg>
          </div>
          <div className="chart_btn_wrapper">
            {buttonData.map((item, i) => (
              <div
                key={item.count}
                className={`btn_box ${btnClass[i]} ${i == 0 && "active"}`}
                ref={(el) => {
                  buttonsRef.current[i] = el;
                }}
              >
                <div className="content_card">
                  <div className="bar">
                    <div className="dot" />
                  </div>
                  <h2 className="count">{item.count}</h2>
                  <h2 className="title">
                    <span>{item.title}</span>
                    <span>{item.title}</span>
                  </h2>
                  <p className="pera">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurveChartAnimation;
