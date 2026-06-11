"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown, Cpu, Calculator, MapPin, ArrowRight, Globe, Check, BookOpen, Image, ShieldAlert, Newspaper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "./CommandPalette";
import { cn } from "@/lib/utils";
import { useArchitectMode } from "@/providers/ArchitectProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isArchitectMode, toggleArchitectMode, region, setRegion } = useArchitectMode();

  // Scroll listener to toggle transparent/solid background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Primary nav — clean, minimal
  const primaryLinks = [
    { name: "Products", href: "/products", hasMega: true },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // "More" dropdown items — everything else lives here
  const moreItems = [
    { name: "AI Facade Visualizer", href: "/ai-visualizer", icon: Cpu, desc: "Simulate claddings & brick layouts" },
    { name: "Material Calculator", href: "/calculator", icon: Calculator, desc: "Quantity & cost estimation" },
    { name: "Dealer Locator", href: "/dealers", icon: MapPin, desc: "Find partners worldwide" },
    { name: "Inspiration", href: "/inspiration", icon: Image, desc: "Gallery & design references" },
    { name: "Resources", href: "/resources", icon: BookOpen, desc: "Technical downloads & specs" },
    { name: "Blog", href: "/blog", icon: Newspaper, desc: "Insights & building tech" },
  ];

  // Transparent header overlay is allowed on Home and Project Details pages
  const isTransparentAllowed = pathname === "/" || pathname.startsWith("/projects/");
  const isSolid = scrolled || !isTransparentAllowed;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isSolid
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-3"
            : "bg-transparent py-5 border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-none bg-primary flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:scale-105 transition-transform duration-300">P</span>
                <span className={cn(
                  "font-display text-xl tracking-widest transition-colors duration-300 group-hover:text-primary",
                  isSolid ? "text-foreground" : "text-white"
                )}>PCP</span>
              </Link>
            </div>

            {/* Desktop Navigation — Clean & Minimal */}
            <div className="hidden md:flex items-center gap-1">
              {primaryLinks.map((link) => {
                if (link.hasMega) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen("products")}
                      onMouseLeave={() => setDropdownOpen(null)}
                    >
                      <button
                        className={cn(
                          "flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-primary cursor-pointer px-4 py-2",
                          pathname.startsWith("/products")
                            ? "text-primary"
                            : (isSolid ? "text-foreground" : "text-white/90 hover:text-white")
                        )}
                      >
                        {link.name}
                        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", dropdownOpen === "products" ? "rotate-180" : "")} />
                      </button>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {dropdownOpen === "products" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute left-1/2 -translate-x-1/2 mt-1 w-[80vw] max-w-3xl bg-card p-6 shadow-xl border border-border z-50 text-left grid grid-cols-4 gap-6 rounded-none"
                          >
                            {/* Col 1 */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-1">Facade Panels</h4>
                              <ul className="space-y-2.5">
                                <li>
                                  <Link href="/products/terracotta-linear-1" className="block hover:text-primary transition-colors">
                                    <span className="text-xs font-semibold text-foreground block hover:text-primary">Linear Terracotta</span>
                                    <span className="text-[9px] text-muted-foreground block mt-0.5 leading-normal">Breathable clay rainscreen panels</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/products/glazed-louver-2" className="block hover:text-primary transition-colors">
                                    <span className="text-xs font-semibold text-foreground block hover:text-primary">Aero Louver Baguettes</span>
                                    <span className="text-[9px] text-muted-foreground block mt-0.5 leading-normal">Vitrified glazed sunshades</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            {/* Col 2 */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-1">Roof Systems</h4>
                              <ul className="space-y-2.5">
                                <li>
                                  <Link href="/products/heritage-pantile-1" className="block hover:text-primary transition-colors">
                                    <span className="text-xs font-semibold text-foreground block hover:text-primary">Monarch Clay Shingle</span>
                                    <span className="text-[9px] text-muted-foreground block mt-0.5 leading-normal">Deep wave double-locking pantiles</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/products/flat-slate-roof-2" className="block hover:text-primary transition-colors">
                                    <span className="text-xs font-semibold text-foreground block hover:text-primary">Zenith Flat Slate</span>
                                    <span className="text-[9px] text-muted-foreground block mt-0.5 leading-normal">Monolithic slate-like roof shingles</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            {/* Col 3 */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-1">Architectural Bricks</h4>
                              <ul className="space-y-2.5">
                                <li>
                                  <Link href="/products/handmade-longformat-1" className="block hover:text-primary transition-colors">
                                    <span className="text-xs font-semibold text-foreground block hover:text-primary">Romanesque Longformat</span>
                                    <span className="text-[9px] text-muted-foreground block mt-0.5 leading-normal">Elongated handmade linear bricks</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/products/engineered-clinker-2" className="block hover:text-primary transition-colors">
                                    <span className="text-xs font-semibold text-foreground block hover:text-primary">Vanguard Clinker Bricks</span>
                                    <span className="text-[9px] text-muted-foreground block mt-0.5 leading-normal">High-strength dense industrial masonry</span>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            {/* Col 4 (Featured) */}
                            <div className="bg-sand p-4 border border-border flex flex-col justify-between">
                              <div className="space-y-2">
                                <span className="text-[9px] text-primary font-mono uppercase tracking-wider block">Featured</span>
                                <h4 className="text-xs font-bold text-foreground">Tudor Rust Handmade</h4>
                                <p className="text-[10px] text-muted-foreground leading-normal">
                                  Organic clay bounds molded by hand for linear facades.
                                </p>
                              </div>
                              <Link
                                href="/products"
                                className="inline-flex items-center gap-1 text-[10px] text-primary font-mono uppercase tracking-wider hover:text-brick transition-colors font-bold mt-4"
                              >
                                View Full Catalog
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-primary px-4 py-2",
                      pathname === link.href
                        ? "text-primary"
                        : (isSolid ? "text-foreground" : "text-white/90 hover:text-white")
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* More Dropdown — houses tools, resources, etc. */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen("more")}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-primary cursor-pointer px-4 py-2",
                    isSolid ? "text-foreground" : "text-white/90 hover:text-white"
                  )}
                >
                  More
                  <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", dropdownOpen === "more" ? "rotate-180" : "")} />
                </button>

                <AnimatePresence>
                  {dropdownOpen === "more" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-1 w-72 rounded-none bg-card p-3 shadow-xl border border-border z-50 text-left"
                    >
                      <div className="space-y-1">
                        {moreItems.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-sand/50 transition-all duration-200 group"
                            >
                              <IconComp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                              <div>
                                <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-border my-2" />

                      {/* Architect Mode & Region — tucked here */}
                      <div className="px-3 py-2 space-y-3">
                        <button
                          onClick={toggleArchitectMode}
                          className={cn(
                            "w-full flex items-center justify-between py-2 px-3 text-xs font-semibold transition-all cursor-pointer border",
                            isArchitectMode
                              ? "bg-primary border-primary text-white"
                              : "bg-sand/30 border-border text-foreground hover:border-primary/20"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <Cpu className={cn("w-3.5 h-3.5", isArchitectMode ? "text-white" : "text-primary")} />
                            Architect Mode
                          </span>
                          <span className="text-[9px] uppercase tracking-wider opacity-70">
                            {isArchitectMode ? "ON" : "OFF"}
                          </span>
                        </button>

                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-mono uppercase tracking-wider">
                            <Globe className="w-3 h-3 text-primary" />
                            Region
                          </span>
                          <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="bg-transparent border border-border px-2 py-1 text-[10px] text-foreground font-semibold cursor-pointer outline-none focus:border-primary"
                          >
                            {["Global (EN)", "Americas (EN)", "Europe (DE)", "Asia Pacific (EN)", "India (EN)"].map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Admin link */}
                      <div className="border-t border-border mt-2 pt-2 px-3 pb-1">
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 py-2 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Admin Console
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side — Search + Mobile toggle only */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "px-4 py-2.5 rounded-none transition-all duration-300 flex items-center gap-2.5 group cursor-pointer",
                  isSolid
                    ? "bg-sand/30 border border-border hover:border-primary/20 hover:bg-primary/5 text-muted-foreground hover:text-primary"
                    : "bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white/70 hover:text-white"
                )}
                aria-label="Search site (Cmd+K)"
              >
                <Search className="w-[18px] h-[18px]" />
                <span className={cn(
                  "text-xs font-medium tracking-wide transition-colors duration-300",
                  isSolid ? "text-muted-foreground group-hover:text-primary" : "text-white/70 group-hover:text-white"
                )}>Search</span>
                <span className={cn(
                  "hidden sm:inline text-[10px] font-mono tracking-wider px-1.5 py-0.5 border transition-colors duration-300",
                  isSolid
                    ? "border-border text-muted-foreground/60 group-hover:border-primary/30 group-hover:text-primary"
                    : "border-white/20 text-white/50 group-hover:border-white/40 group-hover:text-white/80"
                )}>⌘K</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "md:hidden p-2 rounded-none border cursor-pointer transition-all duration-300",
                  isSolid
                    ? "border-border bg-sand/30 text-muted-foreground hover:text-primary"
                    : "border-white/20 bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                )}
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
              <div className="px-5 pt-2 pb-6 space-y-1 text-left">
                {/* Primary Links */}
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block text-sm font-medium py-3 border-b border-border/50",
                      pathname === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Tools & Resources */}
                <div className="pt-4 pb-2">
                  <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">Tools & Resources</p>
                  <div className="space-y-1">
                    {moreItems.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          <IconComp className="w-4 h-4 text-muted-foreground" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Architect Mode & Admin */}
                <div className="pt-3 border-t border-border space-y-3">
                  <button
                    onClick={toggleArchitectMode}
                    className={cn(
                      "w-full flex items-center justify-between py-2.5 px-3 text-xs font-semibold transition-all cursor-pointer border",
                      isArchitectMode
                        ? "bg-primary border-primary text-white"
                        : "bg-sand/30 border-border text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Cpu className={cn("w-3.5 h-3.5", isArchitectMode ? "text-white" : "text-primary")} />
                      Architect Mode
                    </span>
                    <span className="text-[9px] uppercase tracking-wider opacity-70">
                      {isArchitectMode ? "ON" : "OFF"}
                    </span>
                  </button>

                  <Link
                    href="/admin"
                    className="flex items-center gap-2 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Admin Console
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
