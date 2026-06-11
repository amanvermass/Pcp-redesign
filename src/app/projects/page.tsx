"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Layers, MapPin, User, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProjects } from "@/data/mockProjects";
import { mockProducts } from "@/data/mockProducts";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<string>("all");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Derive unique countries and products
  const countries = useMemo(() => {
    return Array.from(new Set(mockProjects.map((p) => p.country)));
  }, []);

  // Filter logic
  const filteredProjects = useMemo(() => {
    let result = [...mockProjects];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.architect.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedCountry !== "all") {
      result = result.filter((p) => p.country === selectedCountry);
    }

    if (selectedProduct !== "all") {
      result = result.filter((p) => p.productsUsed.includes(selectedProduct));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedCountry, selectedProduct]);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-10 font-sans bg-background text-foreground">
        
        {/* Header Text */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            <Layers className="w-3.5 h-3.5" />
            Architectural Showcases
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold">Monumental Projects</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Explore global case studies featuring high-performance clay panels, engineered roof systems, and paving designs.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-card rounded-none border border-border shadow-sm">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, architect, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-none pl-9 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-sand/40 rounded-none border border-border text-xs text-foreground cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              Filter Showcases
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-3">
              {/* Country Select */}
              <div className="bg-white border border-border px-3 py-2 rounded-none text-xs">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-transparent text-foreground border-none outline-none cursor-pointer pr-4 font-sans font-medium"
                >
                  <option value="all" className="bg-white text-foreground">All Countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-white text-foreground">{c}</option>
                  ))}
                </select>
              </div>

              {/* Product Select */}
              <div className="bg-white border border-border px-3 py-2 rounded-none text-xs">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="bg-transparent text-foreground border-none outline-none cursor-pointer max-w-[150px] pr-4 font-sans font-medium"
                >
                  <option value="all" className="bg-white text-foreground">All Materials</option>
                  {mockProducts.map((p) => (
                    <option key={p.id} value={p.id} className="bg-white text-foreground">{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {showFiltersMobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden p-4 border border-border rounded-none bg-card space-y-4 text-left shadow-sm"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Country</span>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-white border border-border rounded-none p-2 text-xs text-foreground font-medium"
                  >
                    <option value="all" className="bg-white text-foreground">All</option>
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-white text-foreground">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Used Material</span>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-white border border-border rounded-none p-2 text-xs text-foreground font-medium"
                  >
                    <option value="all" className="bg-white text-foreground">All Materials</option>
                    {mockProducts.map((p) => (
                      <option key={p.id} value={p.id} className="bg-white text-foreground">{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category quick selectors */}
        <div className="flex gap-2 justify-start overflow-x-auto pb-2">
          {[
            { id: "all", label: "All Structures" },
            { id: "Commercial", label: "Commercial Towers" },
            { id: "Residential", label: "Residential Estates" },
            { id: "Institutional", label: "Institutional & Civic" },
            { id: "Hospitality", label: "Hospitality & Resorts" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-none text-xs font-semibold border shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-primary text-white border-primary"
                  : "bg-sand/40 border-border text-muted-foreground hover:text-foreground hover:bg-sand/70 hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Listing Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-none space-y-4 bg-card shadow-sm">
            <p className="text-muted-foreground text-sm">No landmarks matched your selection criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedCountry("all");
                setSelectedProduct("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-none bg-primary hover:bg-brick text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-none overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-300 group flex flex-col justify-between text-left shadow-sm"
                  data-cursor="view"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand border-b border-border">
                    <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-darksec px-3 py-1 text-[10px] font-mono tracking-widest text-white border border-darksec rounded-none uppercase font-semibold shadow-sm">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{proj.location}, {proj.country}</span>
                      </div>
                      <h3 className="text-xl font-display text-foreground font-semibold leading-tight group-hover:text-primary transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span>By {proj.architect} ({proj.year})</span>
                      </div>

                      <Link
                        href={`/projects/${proj.id}`}
                        className="px-4 py-2 bg-sand/40 border border-border hover:border-primary hover:bg-primary hover:text-white rounded-none text-xs font-semibold flex items-center gap-1.5 text-foreground transition-all cursor-pointer"
                      >
                        Explore Case Profile
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
