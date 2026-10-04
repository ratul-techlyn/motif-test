import { ScrollSmootherContext } from "@/context/ScrollSmootherContext";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useContext, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const data = [
  {
    id: 1,
    title: "The Art of Targeting",
    seoContext:
      "Precise audience targeting strategy for DTC fashion and beauty brands",
    titleAriaLabel:
      "The Art of Targeting — Precise audience targeting strategy for DTC fashion and beauty brands",
    descriptionAriaLabel:
      "Our brand strategist and commerce experts join hands to make sure your products reach the right customers with the right messages.",
    description:
      "Our brand strategist and commerce experts join hands to make sure your products reach the right customers with the right messages.",
  },
  {
    id: 2,
    title: "The Craft of Discovery",
    description:
      "We sit with you to conduct in-depth market research to identify your ideal customers and opportunities for your brand to cut through the noise and stand out!",
    seoContext:
      "Customer discovery and market insight for luxury lifestyle and beauty growth",
    titleAriaLabel:
      "The Craft of Discovery — Customer discovery and market insight for luxury lifestyle and beauty growth",
    descriptionAriaLabel:
      "We sit with you to conduct in-depth market research to identify your ideal customers and opportunities for your brand to cut through the noise and stand out!",
  },
  {
    id: 3,
    title: "The Science of Data",
    description:
      "Implementing only the best of time-tested strategies while preserve the authenticity of your brand with solid data at its core, fueled by cutting-edge technology, reflecting the true essence of your story.",
    seoContext:
      "Data-backed decisions for sustainable scaling in fashion, beauty, and lifestyle brands",
    titleAriaLabel:
      "The Science of Data — Data-backed decisions for sustainable scaling in fashion, beauty, and lifestyle brands",
    descriptionAriaLabel:
      "Implementing only the best of time-tested strategies while preserving the authenticity of your brand with solid data at its core, fueled by cutting-edge technology, reflecting the true essence of your story.",
  },
];

const WorkMerger = () => {
  const refText = useRef<HTMLHeadingElement>(null);
  const cardContainer = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (refText.current) {
        const text = new SplitText(refText.current, {
          type: "chars, words, lines",
        });
        const card1 = cardContainer.current?.querySelector(".card-0");
        const card2 = cardContainer.current?.querySelector(".card-1");
        const card3 = cardContainer.current?.querySelector(".card-2");

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: refText.current,
            start: isMobile ? "top center" : "top center-=150",
            pin: true,
            pinType: "fixed",
            anticipatePin: 1,
            pinReparent: true,
            invalidateOnRefresh: true,
            scrub: 2,
            toggleActions: "restart none none reset",
          },
        });

        textTl.from(text.chars, {
          opacity: 0.3,
          duration: 1,
          stagger: 0.1,
        });

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardContainer.current,
            start: "top center-=100",
            pin: true,
            pinType: "fixed",
            anticipatePin: 1,
            pinReparent: true,
            invalidateOnRefresh: true,
            scrub: true,
            toggleActions: "restart none none reset",
          },
        });

        if (card1 && card2 && card3) {
          const title1 = card1.querySelector("h2");
          const title2 = card2.querySelector("h2");
          const title3 = card3.querySelector("h2");
          const description1 = card1.querySelector("p");
          const description2 = card2.querySelector("p");
          const description3 = card3.querySelector("p");

          const titleSplit1 = new SplitText(title1, {
            type: "lines, words, chars",
          });

          const titleSplit2 = new SplitText(title2, {
            type: "lines, words, chars",
          });

          const titleSplit3 = new SplitText(title3, {
            type: "lines, words, chars",
          });

          const descriptionSplit1 = new SplitText(description1, {
            type: "lines, words, chars",
          });

          const descriptionSplit2 = new SplitText(description2, {
            type: "lines, words, chars",
          });

          const descriptionSplit3 = new SplitText(description3, {
            type: "lines, words, chars",
          });

          cardTl
            .from(titleSplit1.words, {
              y: 100,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
            })
            .from(
              descriptionSplit1.lines,
              {
                x: 100,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
              },
              "<"
            )
            .from(titleSplit2.words, {
              y: 100,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
            })
            .from(
              descriptionSplit2.lines,
              {
                x: 100,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
              },
              "<"
            )
            .from(titleSplit3.words, {
              y: 100,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
            })
            .from(
              descriptionSplit3.lines,
              {
                x: 100,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
              },
              "<"
            );
        }
      }
    },
    { scope: refText }
  );

  return (
    <section
      ref={sectionRef}
      className="layout_normal w-[90%] lg:w-[70%] xl:w-[70%] lg:mt-[20%] lg:mb-[10%] md:w-[95%] mt-[30%] mb-[25%] py-10"
      aria-label="MOTIF® strategic growth framework: where brand, product, data, design, and technology converge for fashion, beauty, and luxury lifestyle brands."
    >
      <div ref={refText} className="text-typo-primary pb-20 pin">
        <h2 className="sr-only">
          How MOTIF® merges brand, strategy, design, and technology to grow
          fashion, beauty, and lifestyle brands.
        </h2>
        <h2 className="text-[calc(100vw/15)] md:text-[clamp(1rem,calc(100vw/20),3rem)] lg:text-[clamp(1.5rem,3.5vw,5rem)] font-[600] font-clash leading-[1.2em] [word-spacing:5px] w-[100%] md:w-[70%] lg:w-[85%] xl:w-[clamp(70%,75%,80%)] 2xl:w-[75%] 3xl:w-[75%]">
          Our Work Merges Dynamic Duos — Brand X Product, Strategy X Design,
          Data Analyst X Technologist to Grow Your Brand.
        </h2>
        <p className="sr-only">
          MOTIF® brings together brand strategists, creative designers, product
          experts, and technologists to help fashion, beauty, and luxury
          lifestyle brands scale. Through targeting, discovery, and data-backed
          strategy, this framework helps early-stage and scaling brands achieve
          product-market fit, boost customer experience, and build long-term
          equity. Unlike agencies, MOTIF® operates as a hands-on incubator and
          growth partner.
        </p>
      </div>
      <div
        ref={cardContainer}
        className="grid gird-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-[5%] xl:gap-x-12 gap-y-8 lg:gap-y-4 mt-28 w-full overflow-hidden pin"
      >
        {data.map((el, index) => (
          <article
            key={el.id}
            className={`card-${index}`}
            aria-label={`${el.title}: ${el.seoContext}`}
          >
            <div className="max-w-[400px]">
              <h2
                className="overflow-hidden font-[600] font-clash text-cart_title_sm md:text-cart_title_md lg:text-cart_title_lg 2xl:text-cart_title_2xl 3xl:text-[clamp(20px,1.2vw,32px)] text-typo-primary"
                aria-label={el.titleAriaLabel}
              >
                {el.title}
              </h2>
              <p
                className="mt-[5px] lg:mt-4 text-responsive-para font-normal font-helvetica xl:text-[]"
                aria-label={el.descriptionAriaLabel}
              >
                {el.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkMerger;
