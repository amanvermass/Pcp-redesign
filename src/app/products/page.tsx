"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, Grid, List, Search, ArrowUpDown, Hammer, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProducts } from "@/data/mockProducts";

export default function ProductsPage() {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "strength-desc">("name-asc");
  const [isGridView, setIsGridView] = useState(true);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Derive unique colors
  const allColors = useMemo(() => {
    const colors = new Set<string>();
    mockProducts.forEach((p) => p.colors.forEach((c) => colors.add(c.name)));
    return Array.from(colors);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Search Query
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Color Filter
    if (selectedColor !== "all") {
      result = result.filter((p) => p.colors.some((c) => c.name === selectedColor));
    }

    // Price Filter
    if (selectedPrice !== "all") {
      result = result.filter((p) => p.priceEstimate.includes(selectedPrice));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "strength-desc") {
        // Simple extraction of number
        const strengthA = parseInt(a.compressiveStrength.replace(/[^0-9]/g, "")) || 0;
        const strengthB = parseInt(b.compressiveStrength.replace(/[^0-9]/g, "")) || 0;
        return strengthB - strengthA;
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedColor, selectedPrice, sortBy]);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-8 font-sans bg-background text-foreground">
        {/* Header Text */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1 text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            <Hammer className="w-3.5 h-3.5" />
            Materials Collection
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold">Architectural Catalog</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Explore our curated catalog of terracotta facade panels, sunshade louvers, facing clinkers, and landscaping stones.
          </p>
        </div>

        {/* Toolbar (Search, Grid/List toggle, Sorting) */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-card rounded-none border border-border shadow-sm">
          {/* Search Box */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-none pl-9 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
            {/* Mobile filter button */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-sand/40 rounded-none border border-border text-xs text-foreground cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              Filters
            </button>

            {/* Layout Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-sand/30 border border-border p-1 rounded-none">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-1.5 rounded-none text-muted-foreground hover:text-foreground transition-all cursor-pointer ${
                  isGridView ? "bg-white text-primary border border-border/40 shadow-sm font-semibold" : ""
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-1.5 rounded-none text-muted-foreground hover:text-foreground transition-all cursor-pointer ${
                  !isGridView ? "bg-white text-primary border border-border/40 shadow-sm font-semibold" : ""
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sorting */}
            <div className="relative flex items-center gap-1.5 bg-white border border-border px-3 py-2 rounded-none">
              <ArrowUpDown className="w-4 h-4 text-primary" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name-asc" | "name-desc" | "strength-desc")}
                className="bg-transparent text-xs text-foreground outline-none border-none cursor-pointer pr-4 font-sans font-medium"
              >
                <option value="name-asc" className="bg-white text-foreground">Sort: Name A-Z</option>
                <option value="name-desc" className="bg-white text-foreground">Sort: Name Z-A</option>
                <option value="strength-desc" className="bg-white text-foreground">Sort: Compressive Strength</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid (Filters Sidebar + Main List) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden md:block space-y-6 text-left">
            <div className="pb-4 border-b border-border flex justify-between items-center">
              <h3 className="text-sm font-semibold tracking-widest text-primary uppercase font-mono">Filters</h3>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedColor("all");
                  setSelectedPrice("all");
                  setSearchQuery("");
                }}
                className="text-[10px] text-muted-foreground hover:text-primary transition-all font-mono underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-foreground tracking-wider">Product Categories</h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: "all", label: "All Materials" },
                  { id: "facade", label: "Facade Claddings" },
                  { id: "roof", label: "Clay Roof Tiles" },
                  { id: "brick", label: "Facing Bricks" },
                  { id: "paver", label: "Landscape Pavers" }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`block w-full text-left py-1.5 px-2.5 rounded-none border transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? "bg-primary/10 border-primary/20 text-primary font-semibold"
                        : "border-transparent text-secondary-foreground hover:text-foreground hover:bg-sand/30"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-foreground tracking-wider">Color Tone</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor("all")}
                  className={`px-3 py-1.5 rounded-none border text-[10px] transition-all cursor-pointer ${
                    selectedColor === "all"
                      ? "bg-primary text-white border-primary"
                      : "bg-sand/40 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Colors
                </button>
                {allColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded-none border text-[10px] transition-all cursor-pointer ${
                      selectedColor === col
                        ? "bg-primary text-white border-primary"
                        : "bg-sand/40 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Tier */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-foreground tracking-wider">Investment Level</h4>
              <div className="space-y-1 text-xs">
                {[
                  { id: "all", label: "All Tiers" },
                  { id: "$$ - Premium", label: "$$ - Premium" },
                  { id: "$$$ - Luxury", label: "$$$ - Luxury" },
                  { id: "$$$$ - Super Luxury", label: "$$$$ - Super Luxury" }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedPrice(tier.id)}
                    className={`block w-full text-left py-1.5 px-2.5 rounded-none border transition-all cursor-pointer ${
                      selectedPrice === tier.id
                        ? "bg-primary/10 border-primary/20 text-primary font-semibold"
                        : "border-transparent text-secondary-foreground hover:text-foreground hover:bg-sand/30"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filters drawer (Conditional rendering) */}
          <AnimatePresence>
            {showFiltersMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden col-span-1 p-4 border border-border rounded-none bg-card space-y-6 text-left shadow-sm"
              >
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-sm font-semibold text-primary font-mono uppercase">Filter Panel</span>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedColor("all");
                      setSelectedPrice("all");
                    }}
                    className="text-[10px] font-mono text-muted-foreground underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
                {/* Mobile Categories */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground block">Categories</span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: "all", label: "All" },
                      { id: "facade", label: "Facades" },
                      { id: "roof", label: "Roofing" },
                      { id: "brick", label: "Bricks" },
                      { id: "paver", label: "Pavers" }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-none border text-[10px] transition-all cursor-pointer ${
                          selectedCategory === cat.id ? "bg-primary text-white border-primary" : "bg-sand/40 border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Color Filter */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground block">Colors</span>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setSelectedColor("all")}
                      className={`px-2.5 py-1 rounded-none border text-[9px] cursor-pointer ${
                        selectedColor === "all" ? "bg-primary text-white border-primary" : "bg-sand/40 border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      All Colors
                    </button>
                    {allColors.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-2.5 py-1 rounded-none border text-[9px] cursor-pointer ${
                          selectedColor === col ? "bg-primary text-white border-primary" : "bg-sand/40 border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Listing Main Container */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-none space-y-4 bg-card shadow-sm">
                <p className="text-muted-foreground text-sm">No materials matched your search filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedColor("all");
                    setSelectedPrice("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-none bg-primary hover:bg-brick text-white text-xs font-semibold cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  isGridView
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p) => {
                    if (isGridView) {
                      // GRID CARD VIEW
                      return (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col rounded-none overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-300 group shadow-sm"
                          data-cursor="view"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            />
                            {/* Category Tag */}
                            <span className="absolute top-3 left-3 bg-darksec px-2 py-0.5 text-[9px] font-mono tracking-widest text-white border border-darksec rounded-none uppercase font-semibold">
                              {p.category}
                            </span>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                            <div className="space-y-1.5">
                              <span className="text-[9px] text-muted-foreground font-mono tracking-widest uppercase">{p.subcategory}</span>
                              <h4 className="text-base font-display text-foreground font-medium group-hover:text-primary transition-colors leading-snug line-clamp-1">
                                {p.name}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {p.description}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-border flex items-center justify-between">
                              {/* Swatch dots */}
                              <div className="flex gap-1">
                                {p.colors.map((c, i) => (
                                  <span
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-none border border-border"
                                    style={{ backgroundColor: c.hex }}
                                    title={c.name}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] text-primary font-mono tracking-wide font-semibold">{p.priceEstimate}</span>
                            </div>

                            <Link
                              href={`/products/${p.id}`}
                              className="block w-full py-2 bg-sand/40 border border-border hover:border-primary hover:bg-primary hover:text-white rounded-none text-center text-xs font-semibold transition-all duration-300 text-foreground"
                            >
                              View Specs
                            </Link>
                          </div>
                        </motion.div>
                      );
                    } else {
                      // LIST VIEW CARD
                      return (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col sm:flex-row gap-6 p-4 rounded-none border border-border bg-card hover:border-primary/30 transition-all duration-300 text-left group shadow-sm"
                          data-cursor="view"
                        >
                          <div className="relative w-full sm:w-44 aspect-[4/3] sm:aspect-square rounded-none overflow-hidden bg-sand flex-shrink-0 border border-border">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="bg-darksec border border-darksec px-2 py-0.5 text-[9px] font-mono tracking-widest text-white rounded-none uppercase font-semibold">
                                  {p.category}
                                </span>
                                <span className="text-[9px] text-muted-foreground font-mono tracking-widest uppercase">{p.subcategory}</span>
                              </div>
                              <h4 className="text-lg font-display text-foreground font-medium group-hover:text-primary transition-colors">
                                {p.name}
                              </h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {p.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border">
                              <div className="flex gap-4 text-xs font-mono">
                                <div>
                                  <span className="text-muted-foreground font-semibold">Compressive Strength:</span>
                                  <span className="text-foreground ml-1.5 font-medium">{p.compressiveStrength}</span>
                                </div>
                                <div className="hidden md:block">
                                  <span className="text-muted-foreground font-semibold">Eco Label:</span>
                                  <span className="text-foreground ml-1.5 font-medium">{p.sustainabilityRating}</span>
                                </div>
                              </div>
                              <Link
                                href={`/products/${p.id}`}
                                className="px-5 py-2 bg-primary hover:bg-brick text-white text-xs font-semibold rounded-none transition-colors"
                              >
                                View Specs
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
