import { createContext } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export const ScrollSmootherContext = createContext<{ smoother: ScrollSmoother | null }>({
    smoother: null,
});
