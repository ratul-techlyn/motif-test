import TextAnimation from "@/components/ui/textAnimation";
import Image from "next/image";

const para = [
  "You’ve a great brand story and vision? Then you shouldn’t wait   anymore to let the world know. Your brand is a gem waiting to be polished.",
  "From pinpointing the perfect brand voice to crafting a dazzling eCommerce site, we’re here to ensure your Luxury Lifestyle, Fashion, or Beauty DTC Brand sparkles with success.",
  "Through data-driven finesse, powerful creatives and artistic brilliance, we create a masterpiece that’s uniquely yours.",
  "While you focus on delivering the best products and building strong customer relationships!",
];
const TheCommitment = () => {
  return (
    <>
      <h2 className="sr-only">
        Transforming brand visions into iconic experiences — MOTIF®'s commitment to fashion, beauty, and luxury lifestyle brand growth.
      </h2>
      <p className="sr-only">MOTIF® helps early-stage and scaling brands in fashion, beauty, and luxury lifestyle categories unlock their full potential through strategic storytelling, branding, eCommerce design, and customer experience. This commitment combines data-driven strategy, emotional storytelling, and stunning visuals to deliver long-lasting cultural and commercial impact. MOTIF® is not an agency it’s your brand growth partner.</p>

      <section className="layout_normal mt-[5%] lg:mt-64 w-[90%] md:w-[90%] lg:w-[70%] mx-auto px-2"
            aria-label="MOTIF® brand transformation commitment section for fashion, beauty, and lifestyle brands"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="text-typo-primary w-full md:w-[60%] lg:w-[50%] xl:w-[40%]">
            <h5 className="font-helvetica uppercase font-bold text-section_title_sm md:text-section_title_md lg:text-section_title_lg 2xl:text-section_title_2xl mb-4">
              <TextAnimation
                type="fadeUp"
                splitType="words"
                animationOn="words"
              >
                The commitment
              </TextAnimation>
            </h5>
            <h2 className="capitalize overflow-hidden text-section_heading_sm md:text-section_heading_md lg:text-section_heading_lg 2xl:text-section_heading_2xl 3xl:text-[clamp(50px,2.5vw,62px)] font-semibold font-clash leading-[1.2em] ">
              <TextAnimation
                type="fadeUp"
                splitType="lines, words"
                animationOn="words"
                linesClass="overflow-hidden"
                stagger={0}
                duration={1.5}
              >
                Transforming your<br/> visions into iconic<br/> brand experiences
              </TextAnimation>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[33%_67%] lg:grid-cols-[45%_55%] xl:grid-cols-[33%_67%] gap-5 text-typo-primary items-start ">
          <div className="text-[1vw] space-y-6 text-typo-mute">
            <p className="mt-[3vh] sm:mt-[3vh] md:mt-[5vh] text-responsive-para font-helvetica  font-semibold  animate-fade-in leading-[calc(100vw/22)] sm:leading-[calc(100vw/25)] md:leading-[calc(100vw/40)] lg:leading-[1.4]">
              <TextAnimation
                type="fadeUp"
                splitType="lines"
                animationOn="lines"
                linesClass="overflow-hidden"
              >
                Shine, Focus &amp; Connect
              </TextAnimation>
            </p>
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
                    className="mb-[10px] overflow-hidden font-helvetica text-[calc(100vw/24)] sm:text-[calc(100vw/40)] md:text-[calc(100vw/40)] lg:text-[calc(100vw/64)] xl:text-[clamp(1rem,1vw,1.2rem)] font-normal leading-[calc(100vw/22)] sm:leading-[calc(100vw/25)] md:leading-[calc(100vw/40)] lg:leading-[1.4]"
                    key={idx}
                  >
                    <span>{el}</span>
                  </div>
                ))}
              </TextAnimation>
            </div>
          </div>
          <div className="">
            <div className="relative mt-[9vh] lg:mt-0 xl:-mt-[10vh] 2xl:mt-0 mx-auto  overflow-hidden">

              <div className="relative w-[320px] h-[350px] sm:w-[400px] sm:h-[350px] md:w-[500px] md:h-[380px] lg:w-[400px] lg:h-[380px] xl:w-[550px] xl:h-[600px] mx-auto  overflow-hidden">
                <div className="absolute top-[60px] left-[50] md:top-[44px] md:left-[100px] lg:top-[30px] lg:left-[50px] xl:left-[100px] xl:top-[95px] 2xl:left-[100px] 2xl:top-[95px] 3xl:left-[100px] 3xl:top-[95px] 5xl:left-[100px] 5xl:top-[44px] z-10">
                  <div className="animate-spin_slow w-[60px] lg:w-[90px] md:w-[90px] xl:w-[90px] 2xl:w-[90px] 3xl:w-[90px] 5xl:w-[90px] ">
                    <Image
                      src={"/assets/home/Stamp_wht_we_do.webp"}
                      width={200}
                      height={200}
                      alt="MOTIF® brand transformation badge graphic"
                    />
                  </div>
                </div>
                <Image
                  src="/assets/home/shin_focus.png"
                  alt="Luxury brand storytelling visual – MOTIF® commitment section"
                  fill
                  className="object-contain z-0"
                />

                {/* <ImageShaderEffect imageSrc={"/assets/home/shin_focus.png"} /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheCommitment;
