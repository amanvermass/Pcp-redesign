"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Zap, RefreshCw, Compass, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/components/ui/Carousel";
import Modal from "@/components/ui/Modal";
import { mockProducts, Product } from "@/data/mockProducts";
import { mockProjects } from "@/data/mockProjects";
import { mockBlogs } from "@/data/mockBlogs";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "facade" | "roof" | "brick" | "paver">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Statistics counters simulation
  const [stats, setStats] = useState({ years: 0, projects: 0, efficiency: 0 });
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        years: Math.floor((120 / steps) * currentStep),
        projects: Math.floor((850 / steps) * currentStep),
        efficiency: Math.floor((35 / steps) * currentStep)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats({ years: 120, projects: 850, efficiency: 35 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const filteredProducts = activeCategory === "all"
    ? mockProducts
    : mockProducts.filter((p) => p.category === activeCategory);

  // Testimonial Cards for Carousel
  const testimonials = [
    {
      quote: "Aura's terracotta cladding completely transformed our design for the Aero Sunshade Tower. Their mechanical tolerances and custom glazes are unmatched globally.",
      author: "Richard Rogers",
      role: "Lead Architect, WOHA Partners",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The roman-format handmade bricks from Aura have a physical weight and organic texture that grounds our residential estate. It catches the Alpine shadows beautifully.",
      author: "Christine Kaufmann",
      role: "Principal, H&deM Studio",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Achieving Cradle-to-Cradle certification on our roofing assemblies was direct and simple using Zenith's flat clay roof tiles. Outstanding sustainability standards.",
      author: "Dr. Helena Schmidt",
      role: "Director of Passive Projects, Munich Green Lab",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const testimonialElements = testimonials.map((t, idx) => (
    <div key={idx} className="bg-card p-8 md:p-12 rounded-none max-w-3xl border border-border text-center space-y-6 mx-4 shadow-sm">
      <p className="text-lg md:text-xl font-display text-foreground leading-relaxed italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center justify-center gap-3">
        <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-none object-cover border-2 border-primary" />
        <div className="text-left">
          <h4 className="text-sm font-semibold text-foreground">{t.author}</h4>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <Navbar />

      <main className="space-y-32 bg-background text-foreground">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10 border-b border-border">
          {/* Subtle architectural background grids */}
          <div className="absolute inset-0 z-0 bg-[#FAF8F5]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(74,44,29,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,44,29,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5" />
                Monumental Architectural Materials
              </div>
              <h1 className="heading-premium text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                Designing for <br />
                <span className="text-primary">
                  Generations.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-secondary-foreground leading-relaxed max-w-xl">
                Experience high-performance, circular clay facade claddings, handmade masonry facing bricks, and double-interlocking storm-proof clay tiles crafted for sustainable luxury designs.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-none bg-primary hover:bg-brick text-white text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Explore Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-visualizer"
                  className="px-6 py-3 rounded-none border border-brown hover:bg-brown/5 text-brown text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-primary" />
                  Facade Visualizer
                </Link>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-border max-w-lg">
                <div>
                  <h3 className="text-3xl font-display font-semibold text-primary">{stats.years}+</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-1">Years Heritage</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-semibold text-foreground">{stats.projects}+</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-1">Global Projects</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-semibold text-foreground">{stats.efficiency}%</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-1">HVAC Offset</p>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Cards over high-end Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-none overflow-hidden shadow-xl border border-border">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Modern architectural cladding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darksec/60 via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 md:-left-12 max-w-[280px] p-5 rounded-none bg-card border border-border shadow-lg space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">Passive Durability</h4>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Clay panels offer natural Class A1 fire protection and require zero washing or repainting routines.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* INSPIRATION GALLERY (Pinterest-style Masonry) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="subheading-monochrome">Architecture Inspiration</h2>
            <h3 className="heading-premium text-3xl md:text-4xl text-foreground font-semibold">A Pinterest-Style Masonry Showcase</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Filter and view raw textures, clay baguettes, clinker blockwork, and geometric roofing forms across global landmarks.
            </p>
          </div>

          {/* Filtering */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: "all", label: "All Items" },
              { id: "facade", label: "Facades & Louvers" },
              { id: "roof", label: "Roof Systems" },
              { id: "brick", label: "Facing Bricks" },
              { id: "paver", label: "Ground Pavers" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as "all" | "facade" | "roof" | "brick" | "paver")}
                className={`px-4 py-2 rounded-none text-xs font-medium border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-primary text-white border-primary"
                    : "bg-sand/40 border-border text-muted-foreground hover:text-foreground hover:bg-sand/70 hover:border-primary/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedProduct(p)}
                  className="break-inside-avoid relative rounded-none overflow-hidden border border-border group cursor-pointer shadow-md"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-darksec/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 text-left">
                    <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-semibold">{p.subcategory}</span>
                    <h4 className="text-base font-display text-white mt-1 flex items-center justify-between">
                      {p.name}
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* FEATURED PROJECTS (Horizontal scrolling) */}
        <section className="bg-secondary border-y border-border py-24 space-y-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-4 text-left">
              <h2 className="subheading-monochrome">Featured Projects</h2>
              <h3 className="heading-premium text-3xl md:text-4xl text-foreground font-semibold">Landmarks Built With Aura Materials</h3>
            </div>
            <Link
              href="/projects"
              className="text-sm text-primary hover:text-brick flex items-center gap-1.5 transition-colors font-semibold"
            >
              View All Architectural Profiles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal Gallery */}
          <div className="flex gap-8 overflow-x-auto px-4 md:px-12 pb-6 scrollbar-thin scrollbar-thumb-stone scrollbar-track-transparent">
            {mockProjects.map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                className="flex-shrink-0 w-80 md:w-[480px] rounded-none overflow-hidden border border-border hover:border-primary/30 bg-card p-4 transition-all duration-300 group shadow-sm"
              >
                <div className="relative aspect-[16/10] rounded-none overflow-hidden border border-border">
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="mt-4 space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] text-primary font-mono tracking-widest uppercase font-semibold">
                    <span>{proj.location}</span>
                    <span>{proj.year}</span>
                  </div>
                  <h4 className="text-lg font-display text-foreground font-medium group-hover:text-primary transition-colors">{proj.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{proj.description}</p>
                  <div className="pt-2 border-t border-border flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span>Designed by:</span>
                    <span className="font-semibold text-foreground">{proj.architect}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SUSTAINABILITY SECTION (Interactive timeline) */}
        <section id="sustainability" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
          <div className="space-y-4">
            <h2 className="subheading-monochrome">Circular Journey</h2>
            <h3 className="heading-premium text-3xl md:text-4xl text-foreground font-semibold">Closed Loop Manufacturing Timeline</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Our commitment is structured on zero-landfill packaging, clean fuel sourcing, and end-of-life material crushing.
            </p>
          </div>

          {/* Sustainability Timeline */}
          <div className="relative border-l border-border text-left pl-6 md:pl-10 space-y-12 max-w-3xl mx-auto">
            {[
              {
                step: "01",
                title: "Responsible Clay Sourcing",
                desc: "100% of our clay matrix is quarried within a 50km radius of the processing hubs, eliminating high logistics emissions and preserving local ecosystems.",
                Icon: Zap
              },
              {
                step: "02",
                title: "Carbon-Offset Firing Process",
                desc: "We run high-efficiency kilns using clean bio-methane fuel, cutting factory exhaust greenhouse levels by 40% compared to legacy wood/coal firing.",
                Icon: RefreshCw
              },
              {
                step: "03",
                title: "Dry-Fix Mechanical Fastening",
                desc: "We engineer tiles and cladding for mechanical dry-clipping. No mortar residue is introduced, guaranteeing 100% clean recycling elements at decommissioning.",
                Icon: ShieldCheck
              }
            ].map((item, idx) => {
              const IconComp = item.Icon;
              return (
                <div key={idx} className="relative space-y-2 group">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[35px] md:-left-[51px] w-6 h-6 rounded-none bg-background border-2 border-primary flex items-center justify-center text-[10px] font-mono text-primary font-bold shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {item.step}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <IconComp className="w-5 h-5 text-primary" />
                    <h4 className="text-lg font-display text-foreground font-medium">{item.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="subheading-monochrome">Client Endorsements</h2>
            <h3 className="heading-premium text-3xl text-foreground font-semibold">Architectural Partnerships</h3>
          </div>
          <Carousel items={testimonialElements} autoPlay={true} />
        </section>

        {/* LATEST ARTICLES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-4 text-left">
              <h2 className="subheading-monochrome">Aura Bulletin</h2>
              <h3 className="heading-premium text-3xl text-foreground font-semibold font-display">Insights & Building Tech</h3>
            </div>
            <Link
              href="/blog"
              className="text-sm text-primary hover:text-brick flex items-center gap-1.5 transition-colors font-semibold"
            >
              Browse All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockBlogs.slice(0, 3).map((b) => (
              <Link
                key={b.slug}
                href={`/blog/${b.slug}`}
                className="flex flex-col rounded-none overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-300 group shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] text-primary font-mono tracking-widest uppercase font-semibold">{b.category}</span>
                    <h4 className="text-base font-display text-foreground font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {b.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span>{b.date}</span>
                    <span>{b.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* QUICK PREVIEW DIALOG MODAL */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-none overflow-hidden border border-border">
              <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-4 text-left">
              <div>
                <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-semibold">{selectedProduct.subcategory}</span>
                <p className="text-sm text-secondary-foreground leading-relaxed mt-2">{selectedProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs border-y border-border py-4">
                <div>
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="block font-medium text-foreground mt-0.5">{selectedProduct.dimensions}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Compressive Strength:</span>
                  <span className="block font-medium text-foreground mt-0.5">{selectedProduct.compressiveStrength}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Coverage:</span>
                  <span className="block font-medium text-foreground mt-0.5">{selectedProduct.coverage}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Eco Cert:</span>
                  <span className="block font-medium text-foreground mt-0.5">{selectedProduct.sustainabilityRating}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/products/${selectedProduct.id}`}
                  className="flex-1 py-2.5 rounded-none bg-primary hover:bg-brick text-white text-center text-xs font-semibold tracking-wide transition-colors"
                >
                  View Full Specifications
                </Link>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-2.5 rounded-none border border-brown hover:bg-brown/5 text-brown text-center text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
}
