"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Layers, Hammer, BookOpen, Download } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { mockProjects } from "@/data/mockProjects";
import { mockBlogs } from "@/data/mockBlogs";
import Modal from "./ui/Modal";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  // Filter lists based on search
  const filteredProducts = query
    ? mockProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : mockProducts.slice(0, 2);

  const filteredProjects = query
    ? mockProjects.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.architect.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : mockProjects.slice(0, 2);

  const filteredBlogs = query
    ? mockBlogs.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : mockBlogs.slice(0, 2);

  // Collect resources
  const resources = mockProducts.flatMap((p) =>
    p.downloads.map((d) => ({
      ...d,
      productId: p.id,
      productName: p.name
    }))
  );
  
  const filteredResources = query
    ? resources.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : resources.slice(0, 3);

  // Clear query on close
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, projects, articles, resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-none text-foreground placeholder-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm md:text-base font-sans"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-1 mt-4">
          {/* Products Section */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary tracking-widest uppercase mb-2 font-semibold">
                <Hammer className="w-3.5 h-3.5" />
                Products
              </div>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    onClick={onClose}
                    className="flex flex-col p-2.5 rounded-none bg-stone/20 border border-border hover:bg-stone/40 hover:border-primary/30 transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-foreground">{p.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{p.subcategory} • {p.priceEstimate}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary tracking-widest uppercase mb-2 font-semibold">
                <Layers className="w-3.5 h-3.5" />
                Featured Projects
              </div>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.id}`}
                    onClick={onClose}
                    className="flex flex-col p-2.5 rounded-none bg-stone/20 border border-border hover:bg-stone/40 hover:border-primary/30 transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-foreground">{proj.title}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{proj.location} • By {proj.architect} ({proj.year})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {filteredBlogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary tracking-widest uppercase mb-2 font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                Insights & Articles
              </div>
              <div className="space-y-1">
                {filteredBlogs.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/blog/${b.slug}`}
                    onClick={onClose}
                    className="flex flex-col p-2.5 rounded-none bg-stone/20 border border-border hover:bg-stone/40 hover:border-primary/30 transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-foreground">{b.title}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{b.category} • {b.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Resources Section */}
          {filteredResources.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary tracking-widest uppercase mb-2 font-semibold">
                <Download className="w-3.5 h-3.5" />
                Technical Resources
              </div>
              <div className="space-y-1">
                {filteredResources.map((res, i) => (
                  <Link
                    key={i}
                    href="/resources"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-none bg-stone/20 border border-border hover:bg-stone/40 hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground truncate max-w-[320px] md:max-w-[420px]">{res.name}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{res.type} file for {res.productName}</span>
                    </div>
                    <span className="text-xs font-mono bg-sand px-2 py-0.5 rounded-none text-secondary-foreground">{res.size}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 &&
            filteredProjects.length === 0 &&
            filteredBlogs.length === 0 &&
            filteredResources.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm font-sans">
                No matching results found for &ldquo;{query}&rdquo;
              </div>
            )}
        </div>

        {/* Keyboard Helper */}
        <div className="flex items-center justify-between pt-4 border-t border-border text-[10px] md:text-xs text-muted-foreground font-mono">
          <span>Search matches instantly</span>
          <div className="flex items-center gap-1.5">
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
