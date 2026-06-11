"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Zap, RefreshCw, Compass, ArrowRight, ShieldCheck, Cpu, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/components/ui/Carousel";
import Modal from "@/components/ui/Modal";
import { mockProducts, Product } from "@/data/mockProducts";
import { mockProjects } from "@/data/mockProjects";
import { mockBlogs } from "@/data/mockBlogs";

// Global reference project pins for the world map
const globalPins = [
  { id: "gp1", x: 20, y: 38, city: "New York", country: "USA", project: "Hudson Yards Terracotta Envelope", materials: "Linear Cladding Panels", year: 2024 },
  { id: "gp2", x: 14, y: 52, city: "São Paulo", country: "Brazil", project: "Ibirapuera Cultural Pavilion", materials: "Handmade Facing Bricks", year: 2023 },
  { id: "gp3", x: 47, y: 30, city: "London", country: "UK", project: "King's Cross Courtyard Blocks", materials: "Wire-cut Facing Bricks", year: 2025 },
  { id: "gp4", x: 50, y: 28, city: "Berlin", country: "Germany", project: "Mitte Residential Complex", materials: "Glazed Terracotta Louvers", year: 2024 },
  { id: "gp5", x: 55, y: 25, city: "Stockholm", country: "Sweden", project: "Södermalm Passive House", materials: "Insulating Facade Bricks", year: 2025 },
  { id: "gp6", x: 54, y: 36, city: "Dubai", country: "UAE", project: "Palm Jumeirah Villa Estate", materials: "Desert Clay Pavers", year: 2024 },
  { id: "gp7", x: 72, y: 40, city: "Mumbai", country: "India", project: "Bandra Arts District", materials: "Heritage Terracotta Tiles", year: 2023 },
  { id: "gp8", x: 80, y: 44, city: "Singapore", country: "Singapore", project: "Marina Bay Cultural Centre", materials: "Baguette Sunscreens", year: 2025 },
  { id: "gp9", x: 88, y: 56, city: "Sydney", country: "Australia", project: "Barangaroo Tower Facade", materials: "Platinum Glazed Louvers", year: 2024 },
  { id: "gp10", x: 85, y: 34, city: "Tokyo", country: "Japan", project: "Shibuya Ceramic Residence", materials: "Micro-Format Clay Bricks", year: 2025 },
  { id: "gp11", x: 49, y: 32, city: "Paris", country: "France", project: "La Défense Office Tower", materials: "Premium Cladding Panels", year: 2024 },
  { id: "gp12", x: 53, y: 46, city: "Nairobi", country: "Kenya", project: "Karen Eco-Lodge", materials: "Compressed Earth Blocks", year: 2023 },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "facade" | "roof" | "brick" | "paver">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

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
      quote: "PCP's terracotta cladding completely transformed our design for the Aero Sunshade Tower. Their mechanical tolerances and custom glazes are unmatched globally.",
      author: "Richard Rogers",
      role: "Lead Architect, WOHA Partners",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The roman-format handmade bricks from Prayag Clay Production have a physical weight and organic texture that grounds our residential estate. It catches the Alpine shadows beautifully.",
      author: "Christine Kaufmann",
      role: "Principal, H&deM Studio",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Achieving Cradle-to-Cradle certification on our roofing assemblies was direct and simple using PCP's flat clay roof tiles. Outstanding sustainability standards.",
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
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-border">
          {/* Background image & dark cinematic overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
              alt="Premium Clay Architecture"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5" />
                Prayag Clay Production (PCP)
              </div>
              <h1 className="heading-premium text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white">
                Premium Brick Solutions <br />
                <span className="text-primary">
                  For Modern Architecture.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-sand/85 leading-relaxed max-w-xl">
                Experience high-performance clay facade claddings, handmade masonry facing bricks, and double-interlocking storm-proof tiles crafted by Prayag Clay Production for luxury international structures.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-none bg-primary hover:bg-brick text-white text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 shadow-sm cursor-pointer"
                  data-cursor="magnetic"
                >
                  Explore Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-visualizer"
                  className="px-6 py-3 rounded-none border border-stone/30 hover:bg-white/5 text-white text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 cursor-pointer"
                  data-cursor="magnetic"
                >
                  <Cpu className="w-4 h-4 text-primary" />
                  Facade Visualizer
                </Link>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-lg">
                <div>
                  <h3 className="text-3xl font-display font-semibold text-primary">{stats.years}+</h3>
                  <p className="text-[10px] text-sand/60 uppercase tracking-widest font-mono mt-1">Years Heritage</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-semibold text-white">{stats.projects}+</h3>
                  <p className="text-[10px] text-sand/60 uppercase tracking-widest font-mono mt-1">Global Projects</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-semibold text-white">{stats.efficiency}%</h3>
                  <p className="text-[10px] text-sand/60 uppercase tracking-widest font-mono mt-1">HVAC Offset</p>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Premium Details card */}
            <div className="lg:col-span-5 relative flex items-center justify-end">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full max-w-[320px] p-6 rounded-none bg-black/40 border border-white/15 backdrop-blur-md shadow-2xl space-y-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-primary/20 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-xs font-semibold text-white">Passive Durability</h4>
                </div>
                <p className="text-[11px] text-sand/80 leading-relaxed">
                  Clay panels offer natural Class A1 fire protection and require zero washing or repainting routines. Engineered for a lifespan of over 150 years.
                </p>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-sand/60">
                  <span>SPECIFICATION</span>
                  <span className="text-primary">Cradle to Cradle</span>
                </div>
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
                  data-cursor="explore"
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
              <h3 className="heading-premium text-3xl md:text-4xl text-foreground font-semibold">Landmarks Built With PCP Materials</h3>
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
                data-cursor="view"
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

        {/* GLOBAL REFERENCE MAP */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="subheading-monochrome">Global Footprint</h2>
            <h3 className="heading-premium text-3xl md:text-4xl text-foreground font-semibold">Reference Projects Worldwide</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              PCP materials are specified by architects and builders across 6 continents. Explore our global project references.
            </p>
          </div>

          {/* Interactive SVG Map */}
          <div className="relative bg-darksec border border-white/10 p-6 md:p-10 overflow-hidden">
            {/* SVG World Map */}
            <svg
              viewBox="0 0 100 60"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world continents */}
              {/* North America */}
              <path d="M5,15 L8,12 L12,10 L18,10 L24,12 L26,16 L28,22 L26,28 L22,32 L18,34 L16,38 L14,36 L10,34 L8,30 L6,24 L5,20 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* South America */}
              <path d="M16,38 L18,36 L22,38 L24,42 L22,48 L20,54 L18,58 L14,56 L12,50 L14,44 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* Europe */}
              <path d="M44,12 L48,10 L52,10 L56,12 L56,18 L54,22 L50,26 L48,28 L44,26 L42,22 L42,16 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* Africa */}
              <path d="M42,28 L48,28 L54,30 L56,36 L56,44 L54,50 L50,54 L46,52 L42,46 L40,38 L42,32 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* Asia */}
              <path d="M56,10 L62,8 L70,10 L78,12 L86,14 L88,20 L86,28 L82,32 L76,36 L70,38 L64,36 L58,32 L56,26 L56,18 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* India subcontinent */}
              <path d="M66,36 L72,34 L76,38 L74,44 L70,46 L66,42 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* Southeast Asia / Indonesia */}
              <path d="M76,38 L82,36 L86,40 L84,44 L78,44 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* Australia */}
              <path d="M82,48 L90,46 L96,50 L94,56 L88,58 L82,56 L80,52 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />
              {/* Japan */}
              <path d="M84,24 L86,22 L88,24 L88,30 L86,32 L84,28 Z" fill="#2A2A2A" stroke="#444" strokeWidth="0.15" />

              {/* Grid lines (subtle latitude/longitude) */}
              {[15, 30, 45].map((y) => (
                <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} stroke="#333" strokeWidth="0.05" strokeDasharray="0.5,0.5" />
              ))}
              {[25, 50, 75].map((x) => (
                <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="60" stroke="#333" strokeWidth="0.05" strokeDasharray="0.5,0.5" />
              ))}

              {/* Project Pins */}
              {globalPins.map((pin, idx) => (
                <g
                  key={pin.id}
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse ring */}
                  <circle cx={pin.x} cy={pin.y} r="1.2" fill="none" stroke="#A14F2A" strokeWidth="0.15" opacity="0.4">
                    <animate attributeName="r" from="0.6" to="2" dur={`${2 + idx * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur={`${2 + idx * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  {/* Pin dot */}
                  <circle cx={pin.x} cy={pin.y} r="0.6" fill="#A14F2A" stroke="#FAF8F5" strokeWidth="0.15" />
                </g>
              ))}
            </svg>

            {/* Hover Tooltips rendered as HTML overlays */}
            <AnimatePresence>
              {hoveredPin && (() => {
                const pin = globalPins.find(p => p.id === hoveredPin);
                if (!pin) return null;
                return (
                  <motion.div
                    key={pin.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute pointer-events-none z-20"
                    style={{
                      left: `${pin.x}%`,
                      top: `${pin.y - 2}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div className="bg-card border border-border shadow-xl p-4 space-y-2 w-56">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">{pin.city}, {pin.country}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-foreground leading-snug">{pin.project}</h4>
                      <div className="flex justify-between text-[9px] text-muted-foreground font-mono pt-1 border-t border-border">
                        <span>{pin.materials}</span>
                        <span className="text-primary font-semibold">{pin.year}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Summary Bar */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div className="text-center">
                <p className="text-2xl font-display font-semibold text-primary">{globalPins.length}+</p>
                <p className="text-[10px] text-sand/60 uppercase tracking-widest font-mono mt-1">Reference Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-display font-semibold text-white">6</p>
                <p className="text-[10px] text-sand/60 uppercase tracking-widest font-mono mt-1">Continents</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-display font-semibold text-white">30+</p>
                <p className="text-[10px] text-sand/60 uppercase tracking-widest font-mono mt-1">Countries</p>
              </div>
            </div>
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
              <h2 className="subheading-monochrome">PCP Bulletin</h2>
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
                data-cursor="view"
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
