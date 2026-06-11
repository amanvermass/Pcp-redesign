"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, ArrowRight, ArrowLeft, RotateCcw, ShieldCheck, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProducts, Product } from "@/data/mockProducts";

export default function AiProductFinder() {
  const [step, setStep] = useState(1);
  
  // Wizard responses
  const [buildingType, setBuildingType] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [climate, setClimate] = useState("");
  const [style, setStyle] = useState("");

  const resetWizard = () => {
    setBuildingType("");
    setProjectSize("");
    setClimate("");
    setStyle("");
    setStep(1);
  };

  // Recommendations logic
  const recommendations: Product[] = React.useMemo(() => {
    if (step < 5) return [];
    
    // Attempt matching based on tags
    return mockProducts.filter((p) => {
      // Check climate tag
      const matchesClimate = !climate || p.tags.includes(climate);
      // Check building tag
      const matchesBuilding = !buildingType || p.tags.includes(buildingType);
      // Check style tag
      const matchesStyle = !style || p.tags.includes(style);

      return matchesClimate || matchesBuilding || matchesStyle;
    }).slice(0, 3);
  }, [step, buildingType, climate, style]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            AURA Digital Advisor
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-white font-semibold">AI Product Finder</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            A multi-step specification wizard recommending clay profiles and technical solutions matched to structural styles and local climatic indices.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="max-w-xl mx-auto glass-panel p-8 rounded-2xl border border-white/10 min-h-[400px] flex flex-col justify-between text-left relative overflow-hidden">
          
          {/* Progress Indicator */}
          <div className="flex justify-between items-center pb-6 border-b border-white/5 text-[10px] font-mono text-muted-foreground uppercase">
            <span>Step {step} of 5</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`w-4 h-1.5 rounded transition-all duration-300 ${
                    s <= step ? "bg-primary" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="py-8 flex-1">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Building Type */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  className="space-y-4"
                >
                  <h3 className="heading-premium text-xl text-white">What is your structural building type?</h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { id: "Residential", label: "Residential Estate" },
                      { id: "Commercial", label: "Commercial High-rise" },
                      { id: "Institutional", label: "Institutional / Civic" },
                      { id: "Hospitality", label: "Hospitality Resort" }
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setBuildingType(b.id);
                          setStep(2);
                        }}
                        className={`p-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                          buildingType === b.id
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-white/5 border-white/5 text-secondary-foreground hover:border-white/20"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Project Size */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  className="space-y-4"
                >
                  <h3 className="heading-premium text-xl text-white">Select project scope footprint</h3>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {[
                      { id: "small", label: "Bespoke Scale (< 500 sqm)" },
                      { id: "medium", label: "Medium Scale (500 - 2,000 sqm)" },
                      { id: "large", label: "Commercial Scale (> 2,000 sqm)" }
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        onClick={() => {
                          setProjectSize(sz.id);
                          setStep(3);
                        }}
                        className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                          projectSize === sz.id
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-white/5 border-white/5 text-secondary-foreground hover:border-white/25"
                        }`}
                      >
                        {sz.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Climate */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  className="space-y-4"
                >
                  <h3 className="heading-premium text-xl text-white">What local climatic indices apply?</h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { id: "Tropical", label: "Tropical Monsoon" },
                      { id: "Temperate", label: "Temperate Maritime" },
                      { id: "Arid", label: "Arid Desert" },
                      { id: "Cold", label: "Sub-zero Cold" }
                    ].map((cl) => (
                      <button
                        key={cl.id}
                        onClick={() => {
                          setClimate(cl.id);
                          setStep(4);
                        }}
                        className={`p-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                          climate === cl.id
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-white/5 border-white/5 text-secondary-foreground hover:border-white/20"
                        }`}
                      >
                        {cl.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Design Style */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  className="space-y-4"
                >
                  <h3 className="heading-premium text-xl text-white">Select envelope facade aesthetics</h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { id: "Minimalist", label: "Minimalist Monolithic" },
                      { id: "Contemporary", label: "Contemporary Lineations" },
                      { id: "Brutalist", label: "Heavy Tactile Brutalism" },
                      { id: "Classic", label: "European Heritage Classic" }
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setStyle(st.id);
                          setStep(5);
                        }}
                        className={`p-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                          style === st.id
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-white/5 border-white/5 text-secondary-foreground hover:border-white/20"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Recommendations */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    Custom Recommendations Matched
                  </div>

                  <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                    {recommendations.map((rec) => (
                      <Link
                        key={rec.id}
                        href={`/products/${rec.id}`}
                        className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 hover:bg-white/[0.08] transition-all duration-300 group"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <img src={rec.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left space-y-1">
                          <span className="text-[9px] text-muted-foreground font-mono uppercase">{rec.subcategory}</span>
                          <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{rec.name}</h4>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">{rec.description}</p>
                        </div>
                      </Link>
                    ))}

                    {recommendations.length === 0 && (
                      <div className="text-center py-6 text-xs text-muted-foreground font-mono">
                        No materials perfectly match these variables. Showing general catalog suggestion.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Step
              </button>
            ) : (
              <div />
            )}

            {step === 5 && (
              <button
                onClick={resetWizard}
                className="flex items-center gap-1.5 text-xs text-primary hover:text-gold-light font-mono font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Find New Match
              </button>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
