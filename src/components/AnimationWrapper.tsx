"use client";
import { useAnimationComplete } from "@/context/AnimationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CursorDot from "./cursor/CursorDot";
import CursorLabel from "./cursor/CursorLabel";
import LoadingAnimation from "./loading-animation";
import FloatingSealPortal from "./shared/FloatingSealPortal";
import TopBar from "./shared/Navbar/TopBar";
import Footer from "./shared/footer/Footer";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const forceScrollReset = () => {
  try {
    ScrollSmoother.get()?.scrollTo(0, true);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.getElementById("smooth-wrapper")?.scrollTo({ top: 0 });
  } catch (e) {
    console.warn("[forceScrollReset] failed:", e);
  }
};

interface Props {
  children: React.ReactNode;
  isBot: Boolean;
}

export default function AnimationWrapper({ children, isBot }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const gsapContextRef = useRef<gsap.Context | null>(null);

  const [showLoading, setShowLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const {
    hasLoadedAnimationFinished,
    hasPageTransitionFinished,
    setAnimationComplete,
    setIsBot,
  } = useAnimationComplete();

  const isMobile = useIsMobile();

  // Initialize ScrollSmoother and animations after loading completes
  const initializeScrollSmoother = () => {
    if (gsapContextRef.current) {
      gsapContextRef.current.revert(); // Clean up previous context
    }

    gsapContextRef.current = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: scrollContainerRef.current,
        smooth: 1.2, // Reduced from 1.5 for better performance
        smoothTouch: 0.05, // Reduced for snappier touch response
        effects: true,
      });

      window.dispatchEvent(new Event("smoother-ready"));
      forceScrollReset();
      ScrollTrigger.refresh();

      const sections =
        scrollContainerRef.current?.querySelectorAll("section") || [];

      sections.forEach((section) => {
        // Add GPU acceleration hints before animation
        section.style.willChange = "transform, opacity";
        section.style.backfaceVisibility = "hidden";
        section.style.transform = "translateZ(0)"; // Force GPU acceleration

        gsap.fromTo(
          section,
          { opacity: 0, y: 30 }, // Reduced y offset for smoother animation
          {
            opacity: 1,
            y: 0,
            duration: 0.8, // Reduced from 1s for snappier response
            ease: "power2.out",
            force3D: true, // Force GPU acceleration
            scrollTrigger: {
              trigger: section,
              start: "top 85%", // Adjusted trigger point
              end: "top 60%", // Adjusted end point
              scrub: 0.5, // Reduced scrub for better performance
              invalidateOnRefresh: true, // Better performance on resize
            },
          }
        );
      });
    }, scrollContainerRef);
  };

  // Initial setup
  useEffect(() => {
    setIsClient(true);
    // Check if BotAwareWrapper has already handled the loading animation
    const botWrapperHandled = sessionStorage.getItem("botWrapperHandled");

    if (botWrapperHandled === "true" || isBot) {
      setShowLoading(false);
      setAnimationComplete(true);
    } else {
      const hasVisited = localStorage.getItem("hasVisitedMotif");
      if (hasVisited) {
        setShowLoading(false);
        setAnimationComplete(true);
      } else {
        setShowLoading(true);
      }
    }
    setIsBot(isBot as boolean);
  }, [hasLoadedAnimationFinished, hasPageTransitionFinished, isBot]);

  // Initialize ScrollSmoother only after loading animation completes
  useEffect(() => {
    if (isClient && hasLoadedAnimationFinished && !showLoading) {
      // Immediate initialization for better performance
      const timeout = setTimeout(() => {
        initializeScrollSmoother();
      }, 25); // Reduced from 50ms to 25ms for immediate response

      return () => clearTimeout(timeout);
    }
  }, [
    isClient,
    hasLoadedAnimationFinished,
    hasPageTransitionFinished,
    showLoading,
  ]);

  // Handle route changes
  useEffect(() => {
    if (hasLoadedAnimationFinished && !showLoading) {
      const resetScroll = setTimeout(() => {
        forceScrollReset();
        ScrollTrigger.refresh();
      }, 10); // Reduced from 25ms to 10ms for faster response
      return () => clearTimeout(resetScroll);
    }
  }, [
    pathname,
    hasLoadedAnimationFinished,
    hasPageTransitionFinished,
    showLoading,
  ]);

  // Handle body overflow
  useEffect(() => {
    if (isClient) {
      if (hasLoadedAnimationFinished && !showLoading) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
    }
  }, [
    hasLoadedAnimationFinished,
    hasPageTransitionFinished,
    isClient,
    showLoading,
  ]);

  // Handle loading animation completion
  const handleLoadingComplete = () => {
    setShowLoading(false);
    setAnimationComplete(true);
    localStorage.setItem("hasVisitedMotif", "true");
    // Mark that AnimationWrapper handled the loading animation
    try {
      sessionStorage.setItem("animationWrapperHandled", "true");
    } catch {
      console.warn('Failed to set sessionStorage flag');
    }
  };

  // Clean up on unmount
  useEffect(() => {
    // enableGlobalAnimationClass();
    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
      }
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {!isBot && showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <TopBar />
      <div className="bg-primary w-full min-h-screen text-typo-mute font-Clash">
        <FloatingSealPortal />
        <div
          id="smooth-wrapper"
          className="bg-primary max-w-full overflow-x-hidden"
        >
          <div ref={scrollContainerRef} className="bg-primary">
            <div className="pt-10">{children}</div>
            <Footer />
          </div>
        </div>
        {!showLoading && !isMobile && (
          <>
            <CursorLabel />
            <CursorDot />
          </>
        )}
      </div>
    </>
  );
}
