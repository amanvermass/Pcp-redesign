"use client";

import React, { useState, useMemo } from "react";
import { Download, FileText, Search, FileCode, CheckCircle, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProducts } from "@/data/mockProducts";

interface ResourceItem {
  type: "BIM" | "CAD" | "Brochure" | "Specification" | "Certificate";
  name: string;
  size: string;
  productName: string;
  category: string;
}

export default function ResourceCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Flatten mock database downloads
  const allResources: ResourceItem[] = useMemo(() => {
    return mockProducts.flatMap((p) =>
      p.downloads.map((d) => ({
        ...d,
        productName: p.name,
        category: p.category
      }))
    );
  }, []);

  // Filter resources
  const filteredResources = useMemo(() => {
    let result = [...allResources];

    if (searchQuery) {
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      result = result.filter((r) => r.type === selectedType);
    }

    if (selectedCategory !== "all") {
      result = result.filter((r) => r.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedType, selectedCategory, allResources]);

  const getIcon = (type: string) => {
    switch (type) {
      case "BIM":
      case "CAD":
        return <FileCode className="w-5 h-5 text-primary" />;
      case "Certificate":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-10 font-sans bg-background text-foreground">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            <Database className="w-3.5 h-3.5" />
            Downloads & Technical Data
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold font-display">Resource Center</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Access building information modeling (BIM) details, CAD sections, product brochures, and structural safety certificates.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-between p-4 bg-card rounded-none border border-border shadow-sm">
          {/* Search */}
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by drawing title or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-none pl-9 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary outline-none transition-all"
            />
          </div>

          {/* File Format Filter */}
          <div className="bg-white border border-border px-3 py-2 rounded-none text-xs text-left">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-foreground border-none outline-none cursor-pointer w-full pr-4 font-medium"
            >
              <option value="all" className="bg-white text-foreground">All File Formats</option>
              <option value="BIM" className="bg-white text-foreground">BIM Objects (.rfa)</option>
              <option value="CAD" className="bg-white text-foreground">CAD Details (.dwg)</option>
              <option value="Brochure" className="bg-white text-foreground">Brochures & Catalogs</option>
              <option value="Specification" className="bg-white text-foreground">Specifications (.doc)</option>
              <option value="Certificate" className="bg-white text-foreground">Certificates (.pdf)</option>
            </select>
          </div>

          {/* Product Category Filter */}
          <div className="bg-white border border-border px-3 py-2 rounded-none text-xs text-left">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-foreground border-none outline-none cursor-pointer w-full pr-4 font-medium"
            >
              <option value="all" className="bg-white text-foreground">All Categories</option>
              <option value="facade" className="bg-white text-foreground">Facades & Louvers</option>
              <option value="roof" className="bg-white text-foreground">Roofing</option>
              <option value="brick" className="bg-white text-foreground">Facing Bricks</option>
              <option value="paver" className="bg-white text-foreground">Landscape Pavers</option>
            </select>
          </div>
        </div>

        {/* Resources list */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-none space-y-4 bg-card shadow-sm">
            <p className="text-muted-foreground text-sm">No documentation matches your query criteria.</p>
            <button
              onClick={() => {
                setSelectedType("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-none bg-primary hover:bg-brick text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredResources.map((res, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-4 rounded-none border border-border bg-card hover:border-primary/30 transition-all duration-300 text-left shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-none bg-sand/40 border border-border flex items-center justify-center">
                      {getIcon(res.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-primary font-mono uppercase tracking-widest font-semibold">{res.type}</span>
                        <span className="text-[9px] text-muted-foreground font-mono">For: {res.productName}</span>
                      </div>
                      <h4 className="text-xs md:text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs md:max-w-[280px]">
                        {res.name}
                      </h4>
                    </div>
                  </div>

                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-none bg-white border border-border hover:border-primary hover:text-white hover:bg-primary text-xs font-medium text-foreground transition-all cursor-pointer">
                    <Download className="w-4 h-4" />
                    <span>{res.size}</span>
                  </button>
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
