"use client";

import React from "react";
import { ShieldCheck, Award, Zap, Compass, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const leadership = [
    {
      name: "Marcus Aurelius Vane",
      role: "Co-Founder & Chief Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Over 25 years guiding architectural specification projects across Europe. Spearheaded the modern longformat brick movement."
    },
    {
      name: "Elisa Chipper",
      role: "Director of Product Engineering",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      bio: "Specialist in thermal dynamics and ventilation envelopes. Coordinates our titanium-dioxide self-cleaning coating research."
    },
    {
      name: "Arthur Pendelton",
      role: "Lead Sustainability Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Adviser to the German Sustainable Building Council (DGNB). Steers our dry-fixing circular mechanics developments."
    }
  ];

  return (
    <>
      <Navbar />

      <main className="space-y-28 pb-20 font-sans">
        
        {/* Cinematic Header */}
        <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="PCP manufacturing"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1C1C1C]/60" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 rounded-none px-3 py-1">
              Crafting Geological Textures
            </span>
            <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight">
              Our Legacy & Purpose
            </h1>
          </div>
        </section>

        {/* Company Story & Vision */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="heading-premium text-3xl text-foreground font-semibold">The Story of Prayag Clay Production</h2>
            <p className="text-sm md:text-base text-secondary-foreground leading-relaxed">
              Founded at the intersection of geology, architecture, and technology, Prayag Clay Production (PCP) manufactures architectural clay products. We create building envelopes that act as active, passive filters, bridging classic craftsmanship and modern facades.
            </p>
            <p className="text-sm md:text-base text-secondary-foreground leading-relaxed">
              Our brickworks extract rich clay veins locally. Every terracotta baguette, clinker block, and interlocking roof panel is extruded and fired under carbon-controlled kilns, ensuring structural durability with minimal ecological impact.
            </p>
          </div>

          <div className="lg:col-span-5 p-8 glass-panel rounded-none border border-border flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-primary tracking-widest block">Design Principles</span>
              <h3 className="heading-premium text-xl text-foreground">Our Sustainability Vision</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We design for absolute circularity. By engineering mechanical dry-clipping systems, we completely eliminate cement binders at demolition, guaranteeing all elements can be returned safely to the soil matrix.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-foreground border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>LEED Gold Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>Cradle-to-Cradle</span>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Excellence */}
        <section className="bg-secondary/30 border-y border-border py-20 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-none overflow-hidden border border-border shadow-md mx-auto">
                <img src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="heading-premium text-3xl text-foreground font-semibold">Manufacturing Sophistication</h2>
              <p className="text-sm md:text-base text-secondary-foreground leading-relaxed">
                Our operations integrate advanced automated processing with hand-crafted detailing. We fire our custom facade lines under proprietary thermal sensors, achieving compressive tolerances above 80 MPa.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">Hydrophilic Coatings</h4>
                  <p className="text-muted-foreground leading-normal">Baked-in titanium-dioxide triggers organic cleaning on contact with rain.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">High Breaking Load</h4>
                  <p className="text-muted-foreground leading-normal">Roofing shingles are engineered to absorb wind loads above class 4 hurricane scales.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Leadership Team Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 text-center">
            <span className="text-xs font-mono tracking-widest text-primary uppercase block">Architectural Advisers</span>
            <h2 className="heading-premium text-3xl text-foreground">Our Executive Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 rounded-none border border-border bg-card hover:border-primary/50 transition-all duration-300 text-left space-y-4 group shadow-sm"
              >
                <div className="relative aspect-square w-24 rounded-none overflow-hidden border border-border mx-auto sm:mx-0">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-display text-foreground font-bold group-hover:text-primary transition-colors">{member.name}</h4>
                  <p className="text-[10px] text-primary font-mono uppercase tracking-wider">{member.role}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
