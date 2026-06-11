"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown, Cpu, Calculator, MapPin, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "./CommandPalette";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  // Handle Cmd+K / Ctrl+K keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
  }, [pathname]);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Projects", href: "/projects" },
    { name: "Inspiration", href: "/inspiration" },
    { name: "Resources", href: "/resources" }
  ];

  const toolsDropdown = [
    { name: "AI Facade Visualizer", href: "/ai-visualizer", icon: Cpu, desc: "Simulate claddings & brick layouts in real-time" },
    { name: "AI Product Finder", href: "/ai-finder", icon: Cpu, desc: "Interactive recommendation wizard" },
    { name: "Material Calculators", href: "/calculator", icon: Calculator, desc: "Calculate brick, paver, roof tile & cost estimates" },
    { name: "Dealer Locator", href: "/dealers", icon: MapPin, desc: "Find show galleries & partners worldwide" }
  ];

  const secondaryLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group flex items-center gap-2">
                <span className="w-8 h-8 rounded-none bg-primary flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:scale-105 transition-transform duration-300">A</span>
                <span className="font-display text-xl tracking-widest text-foreground group-hover:text-primary transition-colors duration-300">AURA</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                    pathname === link.href ? "text-primary font-semibold" : "text-secondary-foreground"
                  }`}
                >
                  {navLinks.find((nl) => nl.href === link.href)?.name}
                </Link>
              ))}

              {/* Tools Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen("tools")}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                    pathname.startsWith("/ai-") || pathname === "/calculator" || pathname === "/dealers"
                      ? "text-primary font-semibold"
                      : "text-secondary-foreground"
                  }`}
                >
                  Interactive Tools
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen === "tools" ? "transform rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen === "tools" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 rounded-none bg-white p-4 shadow-xl border border-border z-50 text-left"
                    >
                      <div className="grid gap-3">
                        {toolsDropdown.map((tool) => {
                          const IconComp = tool.icon;
                          return (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="flex gap-3 p-2.5 rounded-none hover:bg-sand/30 border border-transparent hover:border-border transition-all duration-300 group"
                            >
                              <div className="w-9 h-9 rounded-none bg-sand/40 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{tool.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => null)}
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                    pathname === link.href ? "text-primary font-semibold" : "text-secondary-foreground"
                  }`}
                >
                  {secondaryLinks.find((sl) => sl.href === link.href)?.name}
                </Link>
              ))}
            </div>

            {/* Search, Admin Panel, & Menu buttons */}
            <div className="flex items-center gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-none bg-sand/30 border border-border hover:border-primary/20 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                aria-label="Search site (Cmd+K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline text-[10px] font-mono tracking-widest text-muted-foreground group-hover:text-primary/70">CMD+K</span>
              </button>

              {/* Admin Panel Quick Link */}
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-none border border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-semibold tracking-wide transition-all duration-300"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin Console
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-none border border-border bg-sand/30 text-muted-foreground hover:text-primary"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#FAF8F5] border-b border-border overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4 text-left">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-base font-medium py-2 border-b border-border ${
                      pathname === link.href ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Tools Submenu */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground py-1">Interactive Tools</div>
                  <div className="grid grid-cols-2 gap-2">
                    {toolsDropdown.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="p-2.5 rounded-none bg-stone/20 border border-border hover:border-primary/20 text-xs font-semibold text-foreground flex flex-col gap-1"
                      >
                        <span>{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-base font-medium py-2 border-b border-border ${
                      pathname === link.href ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Admin Link */}
                <Link
                  href="/admin"
                  className="flex items-center justify-center gap-2 p-3 rounded-none border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Admin Console
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to push content below sticky header */}
      <div className="h-20" />

      {/* Command Palette Modal */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
