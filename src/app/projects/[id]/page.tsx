"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, User, CheckCircle, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProjects } from "@/data/mockProjects";
import { mockProducts } from "@/data/mockProducts";

export default function ProjectDetailPage() {
  const { id } = useParams() as { id: string };
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6 bg-background text-foreground">
          <h2 className="text-2xl font-display text-foreground font-semibold">Project Case File Not Found</h2>
          <Link href="/projects" className="inline-block px-6 py-2.5 bg-primary hover:bg-brick text-white rounded-none text-sm font-semibold transition-colors cursor-pointer">
            Return to Projects
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Derive products used
  const usedProducts = mockProducts.filter((p) => project.productsUsed.includes(p.id));

  // Related projects
  const relatedProjects = mockProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <>
      <Navbar />

      <main className="space-y-20 pb-20 font-sans bg-background text-foreground">
        
        {/* Full-width cinematic hero */}
        <section className="relative w-full h-[60vh] flex items-end justify-start overflow-hidden border-b border-border">
          <img
            src={project.images[0]}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle contrast dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-darksec/90 via-darksec/40 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full pb-10 space-y-4 text-left">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-white transition-colors font-mono uppercase font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
            
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 rounded-none px-3 py-1 font-semibold">
                {project.category}
              </span>
              <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Project details & specs grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h3 className="heading-premium text-2xl text-foreground font-semibold">Project Overview</h3>
              <p className="text-sm md:text-base text-secondary-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Detail Gallery */}
            <div className="space-y-4 pt-6">
              <h3 className="heading-premium text-2xl text-foreground font-semibold">Detail Gallery</h3>
              <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                {project.images.slice(1).map((img, idx) => (
                  <div key={idx} className="break-inside-avoid relative rounded-none overflow-hidden border border-border group shadow-sm">
                    <img src={img} alt="" className="w-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Info card */}
            <div className="bg-card p-6 rounded-none border border-border space-y-4 shadow-sm">
              <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-2">
                Project File Metrics
              </h4>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <User className="w-4.5 h-4.5 text-primary shrink-0" />
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-mono font-semibold">Architect</span>
                    <span className="text-foreground font-semibold">{project.architect}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4.5 h-4.5 text-primary shrink-0" />
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-mono font-semibold">Location</span>
                    <span className="text-foreground font-semibold">{project.location}, {project.country}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4.5 h-4.5 text-primary shrink-0" />
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-mono font-semibold">Completed Year</span>
                    <span className="text-foreground font-semibold">{project.year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials Used list */}
            <div className="bg-card p-6 rounded-none border border-border space-y-4 shadow-sm">
              <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-2">
                Materials Configured
              </h4>
              <div className="space-y-3">
                {usedProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="flex items-center justify-between p-2.5 rounded-none bg-sand/20 border border-border hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-none overflow-hidden flex-shrink-0 border border-border">
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      </span>
                      <div className="text-left">
                        <h5 className="text-[11px] font-semibold text-foreground truncate max-w-[150px] group-hover:text-primary transition-colors">{p.name}</h5>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono mt-0.5 font-semibold">{p.subcategory}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Project Specifications list */}
            <div className="bg-card p-6 rounded-none border border-border space-y-4 shadow-sm">
              <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-2">
                Construction Details
              </h4>
              <div className="space-y-3">
                {project.details.map((detail, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <span className="text-muted-foreground text-[10px] block font-mono font-semibold">{detail.label}</span>
                    <p className="text-foreground font-semibold">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RELATED PROJECTS */}
        {relatedProjects.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border pt-16 space-y-8">
            <h3 className="heading-premium text-2xl text-foreground text-left font-semibold">Alternative Case Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${proj.id}`}
                  className="flex flex-col md:flex-row gap-6 p-4 rounded-none border border-border bg-card hover:border-primary/30 transition-all duration-300 text-left group shadow-sm"
                >
                  <div className="relative w-full md:w-48 aspect-[16/10] md:aspect-square rounded-none overflow-hidden bg-sand flex-shrink-0 border border-border">
                    <img src={proj.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
                    <div className="space-y-2">
                      <span className="bg-darksec border border-darksec px-2 py-0.5 text-[9px] font-mono tracking-widest text-white rounded-none uppercase font-semibold">
                        {proj.category}
                      </span>
                      <h4 className="text-base font-display text-foreground font-medium group-hover:text-primary transition-colors">{proj.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{proj.description}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono font-semibold">{proj.location} • By {proj.architect}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
