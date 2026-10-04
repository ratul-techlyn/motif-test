import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const EASE = CustomEase.create("ease", "0.25, 1, 0.5, 1");

gsap.defaults({
  ease: EASE,
  duration: 0.8,
});

gsap.config({
  autoSleep: 60,
});

export { gsap };

