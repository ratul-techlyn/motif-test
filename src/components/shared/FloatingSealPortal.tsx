"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FloatingContactBadge from "./FloatingContactBadge";

const FloatingSealPortal = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<FloatingContactBadge />, document.body);
};

export default FloatingSealPortal;
