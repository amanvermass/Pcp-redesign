"use client";

import React, { useState } from "react";
import { Cpu, Upload, Image as ImageIcon, Check, SlidersHorizontal, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Slider from "@/components/ui/Slider";

interface VisualizerMaterial {
  id: string;
  name: string;
  category: string;
  previewImage: string; // The "After" image corresponding to this material
}

export default function AiFacadeVisualizer() {
  // Mock template options
  const templates = [
    {
      id: "villa",
      name: "Contemporary Villa",
      before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      materials: [
        {
          id: "longformat-terracotta",
          name: "Sienna Terracotta Panels",
          category: "Facade Panels",
          previewImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "handmade-roman",
          name: "Romanesque Longformat facing Brick",
          category: "Facing Bricks",
          previewImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "obsidian-clinker",
          name: "Obsidian Clinker Wall cladding",
          category: "Clinker Bricks",
          previewImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    },
    {
      id: "highrise",
      name: "Metropolitan Tower",
      before: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      materials: [
        {
          id: "platinum-louver",
          name: "Platinum glazed sunshade baguettes",
          category: "Louvers & Baguettes",
          previewImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "clinker-monolith",
          name: "Vanguard heavy clinker cladding",
          category: "Clinker Bricks",
          previewImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(templates[0].materials[0]);
  const [isUploading, setIsUploading] = useState(false);
  const [customImageUploaded, setCustomImageUploaded] = useState(false);

  const handleTemplateChange = (templateId: string) => {
    const temp = templates.find((t) => t.id === templateId);
    if (temp) {
      setSelectedTemplate(temp);
      setSelectedMaterial(temp.materials[0]);
      setCustomImageUploaded(false);
    }
  };

  // Simulate file upload
  const simulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setCustomImageUploaded(true);
      // Keep contemporary villa but switch to obsidian clinker representation
      setSelectedTemplate({
        ...templates[0],
        name: "Uploaded CAD Plan Outline"
      });
      setSelectedMaterial(templates[0].materials[2]);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            AI Visualizer Sandbox
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-white font-semibold">AI Façade Visualizer</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Simulate premium clay facades or longformat facing bricks in architectural settings. Select models or drag/scrub sliders.
          </p>
        </div>

        {/* Visualizer Workspace grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-7xl mx-auto">
          
          {/* Main Visualizer (Scrub Slider) Column */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            
            <div className="relative aspect-[16/10] w-full bg-[#10121A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
              {isUploading ? (
                <div className="space-y-4 text-center">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
                  <p className="text-xs text-muted-foreground font-mono">Analyzing elevations and lighting angles...</p>
                </div>
              ) : (
                <Slider
                  beforeImage={selectedTemplate.before}
                  afterImage={selectedMaterial.previewImage}
                  className="w-full h-full"
                  beforeLabel={customImageUploaded ? "Elevations" : "Original Structure"}
                  afterLabel={selectedMaterial.name}
                />
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono uppercase bg-white/5 border border-white/10 p-3 rounded-lg">
              <span>Interactive Slider Mode</span>
              <span>Hold and Drag the gold center bar to compare envelope finishes</span>
            </div>
          </div>

          {/* Configuration Panel Column */}
          <div className="lg:col-span-4 p-6 glass-panel rounded-2xl border border-white/10 text-left space-y-6 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Image Upload Simulator */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest block">Upload elevations</span>
                <label className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-white font-medium">Select Elevations JPEG / PNG</span>
                  <span className="text-[9px] text-muted-foreground">Supported up to 15MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={simulateUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Template Models */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">Choose building template</span>
                <div className="flex gap-2">
                  {templates.map((temp) => (
                    <button
                      key={temp.id}
                      onClick={() => handleTemplateChange(temp.id)}
                      className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                        selectedTemplate.id === temp.id && !customImageUploaded
                          ? "bg-primary text-black border-primary"
                          : "bg-white/5 border-white/5 text-muted-foreground hover:text-white"
                      }`}
                    >
                      {temp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Swap Selector */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">Configure envelope material</span>
                <div className="space-y-2">
                  {selectedTemplate.materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        selectedMaterial.id === mat.id
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-white/5 border-white/5 text-secondary-foreground hover:border-white/20"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono uppercase opacity-75">{mat.category}</span>
                        <h4 className="text-xs font-semibold text-white">{mat.name}</h4>
                      </div>
                      {selectedMaterial.id === mat.id && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[10px] text-muted-foreground leading-relaxed">
              *The AI Facade Visualizer renders clay tiles and panels onto structural bounds using dummy graphics processing.
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
