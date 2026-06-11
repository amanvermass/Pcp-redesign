"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  tabClassName?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  tabClassName
}: TabsProps) {
  return (
    <div
      className={cn(
        "flex gap-6 border-b border-border bg-transparent rounded-none p-0",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative py-3 px-1 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 text-muted-foreground hover:text-foreground outline-none cursor-pointer",
              isActive && "text-primary hover:text-primary",
              tabClassName
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
