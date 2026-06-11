"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Hammer, Trash2, Edit, Plus, FileText, Share2, Printer, Info, AlertTriangle, Compass, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// Brick Presets
interface BrickPreset {
  id: string;
  name: string;
  // Metric (mm)
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  // Imperial (inches)
  lengthIn: number;
  widthIn: number;
  heightIn: number;
}

const BRICK_PRESETS: BrickPreset[] = [
  { id: "modular", name: "Modular Brick", lengthMm: 190, widthMm: 90, heightMm: 90, lengthIn: 7.625, widthIn: 3.625, heightIn: 2.25 },
  { id: "wirecut", name: "Wire Cut Brick", lengthMm: 230, widthMm: 110, heightMm: 75, lengthIn: 9.0, widthIn: 4.25, heightIn: 3.0 },
  { id: "clay", name: "Clay Brick", lengthMm: 230, widthMm: 110, heightMm: 70, lengthIn: 9.0, widthIn: 4.25, heightIn: 2.75 },
  { id: "terracotta", name: "Terracotta Brick", lengthMm: 240, widthMm: 115, heightMm: 71, lengthIn: 9.5, widthIn: 4.5, heightIn: 2.8 },
  { id: "custom", name: "Custom Size", lengthMm: 230, widthMm: 110, heightMm: 75, lengthIn: 9.0, widthIn: 4.25, heightIn: 3.0 }
];

// Building Presets
interface BuildingPreset {
  id: string;
  name: string;
  wallLength: number;
  wallHeight: number;
  wallThickness: number;
  numWalls: number;
  numDoors: number;
  doorWidth: number;
  doorHeight: number;
  numWindows: number;
  windowWidth: number;
  windowHeight: number;
}

const BUILDING_PRESETS_METRIC: Record<string, BuildingPreset> = {
  boundary: { id: "boundary", name: "Boundary Wall", wallLength: 30, wallHeight: 2.1, wallThickness: 230, numWalls: 1, numDoors: 0, doorWidth: 0, doorHeight: 0, numWindows: 0, windowWidth: 0, windowHeight: 0 },
  residential: { id: "residential", name: "Residential House", wallLength: 45, wallHeight: 3.0, wallThickness: 230, numWalls: 4, numDoors: 2, doorWidth: 1.0, doorHeight: 2.1, numWindows: 6, windowWidth: 1.2, windowHeight: 1.2 },
  villa: { id: "villa", name: "Villa", wallLength: 75, wallHeight: 3.6, wallThickness: 230, numWalls: 4, numDoors: 4, doorWidth: 1.2, doorHeight: 2.4, numWindows: 10, windowWidth: 1.5, windowHeight: 1.5 },
  apartment: { id: "apartment", name: "Apartment", wallLength: 180, wallHeight: 3.0, wallThickness: 230, numWalls: 8, numDoors: 16, doorWidth: 1.0, doorHeight: 2.1, numWindows: 24, windowWidth: 1.2, windowHeight: 1.2 },
  commercial: { id: "commercial", name: "Commercial Building", wallLength: 400, wallHeight: 4.2, wallThickness: 300, numWalls: 12, numDoors: 10, doorWidth: 1.8, doorHeight: 2.7, numWindows: 40, windowWidth: 1.8, windowHeight: 1.8 }
};

const BUILDING_PRESETS_IMPERIAL: Record<string, BuildingPreset> = {
  boundary: { id: "boundary", name: "Boundary Wall", wallLength: 100, wallHeight: 7, wallThickness: 9, numWalls: 1, numDoors: 0, doorWidth: 0, doorHeight: 0, numWindows: 0, windowWidth: 0, windowHeight: 0 },
  residential: { id: "residential", name: "Residential House", wallLength: 150, wallHeight: 10, wallThickness: 9, numWalls: 4, numDoors: 2, doorWidth: 3.28, doorHeight: 6.88, numWindows: 6, windowWidth: 4, windowHeight: 4 },
  villa: { id: "villa", name: "Villa", wallLength: 250, wallHeight: 12, wallThickness: 9, numWalls: 4, numDoors: 4, doorWidth: 4, doorHeight: 8, numWindows: 10, windowWidth: 5, windowHeight: 5 },
  apartment: { id: "apartment", name: "Apartment", wallLength: 600, wallHeight: 10, wallThickness: 9, numWalls: 8, numDoors: 16, doorWidth: 3.28, doorHeight: 6.88, numWindows: 24, windowWidth: 4, windowHeight: 4 },
  commercial: { id: "commercial", name: "Commercial Building", wallLength: 1300, wallHeight: 14, wallThickness: 12, numWalls: 12, numDoors: 10, doorWidth: 6, doorHeight: 9, numWindows: 40, windowWidth: 6, windowHeight: 6 }
};

