"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CursorContextType = {
  label: string;
  setLabel: (label: string) => void;
  hoveredRect: DOMRect | null;
  setHoveredRect: (rect: DOMRect | null) => void;
};

const CursorContext = createContext<CursorContextType | null>(null);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within CursorProvider");
  return context;
};

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [label, setLabel] = useState("");
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const value = useMemo(
    () => ({ label, setLabel, hoveredRect, setHoveredRect }),
    [label, hoveredRect]
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
};
