"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const positions = ["0% 15%", "18% 35%", "39% 55%", "60% 75%", "80% 100%"];

const CurveChartAnimation = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartSvgRef = useRef<SVGSVGElement | null>(null);
  const pathHighlightRef = useRef<SVGPathElement | null>(null);
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!chartRef.current || !chartSvgRef.current || !pathHighlightRef.current) return;

    gsap.set(chartSvgRef.current, { opacity: 1 });
    gsap.set(pathHighlightRef.current, { drawSVG: "0% 15%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chartRef.current,
        start: "top top",
        end: "+=1000",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * positions.length);

          buttonsRef.current.forEach((btn, i) => {
            btn?.classList.toggle("active", i === index);
          });

          gsap.to(pathHighlightRef.current, {
            drawSVG: positions[index],
            duration: 0.3,
            ease: "power2.inOut",
          });
        },
      },
    });

    tl.from(pathHighlightRef.current, { opacity: 0 })
      .from(
        "#path-full, #path-highlight, #path-complacency-mask",
        {
          attr: { d: "M39 307.126c432 0 514-0 966-0" },
        },
        "<"
      )
      .fromTo(".btn_box.tow .bar", { height: "40px" }, { height: "90px" }, "<")
      .fromTo(".btn_box.three .bar", { height: "40px" }, { height: "250px" }, "<")
      .fromTo(".btn_box.four .bar", { height: "40px" }, { height: "400px" }, "<")
      .fromTo(".btn_box.five .bar", { height: "40px" }, { height: "320px" }, "<");

    const buttons = document.querySelectorAll<HTMLDivElement>(".btn_box");
    buttons.forEach((button, index) => {
      button.addEventListener("mouseenter", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        gsap.to(pathHighlightRef.current, {
          drawSVG: positions[index],
          duration: 0.3,
          ease: "power2.inOut",
        });
      });
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  const buttonData = [
    {
      count: "001",
      title: "Finding fit",
      desc:
        "After you apply to be a partner with MOTIF, one of our brand strategist will jump on a free strategy session...",
    },
    {
      count: "002",
      title: "Roadmapping",
      desc:
        "Based on our previous stage if we will able to help we’ll move to the next stage...",
    },
    {
      count: "003",
      title: "Implementation",
      desc:
        "After shaping the roadmap, we roll up our sleeves for the next step...",
    },
    {
      count: "004",
      title: "Optimization",
      desc:
        "In our first 90 days, we craft, test, and refine. We’re your performance stewards...",
    },
    {
      count: "005",
      title: "On Going Success",
      desc:
        "After the initial 90 days, we regroup to fine-tune our goals...",
    },
  ];

  const btnClass = ["one", "tow", "three", "four", "five"];

  return (
    <section ref={chartRef} className="j_curve_chart_section">
      <div className="content_wrapper">
        <div className="chart_svg">
          <svg
            ref={chartSvgRef}
            id="chart_svg_main"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1044 419"
            fill="none"
          >
            <mask id="complacency-mask">
              <path
                id="path-complacency-mask"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="29"
                d="M39 307.126c432 0 514-628.126 966-42.126"
              />
            </mask>
            <path
              id="path-full"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="29"
              d="M39 307.126c432 0 514-628.126 966-42.126"
            />
            <path
              id="path-highlight"
              ref={pathHighlightRef}
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="29"
              strokeDashoffset="1480"
              strokeDasharray="180 1300"
              mask="url(#complacency-mask)"
              d="M39 307.126c432 0 514-628.126 966-42.126"
            />
          </svg>
        </div>
        <div className="chart_btn_wrapper">
          {buttonData.map((item, i) => (
            <div
              key={item.count}
              className={`btn_box ${btnClass[i]}`}
              ref={(el) => { buttonsRef.current[0] = el; }}
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
    </section>
  );
};

export default CurveChartAnimation;
