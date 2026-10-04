"use client";
import { useAnimationContext } from "@/context/AnimationContext";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const FloatingSealEntrance = ({ children, className = "" }: Props) => {
  const { hasLoadedAnimationFinished, hasPageTransitionFinished } =
    useAnimationContext();
  const [visible, setVisible] = useState(false);

  const testOverride = true; // ⏱ for dev preview

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y > 400);
    };

    if (
      testOverride ||
      (hasLoadedAnimationFinished && hasPageTransitionFinished)
    ) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // run on mount
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasLoadedAnimationFinished, hasPageTransitionFinished]);

  return (
    <div
      ref={useRef(null)}
      className={`fixed ${className} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

export default FloatingSealEntrance;
