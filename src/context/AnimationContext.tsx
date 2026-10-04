"use client";
import { gsap } from "@/lib/gsap";
import React, { createContext, useContext, useMemo, useRef, useState } from "react";

type AnimationContextType = {
  hasLoadedAnimationFinished: boolean;
  hasPageTransitionFinished: boolean;
  setHasLoadedAnimationFinished: (value: boolean) => void;
  setHasPageTransitionFinished: (value: boolean) => void;
  timeline: React.MutableRefObject<gsap.core.Timeline | null>;
  isBot: boolean;
  setIsBot: (value: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasLoadedAnimationFinished, setHasLoadedAnimationFinished] =
    useState(false);
  const [hasPageTransitionFinished, setHasPageTransitionFinished] =
    useState(false);
  const [isBot, setIsBot] = useState(false);

  // Create the timeline once (a non-lazy useRef initialiser would build a new one every render)
  const timeline = useRef<gsap.core.Timeline | null>(null);
  if (timeline.current === null) {
    timeline.current = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out", duration: 0.8 },
    });
  }

  const value = useMemo(
    () => ({
      isBot,
      setIsBot,
      hasLoadedAnimationFinished,
      hasPageTransitionFinished,
      setHasLoadedAnimationFinished,
      setHasPageTransitionFinished,
      timeline,
    }),
    [isBot, hasLoadedAnimationFinished, hasPageTransitionFinished]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      "useAnimationContext must be used within <AnimationProvider>"
    );
  }
  return context;
};

export const useAnimationComplete = () => {
  const {
    hasLoadedAnimationFinished,
    hasPageTransitionFinished,
    isBot,
    setIsBot,
    setHasLoadedAnimationFinished,
    setHasPageTransitionFinished,
  } = useAnimationContext();

  return {
    hasLoadedAnimationFinished,
    hasPageTransitionFinished,
    isBot,
    setIsBot: (value: boolean) => {
      setIsBot(value);
    },
    setAnimationComplete: (complete: boolean) => {
      setHasLoadedAnimationFinished(complete);
      setHasPageTransitionFinished(complete);
    },
  };
};
