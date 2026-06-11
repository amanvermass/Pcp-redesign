"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ArchitectContextType {
  isArchitectMode: boolean;
  toggleArchitectMode: () => void;
  region: string;
  setRegion: (region: string) => void;
}

const ArchitectContext = createContext<ArchitectContextType | undefined>(undefined);

export function ArchitectProvider({ children }: { children: React.ReactNode }) {
  const [isArchitectMode, setIsArchitectMode] = useState(false);
  const [region, setRegion] = useState("Global (EN)");

  useEffect(() => {
    const savedMode = localStorage.getItem("pcp_architect_mode");
    const savedRegion = localStorage.getItem("pcp_region");
    if (savedMode === "true") setIsArchitectMode(true);
    if (savedRegion) setRegion(savedRegion);
  }, []);

  const toggleArchitectMode = () => {
    setIsArchitectMode((prev) => {
      const next = !prev;
      localStorage.setItem("pcp_architect_mode", String(next));
      return next;
    });
  };

  const handleSetRegion = (newRegion: string) => {
    setRegion(newRegion);
    localStorage.setItem("pcp_region", newRegion);
  };

  return (
    <ArchitectContext.Provider value={{ isArchitectMode, toggleArchitectMode, region, setRegion: handleSetRegion }}>
      {children}
    </ArchitectContext.Provider>
  );
}

export function useArchitectMode() {
  const context = useContext(ArchitectContext);
  if (!context) {
    return {
      isArchitectMode: false,
      toggleArchitectMode: () => {},
      region: "Global (EN)",
      setRegion: () => {}
    };
  }
  return context;
}