export default function BrickCalculator() {
  const [unit, setUnit] = useState<"Metric" | "Imperial">("Metric");

  // Inputs Wall
  const [wallLength, setWallLength] = useState(45);
  const [wallHeight, setWallHeight] = useState(3.0);
  const [wallThickness, setWallThickness] = useState(230); // mm in metric, inches in imperial
  const [numWalls, setNumWalls] = useState(4);

  // Inputs Openings
  const [numDoors, setNumDoors] = useState(2);
  const [doorWidth, setDoorWidth] = useState(1.0);
  const [doorHeight, setDoorHeight] = useState(2.1);
  const [numWindows, setNumWindows] = useState(6);
  const [windowWidth, setWindowWidth] = useState(1.2);
  const [windowHeight, setWindowHeight] = useState(1.2);

  // Inputs Brick
  const [selectedBrickId, setSelectedBrickId] = useState("modular");
  const [brickLength, setBrickLength] = useState(190); // mm or inches
  const [brickWidth, setBrickWidth] = useState(90);
  const [brickHeight, setBrickHeight] = useState(90);
  const [mortarThickness, setMortarThickness] = useState(10); // mm or inches

  // Wastage & Cost
  const [wastagePercent, setWastagePercent] = useState(5);
  const [costPerBrick, setCostPerBrick] = useState(1.85);
  const [laborCost, setLaborCost] = useState(1200);

  // Error validations state
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Sync Brick Preset selection
  const activePreset = useMemo(() => {
    return BRICK_PRESETS.find((p) => p.id === selectedBrickId) || BRICK_PRESETS[0];
  }, [selectedBrickId]);

  useEffect(() => {
    if (selectedBrickId !== "custom") {
      if (unit === "Metric") {
        setBrickLength(activePreset.lengthMm);
        setBrickWidth(activePreset.widthMm);
        setBrickHeight(activePreset.heightMm);
      } else {
        setBrickLength(activePreset.lengthIn);
        setBrickWidth(activePreset.widthIn);
        setBrickHeight(activePreset.heightIn);
      }
    }
  }, [selectedBrickId, activePreset, unit]);

  // Handle unit conversions
  const handleUnitToggle = (newUnit: "Metric" | "Imperial") => {
    if (newUnit === unit) return;
    setUnit(newUnit);

    if (newUnit === "Imperial") {
      // Metric to Imperial
      setWallLength(parseFloat((wallLength * 3.28084).toFixed(2)));
      setWallHeight(parseFloat((wallHeight * 3.28084).toFixed(2)));
      setWallThickness(parseFloat((wallThickness / 25.4).toFixed(2)));

      setDoorWidth(parseFloat((doorWidth * 3.28084).toFixed(2)));
      setDoorHeight(parseFloat((doorHeight * 3.28084).toFixed(2)));
      setWindowWidth(parseFloat((windowWidth * 3.28084).toFixed(2)));
      setWindowHeight(parseFloat((windowHeight * 3.28084).toFixed(2)));

      setMortarThickness(parseFloat((mortarThickness / 25.4).toFixed(3)));
    } else {
      // Imperial to Metric
      setWallLength(parseFloat((wallLength / 3.28084).toFixed(2)));
      setWallHeight(parseFloat((wallHeight / 3.28084).toFixed(2)));
      setWallThickness(parseFloat((wallThickness * 25.4).toFixed(0)));

      setDoorWidth(parseFloat((doorWidth / 3.28084).toFixed(2)));
      setDoorHeight(parseFloat((doorHeight / 3.28084).toFixed(2)));
      setWindowWidth(parseFloat((windowWidth / 3.28084).toFixed(2)));
      setWindowHeight(parseFloat((windowHeight / 3.28084).toFixed(2)));

      setMortarThickness(parseFloat((mortarThickness * 25.4).toFixed(0)));
    }
  };

  // Apply building template preset
  const applyBuildingPreset = (presetId: string) => {
    const list = unit === "Metric" ? BUILDING_PRESETS_METRIC : BUILDING_PRESETS_IMPERIAL;
    const preset = list[presetId];
    if (preset) {
      setWallLength(preset.wallLength);
      setWallHeight(preset.wallHeight);
      setWallThickness(preset.wallThickness);
      setNumWalls(preset.numWalls);
      setNumDoors(preset.numDoors);
      setDoorWidth(preset.doorWidth);
      setDoorHeight(preset.doorHeight);
      setNumWindows(preset.numWindows);
      setWindowWidth(preset.windowWidth);
      setWindowHeight(preset.windowHeight);
    }
  };

  // Calculations Core (base conversion values to meters)
  const results = useMemo(() => {
    const errs: string[] = [];

    // Validations
    if (wallLength <= 0 || wallHeight <= 0 || wallThickness <= 0 || numWalls <= 0) {
      errs.push("Wall dimensions and quantity must be positive numbers.");
    }
    if (brickLength <= 0 || brickWidth <= 0 || brickHeight <= 0 || mortarThickness < 0) {
      errs.push("Brick specifications and mortar thickness must be positive.");
    }
    if (numDoors < 0 || doorWidth < 0 || doorHeight < 0 || numWindows < 0 || windowWidth < 0 || windowHeight < 0) {
      errs.push("Opening quantities and sizes cannot be negative.");
    }

    // Convert all to meters for calculations
    const lengthM = unit === "Metric" ? wallLength : wallLength * 0.3048;
    const heightM = unit === "Metric" ? wallHeight : wallHeight * 0.3048;
    const thicknessM = unit === "Metric" ? wallThickness / 1000 : wallThickness * 0.0254;

    const dwM = unit === "Metric" ? doorWidth : doorWidth * 0.3048;
    const dhM = unit === "Metric" ? doorHeight : doorHeight * 0.3048;
    const wwM = unit === "Metric" ? windowWidth : windowWidth * 0.3048;
    const whM = unit === "Metric" ? windowHeight : windowHeight * 0.3048;

    const blM = unit === "Metric" ? brickLength / 1000 : brickLength * 0.0254;
    const bwM = unit === "Metric" ? brickWidth / 1000 : brickWidth * 0.0254;
    const bhM = unit === "Metric" ? brickHeight / 1000 : brickHeight * 0.0254;
    const mortarM = unit === "Metric" ? mortarThickness / 1000 : mortarThickness * 0.0254;

    // Calculate Areas
    const totalWallAreaM2 = lengthM * heightM * numWalls;
    const openingsAreaM2 = (dwM * dhM * numDoors) + (wwM * whM * numWindows);
    
    if (openingsAreaM2 >= totalWallAreaM2 && totalWallAreaM2 > 0) {
      errs.push("Total openings cutout area exceeds total wall surface area.");
    }

    const netWallAreaM2 = Math.max(0, totalWallAreaM2 - openingsAreaM2);
    const wallVolumeM3 = netWallAreaM2 * thicknessM;

    // Volume of single brick with mortar allowance
    const brickVolumeM3 = (blM + mortarM) * (bwM + mortarM) * (bhM + mortarM);

    // Quantities
    const requiredBricks = brickVolumeM3 > 0 ? wallVolumeM3 / brickVolumeM3 : 0;
    const wastageCount = requiredBricks * (wastagePercent / 100);
    const finalQuantity = requiredBricks + wastageCount;

    // Costs
    const materialCost = finalQuantity * costPerBrick;
    const totalCost = materialCost + (laborCost || 0);

    // Outputs formatting in selected unit system
    const userAreaUnit = unit === "Metric" ? "m²" : "sq ft";
    const userVolUnit = unit === "Metric" ? "m³" : "cu ft";

    const displayWallArea = unit === "Metric" ? totalWallAreaM2 : totalWallAreaM2 * 10.7639;
    const displayOpeningsArea = unit === "Metric" ? openingsAreaM2 : openingsAreaM2 * 10.7639;
    const displayNetArea = unit === "Metric" ? netWallAreaM2 : netWallAreaM2 * 10.7639;
    const displayWallVolume = unit === "Metric" ? wallVolumeM3 : wallVolumeM3 * 35.3147;

    setErrors(errs);

    return {
      totalWallArea: displayWallArea,
      openingArea: displayOpeningsArea,
      netWallArea: displayNetArea,
      wallVolume: displayWallVolume,
      brickVolume: brickVolumeM3, // kept in metric volume internally for precision
      requiredBricks: Math.ceil(requiredBricks),
      wastageCount: Math.ceil(wastageCount),
      finalQuantity: Math.ceil(finalQuantity),
      materialCost,
      totalCost,
      areaUnit: userAreaUnit,
      volumeUnit: userVolUnit
    };
  }, [
    wallLength, wallHeight, wallThickness, numWalls,
    numDoors, doorWidth, doorHeight,
    numWindows, windowWidth, windowHeight,
    brickLength, brickWidth, brickHeight, mortarThickness,
    wastagePercent, costPerBrick, laborCost, unit
  ]);

  // Export Share Summary
  const handleShare = () => {
    const text = `AURA Material Estimate Report\n
Project Profile summary:\n
- Unit System: ${unit}
- Wall Surface Area (Net): ${results.netWallArea.toFixed(2)} ${results.areaUnit}
- Total Wall Volume: ${results.wallVolume.toFixed(2)} ${results.volumeUnit}
- Bricks Base Required: ${results.requiredBricks.toLocaleString()} pcs
- Wastage Allowance (${wastagePercent}%): ${results.wastageCount.toLocaleString()} pcs
- Final Brick Order Count: ${results.finalQuantity.toLocaleString()} pcs
- Material Budget: $${results.materialCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Estimated Complete Budget: $${results.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // print window trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto text-left font-sans">
      
      {/* Inputs Column */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Unit Selector & Presets */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-mono tracking-widest text-primary uppercase font-bold">Standard Presets & Units</h3>
            
            {/* Unit Toggle */}
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/5 text-xs font-mono">
              <button
                onClick={() => handleUnitToggle("Metric")}
                className={cn("px-3 py-1 rounded transition-colors", unit === "Metric" ? "bg-primary text-black font-semibold" : "text-muted-foreground")}
              >
                Metric (m/mm)
              </button>
              <button
                onClick={() => handleUnitToggle("Imperial")}
                className={cn("px-3 py-1 rounded transition-colors", unit === "Imperial" ? "bg-primary text-black font-semibold" : "text-muted-foreground")}
              >
                Imperial (ft/in)
              </button>
            </div>
          </div>

          {/* Quick presets buttons */}
          <div className="space-y-1.5 text-xs">
            <span className="text-muted-foreground font-mono uppercase text-[9px] tracking-wider block">Quick Structural Presets</span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(BUILDING_PRESETS_METRIC).map((pKey) => {
                const label = BUILDING_PRESETS_METRIC[pKey].name;
                return (
                  <button
                    key={pKey}
                    onClick={() => applyBuildingPreset(pKey)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 text-[10px] text-white font-medium transition-all"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inputs Layout Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Wall Info Box */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 text-xs">
            <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-white/5 pb-2">1. Wall Geometry</h4>
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-muted-foreground font-mono text-[10px] uppercase">Wall Length ({unit === "Metric" ? "meters" : "feet"})</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={wallLength}
                  onChange={(e) => setWallLength(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground font-mono text-[10px] uppercase">Wall Height ({unit === "Metric" ? "meters" : "feet"})</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={wallHeight}
                  onChange={(e) => setWallHeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[10px] uppercase">Thickness ({unit === "Metric" ? "mm" : "inches"})</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={wallThickness}
                    onChange={(e) => setWallThickness(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[10px] uppercase">Wall Count</label>
                  <input
                    type="number"
                    min="1"
                    value={numWalls}
                    onChange={(e) => setNumWalls(parseInt(e.target.value) || 1)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Openings Box */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 text-xs">
            <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-white/5 pb-2">2. Openings Cutouts</h4>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 items-end">
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase">Doors</label>
                  <input
                    type="number"
                    min="0"
                    value={numDoors}
                    onChange={(e) => setNumDoors(parseInt(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase">Width ({unit === "Metric" ? "m" : "ft"})</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={doorWidth}
                    onChange={(e) => setDoorWidth(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase">Height ({unit === "Metric" ? "m" : "ft"})</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={doorHeight}
                    onChange={(e) => setDoorHeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 items-end pt-2 border-t border-white/5">
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase">Windows</label>
                  <input
                    type="number"
                    min="0"
                    value={numWindows}
                    onChange={(e) => setNumWindows(parseInt(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase">Width ({unit === "Metric" ? "m" : "ft"})</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={windowWidth}
                    onChange={(e) => setWindowWidth(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase">Height ({unit === "Metric" ? "m" : "ft"})</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={windowHeight}
                    onChange={(e) => setWindowHeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Brick Specifications Box */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 text-xs md:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-white/5 pb-2">3. Material Specifications</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase block">Brick Presets</label>
                  <select
                    value={selectedBrickId}
                    onChange={(e) => setSelectedBrickId(e.target.value)}
                    className="w-full bg-[#10121A] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  >
                    {BRICK_PRESETS.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase block">Mortar joint thickness ({unit === "Metric" ? "mm" : "in"})</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={mortarThickness}
                    onChange={(e) => setMortarThickness(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3.5 md:col-span-2">
                <span className="text-muted-foreground font-mono text-[9px] uppercase block">Brick bounds dimensions</span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-muted-foreground text-[8px] uppercase">Length ({unit === "Metric" ? "mm" : "in"})</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      disabled={selectedBrickId !== "custom"}
                      value={brickLength}
                      onChange={(e) => setBrickLength(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-muted-foreground text-[8px] uppercase">Width ({unit === "Metric" ? "mm" : "in"})</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      disabled={selectedBrickId !== "custom"}
                      value={brickWidth}
                      onChange={(e) => setBrickWidth(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-muted-foreground text-[8px] uppercase">Height ({unit === "Metric" ? "mm" : "in"})</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      disabled={selectedBrickId !== "custom"}
                      value={brickHeight}
                      onChange={(e) => setBrickHeight(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Cost and wastage */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 text-xs md:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-white/5 pb-2">4. Commercials & margins</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono uppercase">
                  <span>Wastage Allowance: {wastagePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={wastagePercent}
                  onChange={(e) => setWastagePercent(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground font-mono text-[10px] uppercase">Cost Per Brick ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={costPerBrick}
                  onChange={(e) => setCostPerBrick(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground font-mono text-[10px] uppercase">Labor Budget Estimate ($)</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={laborCost}
                  onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Results Column + Visualizations */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        
        {/* Results Card */}
        <div className="p-6 rounded-2xl bg-[#10121A] border border-primary/20 space-y-6 text-left">
          
          <div className="pb-4 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-primary tracking-widest font-bold">Bill of Quantities (BOQ)</span>
            {errors.length > 0 && (
              <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Validations active
              </span>
            )}
          </div>

          {errors.length > 0 ? (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 space-y-2">
              <span className="font-semibold font-mono uppercase">Errors Detected:</span>
              <ul className="list-disc pl-4 space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Detailed Metrics */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-white/5 pb-4">
                <div>
                  <span className="text-muted-foreground uppercase text-[10px]">Total Wall Area</span>
                  <p className="text-base font-bold text-white mt-1">{results.totalWallArea.toFixed(2)} <span className="text-[10px] text-muted-foreground">{results.areaUnit}</span></p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase text-[10px]">Openings Deduction</span>
                  <p className="text-base font-bold text-white mt-1">{results.openingArea.toFixed(2)} <span className="text-[10px] text-muted-foreground">{results.areaUnit}</span></p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase text-[10px]">Net Wall Area</span>
                  <p className="text-base font-bold text-white mt-1">{results.netWallArea.toFixed(2)} <span className="text-[10px] text-muted-foreground">{results.areaUnit}</span></p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase text-[10px]">Total Wall Volume</span>
                  <p className="text-base font-bold text-white mt-1">{results.wallVolume.toFixed(2)} <span className="text-[10px] text-muted-foreground">{results.volumeUnit}</span></p>
                </div>
              </div>

              {/* Quantities output */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-white/5 pb-4">
                <div>
                  <span className="text-muted-foreground uppercase text-[10px]">Base Bricks Required</span>
                  <p className="text-xl font-bold text-white mt-1">{results.requiredBricks.toLocaleString()} <span className="text-xs text-muted-foreground">pcs</span></p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase text-[10px]">Wastage ({wastagePercent}%)</span>
                  <p className="text-xl font-bold text-white mt-1">{results.wastageCount.toLocaleString()} <span className="text-xs text-muted-foreground">pcs</span></p>
                </div>
              </div>

              {/* Final target */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-mono">Final Brick Quantity</span>
                  <h3 className="text-3xl font-display font-semibold text-primary mt-1">{results.finalQuantity.toLocaleString()} <span className="text-sm text-primary font-sans font-normal">pcs</span></h3>
                </div>
                
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase font-mono block">Estimated Cost</span>
                  <h3 className="text-3xl font-display font-semibold text-white mt-1">${results.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
              </div>

            </div>
          )}

          {/* Export buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePrint}
              disabled={errors.length > 0}
              className="flex-1 py-2.5 rounded-lg border border-white/10 hover:border-primary bg-white/5 text-white hover:text-black hover:bg-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              Print Estimate
            </button>
            <button
              onClick={handleShare}
              disabled={errors.length > 0}
              className="flex-1 py-2.5 rounded-lg border border-white/10 hover:border-primary bg-white/5 text-white hover:text-black hover:bg-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Share2 className="w-4 h-4" />
              {copied ? "Copied" : "Share BOQ"}
            </button>
          </div>

        </div>

        {/* Visualizer Schematic */}
        {errors.length === 0 && (
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-muted-foreground uppercase font-bold">Elevation Layout Visualizer</h4>
            
            {/* SVG Diagram representing walls & openings cutouts */}
            <div className="relative w-full aspect-[2/1] bg-card rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-4">
              
              {/* Brick grid pattern representation */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:10px_6px] pointer-events-none" />

              {/* Main wall container block */}
              <div className="relative w-4/5 h-4/5 border border-primary/30 rounded bg-primary/5 flex items-center justify-center">
                <span className="absolute bottom-2 right-2 text-[8px] font-mono text-primary/70">{wallLength}x{wallHeight} Wall</span>

                {/* Simulated openings */}
                <div className="flex gap-8">
                  {/* Doors (mock representation) */}
                  {numDoors > 0 && (
                    <div className="flex gap-2">
                      {Array.from({ length: Math.min(numDoors, 3) }).map((_, i) => (
                        <div key={i} className="w-8 h-12 bg-card border border-white/20 rounded-t flex items-center justify-center">
                          <span className="text-[7px] text-muted-foreground font-mono">D</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Windows (mock representation) */}
                  {numWindows > 0 && (
                    <div className="flex gap-2">
                      {Array.from({ length: Math.min(numWindows, 4) }).map((_, i) => (
                        <div key={i} className="w-10 h-8 bg-card border border-white/20 rounded flex items-center justify-center mt-2">
                          <span className="text-[7px] text-muted-foreground font-mono">W</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Brick layout details */}
            <div className="flex justify-between items-center text-[9px] text-muted-foreground font-mono border-t border-white/5 pt-3">
              <span>Brick Layout: Running Bond</span>
              <span>Joint Mortar gap: {mortarThickness}{unit === "Metric" ? "mm" : "in"}</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
