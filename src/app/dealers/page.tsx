"use client";

import React, { useState, useMemo } from "react";
import { MapPin, Search, Compass, Phone, Mail, Award, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockDealers, Dealer } from "@/data/mockDealers";

export default function DealerLocatorPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedDealer, setFocusedDealer] = useState<Dealer | null>(mockDealers[0]);

  // Filters logic
  const filteredDealers = useMemo(() => {
    let result = [...mockDealers];

    if (searchQuery) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion !== "all") {
      result = result.filter((d) => d.region === selectedRegion);
    }

    if (selectedType !== "all") {
      result = result.filter((d) => d.type === selectedType);
    }

    return result;
  }, [searchQuery, selectedRegion, selectedType]);

  const handleDealerFocus = (dealer: Dealer) => {
    setFocusedDealer(dealer);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-12 font-sans">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            Global Show galleries
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold">Dealer Locator</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Locate authorized show studios, technical consultation support, and architectural catalog distribution hubs worldwide.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-between p-4 glass-panel rounded-none border border-border shadow-sm">
          {/* Search query */}
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by city, showroom name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-none pl-9 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Region */}
          <div className="bg-card border border-border px-3 py-2 rounded-none text-xs text-left">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-foreground border-none outline-none cursor-pointer w-full"
            >
              <option value="all" className="bg-card text-foreground">All Regions</option>
              <option value="Europe" className="bg-card text-foreground">Europe</option>
              <option value="Asia Pacific" className="bg-card text-foreground">Asia Pacific</option>
              <option value="North America" className="bg-card text-foreground">North America</option>
              <option value="Middle East" className="bg-card text-foreground">Middle East</option>
            </select>
          </div>

          {/* Showroom type */}
          <div className="bg-card border border-border px-3 py-2 rounded-none text-xs text-left">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-foreground border-none outline-none cursor-pointer w-full"
            >
              <option value="all" className="bg-card text-foreground">All Showroom Types</option>
              <option value="Flagship Studio" className="bg-card text-foreground">Flagship Studio</option>
              <option value="Authorized Gallery" className="bg-card text-foreground">Authorized Gallery</option>
              <option value="Technical Partner" className="bg-card text-foreground">Technical Partner</option>
            </select>
          </div>
        </div>

        {/* Map + List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto">
          
          {/* Dealers List Column */}
          <div className="lg:col-span-4 max-h-[60vh] overflow-y-auto space-y-3 pr-2 text-left">
            {filteredDealers.map((d) => (
              <button
                key={d.id}
                onClick={() => handleDealerFocus(d)}
                className={`w-full p-4 rounded-none border text-left transition-all duration-300 block cursor-pointer ${
                  focusedDealer?.id === d.id
                    ? "bg-primary/5 border-primary text-primary"
                    : "bg-card border-border text-secondary-foreground hover:border-primary/30"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">{d.type}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{d.city}</span>
                  </div>
                  <h4 className={`text-sm font-semibold transition-colors ${focusedDealer?.id === d.id ? "text-primary" : "text-foreground"}`}>{d.name}</h4>
                  <p className="text-xs text-muted-foreground leading-normal line-clamp-2">{d.address}</p>
                </div>
              </button>
            ))}

            {filteredDealers.length === 0 && (
              <div className="text-center py-12 text-xs text-muted-foreground font-mono">
                No showrooms match your query filters.
              </div>
            )}
          </div>

          {/* Interactive Custom SVG Map Column */}
          <div className="lg:col-span-8 p-6 glass-panel rounded-none border border-border flex flex-col justify-between space-y-6 relative min-h-[40vh] shadow-sm">
            
            {/* World Map SVG stylized mockup */}
            <div className="relative w-full flex-1 border border-border rounded-none bg-sand/30 overflow-hidden flex items-center justify-center p-4">
              
              {/* Dot Grid representing continents */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1c1c1c_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Showroom Pins on the simulated map space */}
              <div className="relative w-full aspect-[2/1] max-w-xl">
                {mockDealers.map((dealer) => {
                  const isFocused = focusedDealer?.id === dealer.id;
                  const isVisible = filteredDealers.some((d) => d.id === dealer.id);
                  if (!isVisible) return null;

                  return (
                    <button
                      key={dealer.id}
                      onClick={() => handleDealerFocus(dealer)}
                      className="absolute group transition-transform duration-300 hover:scale-110 z-10 cursor-pointer"
                      style={{ left: `${dealer.coordinates.x}%`, top: `${dealer.coordinates.y}%` }}
                    >
                      <MapPin
                        className={`w-5 h-5 transition-colors ${
                          isFocused ? "text-primary filter drop-shadow-[0_0_4px_rgba(181,90,48,0.5)]" : "text-muted-foreground group-hover:text-primary"
                        }`}
                      />
                      
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-card border border-border text-[9px] text-foreground px-2 py-1 rounded-none shadow-md whitespace-nowrap z-20 font-mono">
                        {dealer.city}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Focused Dealer Details Display */}
            {focusedDealer && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-sand border border-border rounded-none text-left text-xs items-center shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] text-primary font-mono uppercase tracking-widest block font-bold">Contact Studio</span>
                  <h4 className="text-sm font-semibold text-foreground leading-tight">{focusedDealer.name}</h4>
                  <p className="text-muted-foreground mt-1">{focusedDealer.address}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>{focusedDealer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>{focusedDealer.email}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="w-full md:w-auto px-4 py-2 bg-primary hover:bg-brick text-primary-foreground font-semibold rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
