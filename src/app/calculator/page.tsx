"use client";

import React, { useState } from "react";
import { Calculator, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Tabs from "@/components/ui/Tabs";
import BrickCalculator from "@/components/BrickCalculator";

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("brick");

  // State: Paver Calculator
  const [paverLength, setPaverLength] = useState(15); // meters
  const [paverWidth, setPaverWidth] = useState(6); // meters
  const [paverWastage, setPaverWastage] = useState(10); // percentage

  // State: Roof Calculator
  const [roofLength, setRoofLength] = useState(12); // meters
  const [roofWidth, setRoofWidth] = useState(8); // meters
  const [roofSlope, setRoofSlope] = useState(30); // degrees pitch

  // State: Facade Calculator
  const [facadeWidth, setFacadeWidth] = useState(25); // meters
  const [facadeHeight, setFacadeHeight] = useState(15); // meters
  const [facadeCutouts, setFacadeCutouts] = useState(4); // windows count

  // State: Cost Estimator
  const [estimatorArea, setEstimatorArea] = useState(120); // sqm
  const [estimatorTier, setEstimatorTier] = useState("luxury"); // premium, luxury, super-luxury

  // Calculations for other tabs
  const paverCount = Math.ceil(
    paverLength * paverWidth * 48 * (1 + paverWastage / 100)
  );

  const pitchFactor = 1 / Math.cos((roofSlope * Math.PI) / 180) || 1.15;
  const roofArea = roofLength * roofWidth * 2 * pitchFactor;
  const roofTileCount = Math.ceil(roofArea * 12.5);

  const facadeNetArea = Math.max(0, facadeWidth * facadeHeight - facadeCutouts * 4.5);
  const facadePanelCount = Math.ceil(facadeNetArea * 2.78);

  const costMultiplier = estimatorTier === "premium" ? 85 : estimatorTier === "luxury" ? 150 : 280;
  const costEstimateTotal = estimatorArea * costMultiplier;

  const tabsList = [
    { id: "brick", label: "Brick Calculator" },
    { id: "paver", label: "Paver Calculator" },
    { id: "roof", label: "Roof Tile Calculator" },
    { id: "facade", label: "Facade Claddings" },
    { id: "cost", label: "Cost Estimator" }
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-12 font-sans">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Tools
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold">Material Calculators</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Input layout dimensions to compute required facing bricks, terracotta rainscreen panels, or obtain preliminary budget estimations.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="max-w-3xl mx-auto">
          <Tabs tabs={tabsList} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Calculator Body Grid */}
        {activeTab === "brick" ? (
          <BrickCalculator />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
            
            {/* Inputs Column */}
            <div className="lg:col-span-7 p-8 glass-panel rounded-none border border-border flex flex-col justify-between text-left space-y-6">
              
              {activeTab === "paver" && (
                <div className="space-y-6">
                  <h3 className="heading-premium text-xl text-foreground">Landscaping Area</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Pathway Length: {paverLength} m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="150"
                      value={paverLength}
                      onChange={(e) => setPaverLength(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Pathway Width: {paverWidth} m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={paverWidth}
                      onChange={(e) => setPaverWidth(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Wastage Allowance: {paverWastage}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={paverWastage}
                      onChange={(e) => setPaverWastage(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              )}

              {activeTab === "roof" && (
                <div className="space-y-6">
                  <h3 className="heading-premium text-xl text-foreground">Roofing Boundaries</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Rafter Slope Length: {roofLength} m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={roofLength}
                      onChange={(e) => setRoofLength(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Eaves Width: {roofWidth} m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={roofWidth}
                      onChange={(e) => setRoofWidth(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Roof Pitch: {roofSlope}°</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      value={roofSlope}
                      onChange={(e) => setRoofSlope(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              )}

              {activeTab === "facade" && (
                <div className="space-y-6">
                  <h3 className="heading-premium text-xl text-foreground">Façade Grid Dimensions</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Façade Width: {facadeWidth} m</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="200"
                      value={facadeWidth}
                      onChange={(e) => setFacadeWidth(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Façade Height: {facadeHeight} m</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="80"
                      value={facadeHeight}
                      onChange={(e) => setFacadeHeight(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Window Cutout Count: {facadeCutouts}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={facadeCutouts}
                      onChange={(e) => setFacadeCutouts(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              )}

              {activeTab === "cost" && (
                <div className="space-y-6">
                  <h3 className="heading-premium text-xl text-foreground">Project Scope</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono uppercase">
                      <span>Estimated Cladding Area: {estimatorArea} m²</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      value={estimatorArea}
                      onChange={(e) => setEstimatorArea(parseInt(e.target.value))}
                      className="w-full h-1 bg-sand rounded-none appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">Specify Design Grade</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "premium", label: "Premium" },
                        { id: "luxury", label: "Luxury" },
                        { id: "super-luxury", label: "Super Luxury" }
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setEstimatorTier(tier.id)}
                          className={`py-2 px-3 rounded-none border text-xs font-semibold text-center transition-all cursor-pointer ${
                            estimatorTier === tier.id
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-sand border-border text-muted-foreground hover:bg-sand/80"
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border text-[10px] text-muted-foreground font-mono">
                Calculation utilizes default standard coverages. Tolerances must be verified by engineers.
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 p-8 rounded-none bg-secondary/50 border border-primary/20 flex flex-col justify-between text-left space-y-8 relative overflow-hidden">
              
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-primary tracking-widest block">Estimation Output</span>

                {activeTab === "paver" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Estimated Pavers</span>
                      <h2 className="text-4xl md:text-5xl font-display text-foreground font-bold">{paverCount.toLocaleString()} <span className="text-xs text-primary">pcs</span></h2>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Calculated for a total landscape coverage of {paverLength * paverWidth} sqm with an allowance of {paverWastage}% for perimeter cuts.
                    </p>
                  </div>
                )}

                {activeTab === "roof" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Estimated Roof Tiles</span>
                      <h2 className="text-4xl md:text-5xl font-display text-foreground font-bold">{roofTileCount.toLocaleString()} <span className="text-xs text-primary">pcs</span></h2>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Estimating double-sided pitch area of {Math.round(roofArea)} sqm (pitch factor {pitchFactor.toFixed(2)} based on {roofSlope}° slope).
                    </p>
                  </div>
                )}

                {activeTab === "facade" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Estimated Terracotta Panels</span>
                      <h2 className="text-4xl md:text-5xl font-display text-foreground font-bold">{facadePanelCount.toLocaleString()} <span className="text-xs text-primary">pcs</span></h2>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Based on gross facade area {facadeWidth * facadeHeight} sqm. Net cladding area: {facadeNetArea} sqm after window deductions.
                    </p>
                  </div>
                )}

                {activeTab === "cost" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Initial Material Cost</span>
                      <h2 className="text-4xl md:text-5xl font-display text-primary font-bold">${costEstimateTotal.toLocaleString()}</h2>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Approximate price guide for {estimatorArea} sqm. Material specifications: {estimatorTier.toUpperCase()}. Excluding cladding track framing.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Link
                  href="/products"
                  className="w-full py-3 rounded-none bg-primary hover:bg-brick text-primary-foreground text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-1 transition-colors"
                >
                  Browse Spec Catalogs
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </Link>
                <Link
                  href="/contact"
                  className="block text-center text-[10px] text-muted-foreground hover:text-primary underline font-mono"
                >
                  Request formal quotation breakdown
                </Link>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
