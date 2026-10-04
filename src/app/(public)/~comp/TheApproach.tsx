import TextAnimation from "@/components/ui/textAnimation";
import Image from "next/image";

const para = [
  "We understand the restless nights and gnawing frustration when customer acquisition, retention, and brand differentiation seem like distant dreams!",
  "As an.incubator company, we help DTC & Retail Luxury Lifestyle, Fashion & Beauty brands overcome their challenges by developing targeted marketing strategies, creating unique brand identities, designing personalized experiences to retain customers, providing expert guidance on advertising & brand marketing (offline + digital), and promoting sustainable while ethical practices. Our solutions deliver tangible results and help our clients thrive in a competitive industry.",
  "MOTIF utilizes it’s years of Agency experience to build digitally native brands and flagships while helps them succeed in the Digital Era.",
];
const TheApproach = () => {
  return (
    <section
      data-label="Our Approach"
      className="layout_normal mt-10 lg:mt-64 w-[90%] md:w-[90%] lg:w-[70%] mx-auto px-2"
      aria-label="Strategic brand building approach for fashion, luxury lifestyle, and beauty brands at MOTIF®"
    >
      <h2 className="sr-only">
        How MOTIF® combines strategy, creativity, and commerce to grow fashion, beauty, and lifestyle brands.
      </h2>
      <p className="sr-only">
        MOTIF®'s approach helps luxury lifestyle, fashion, and beauty brands grow through strategic planning, creative marketing, branding, tech, and customer experience design. As a growth partner and incubator, MOTIF® goes beyond traditional agency methods by integrating commerce, design, and storytelling into one cohesive roadmap.
      </p>

      <div className="grid grid-cols-1 gap-5">
        <div className="text-typo-primary w-full md:w-[60%] lg:w-[50%] xl:w-[40%]">
          <h5 className="font-helvetica uppercase font-bold text-section_title_sm md:text-section_title_md lg:text-section_title_lg 2xl:text-section_title_2xl mb-4">
            <TextAnimation splitType="lines" animationOn="lines" type="fadeUp">
              The approach
            </TextAnimation>
          </h5>
          <h2 className="capitalize text-section_heading_sm md:text-section_heading_md lg:text-section_heading_lg 2xl:text-section_heading_2xl 3xl:text-[clamp(50px,2.5vw,68px)] font-semibold font-clash leading-[1.2em] ">
            <TextAnimation
              type="fadeUp"
              splitType="lines, words"
              animationOn="words"
              linesClass="overflow-hidden"
              duration={1.5}
              stagger={0}
            >
              where strategy <br /> meets creativity <br /> to drive impact
            </TextAnimation>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[50%_50%] xl:grid-cols-[40%_60%] gap-5 text-typo-primary ">
        <div className="text-[1vw] space-y-6 text-typo-mute">
          <div className="space-y-4 md:space-y-6">
            <TextAnimation
              type="fadeUp"
              splitType="lines, words"
              animationOn="words"
              linesClass="overflow-hidden"
              stagger={0.005}
              delay={0.5}
              duration={0.8}
            >
              {para.map((el, idx) => (
                <div
                  className="font-helvetica overflow-hidden text-responsive-para font-normal leading-[calc(100vw/22)] sm:leading-[calc(100vw/25)] md:leading-[calc(100vw/40)] lg:leading-[1.4] mt-4"
                  key={idx}
                >
                  <span>{el}</span>
                </div>
              ))}
            </TextAnimation>
          </div>
        </div>
        <div className="">
          <div className="relative mt-[9vh] lg:mt-0  mx-auto  overflow-hidden">
            <div className="relative w-[320px] h-[350px] sm:w-[400px] sm:h-[350px] md:w-[500px] md:h-[380px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[380px] mx-auto  overflow-hidden">
              <div className="absolute bottom-[40px] left-[150px] z-[2] lg:bottom-[40px] lg:left-[150px] md:bottom-[6px] md:left-[220px] xl:bottom-[6px] xl:left-[220px] 2xl:bottom-[6px] 2xl:left-[220px] 3xl:bottom-[6px] 3xl:left-[220px] 5xl:bottom-[6px] 5xl:left-[220px]">
                <div className="animate-spin_slow w-[100px] md:w-[150px] lg:w-[150px] xl:w-[150px] xl:w-[150px] 2xl:w-[150px] 3xl:w-[150px] 3xl:w-[150px] 5xl:w-[150px]">
                  <Image
                    src={"/assets/home/Stamp1.webp"}
                    width={200}
                    height={200}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <Image
              className="object-contain"
              src="/assets/home/what-we-do-word.png"
              fill
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheApproach;
