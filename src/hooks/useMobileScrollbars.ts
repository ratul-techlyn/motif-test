'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Enhanced device detection - supports both mobile and universal detection
 */
const detectDeviceUniversal = (universal: boolean = false): boolean => {
  if (universal) {
    // Universal mode - apply to all devices
    return true;
  }

  // Mobile-only mode - existing logic
  const userAgent = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Check screen size
  const isMobileScreen = window.innerWidth <= 768 && window.innerHeight <= 1024;

  // Check touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return isMobileUA || (isMobileScreen && hasTouch);
};

/**
 * Platform-specific detection
 */
const detectPlatform = (): 'ios' | 'android' | 'other' => {
  const userAgent = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios';
  }

  if (/Android/.test(userAgent)) {
    return 'android';
  }

  return 'other';
};

/**
 * Hook for managing scrollbar visibility across all devices
 * @param options Configuration options
 */
interface UseMobileScrollbarsOptions {
  /** Whether to automatically apply scrollbar hiding */
  autoApply?: boolean;
  /** Target element selector (defaults to body) */
  target?: string;
  /** Custom class name to apply */
  className?: string;
  /** Whether to preserve scrolling functionality */
  preserveScrolling?: boolean;
  /** Whether to apply to all devices (not just mobile) */
  universal?: boolean;
}

export const useMobileScrollbars = (options: UseMobileScrollbarsOptions = {}) => {
  const {
    autoApply = true,
    target = 'body',
    className = 'hide-scrollbars',
    preserveScrolling = true,
    universal = false
  } = options;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');
  const [isApplied, setIsApplied] = useState<boolean>(false);

  // Detect device and platform
  const detectDevice = useCallback((): boolean => {
    const active = detectDeviceUniversal(universal);
    const devicePlatform = detectPlatform();

    setIsActive(active);
    setPlatform(devicePlatform);

    return active;
  }, [universal]);

  // Apply scrollbar hiding
  const applyScrollbarHiding = useCallback(() => {
    if (!isActive || !autoApply) return;

    const element = target === 'body' ? document.body : document.querySelector(target);
    if (!element) return;

    // Apply appropriate class based on platform
    const classesToApply = [className];

    if (platform === 'ios') {
      classesToApply.push('ios-hide-scrollbars');
    } else if (platform === 'android') {
      classesToApply.push('android-hide-scrollbars');
    }

    // Add classes
    element.classList.add(...classesToApply);

    // Add smooth scrolling if preserving functionality
    if (preserveScrolling) {
      const htmlElement = element as HTMLElement;
      if (!htmlElement.style.overflow) {
        htmlElement.style.overflow = 'auto';
      }
      if (!(htmlElement.style as any).webkitOverflowScrolling) {
        (htmlElement.style as any).webkitOverflowScrolling = 'touch';
      }
    }

    setIsApplied(true);
  }, [isActive, platform, autoApply, target, className, preserveScrolling]);

  // Remove scrollbar hiding
  const removeScrollbarHiding = useCallback(() => {
    const element = target === 'body' ? document.body : document.querySelector(target);
    if (!element) return;

    const classesToRemove = [className, 'ios-hide-scrollbars', 'android-hide-scrollbars'];
    element.classList.remove(...classesToRemove);
    setIsApplied(false);
  }, [target, className]);

  // Toggle scrollbar hiding
  const toggleScrollbarHiding = useCallback((force?: boolean) => {
    if (force === true || (force === undefined && !isApplied)) {
      applyScrollbarHiding();
    } else {
      removeScrollbarHiding();
    }
  }, [isApplied, applyScrollbarHiding, removeScrollbarHiding]);

  // Setup effect
  useEffect(() => {
    // Initial detection
    detectDevice();

    // Apply on mount if auto-apply is enabled
    if (autoApply) {
      applyScrollbarHiding();
    }

    // Setup resize listener for responsive behavior
    const handleResize = () => {
      const wasActive = isActive;
      const active = detectDevice();

      // If active status changed, update accordingly
      if (wasActive !== active) {
        if (active && autoApply) {
          applyScrollbarHiding();
        } else if (!active) {
          removeScrollbarHiding();
        }
      }
    };

    // Setup orientation change listener
    const handleOrientationChange = () => {
      setTimeout(() => {
        detectDevice();
        if (autoApply) {
          applyScrollbarHiding();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      removeScrollbarHiding();
    };
  }, [detectDevice, autoApply, applyScrollbarHiding, removeScrollbarHiding, isActive]);

  return {
    isActive,
    platform,
    isApplied,
    applyScrollbarHiding,
    removeScrollbarHiding,
    toggleScrollbarHiding,
    detectDevice
  };
};

/**
 * Simple hook for basic mobile scrollbar hiding
 */
export const useHideMobileScrollbars = () => {
  return useMobileScrollbars({ autoApply: true });
};

/**
 * Hook for conditional mobile scrollbar hiding
 */
export const useConditionalMobileScrollbars = (condition: boolean) => {
  return useMobileScrollbars({ autoApply: condition });
};

/**
 * Universal scrollbar hiding hook - works on all devices
 * @param options Configuration options
 */
interface UseUniversalScrollbarsOptions {
  /** Whether to automatically apply scrollbar hiding */
  autoApply?: boolean;
  /** Target element selector (defaults to body) */
  target?: string;
  /** Custom class name to apply (defaults to hide-scrollbars) */
  className?: string;
  /** Whether to preserve scrolling functionality */
  preserveScrolling?: boolean;
}

export const useUniversalScrollbars = (options: UseUniversalScrollbarsOptions = {}) => {
  return useMobileScrollbars({
    ...options,
    universal: true,
    className: options.className || 'universal-hide-scrollbars'
  });
};

/**
 * Simple hook for universal scrollbar hiding
 */
export const useHideScrollbars = () => {
  return useUniversalScrollbars({ autoApply: true });
};

/**
 * Hook for conditional universal scrollbar hiding
 */
export const useConditionalScrollbars = (condition: boolean) => {
  return useUniversalScrollbars({ autoApply: condition });
};