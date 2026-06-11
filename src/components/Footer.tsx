"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Instagram, Linkedin, Twitter, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate submission
    setSubmitted(true);
    setEmail("");
  };

  const productLinks = [
    { name: "Terracotta Facades", href: "/products?category=facade" },
    { name: "Clay Roof Tiles", href: "/products?category=roof" },
    { name: "Architectural Bricks", href: "/products?category=brick" },
    { name: "Landscaping Pavers", href: "/products?category=paver" }
  ];

  const toolsLinks = [
    { name: "AI Facade Visualizer", href: "/ai-visualizer" },
    { name: "AI Product Finder", href: "/ai-finder" },
    { name: "Material Calculators", href: "/calculator" },
    { name: "Find Showrooms", href: "/dealers" }
  ];

  const companyLinks = [
    { name: "Our Story", href: "/about" },
    { name: "Sustainability Mission", href: "/about#sustainability" },
    { name: "Technical Resource Center", href: "/resources" },
    { name: "Insights & Articles", href: "/blog" }
  ];

  return (
    <footer className="bg-darksec border-t border-border/20 pt-20 pb-10 text-stone font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-border/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="group flex items-center gap-2" data-cursor="magnetic">
              <span className="w-8 h-8 rounded-none bg-primary flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:scale-105 transition-transform duration-300">P</span>
              <span className="font-display text-xl tracking-widest text-white group-hover:text-primary transition-colors duration-300">PCP</span>
            </Link>
            <p className="text-sm text-sand/80 leading-relaxed max-w-sm">
              Prayag Clay Production (PCP) crafts premium architectural surfaces, interlocking clay roofing tiles, facing bricks, and landscape paving systems. Marrying high geological materiality with sustainable circular design principles.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { Icon: Instagram, link: "#" },
                { Icon: Linkedin, link: "#" },
                { Icon: Twitter, link: "#" }
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  className="w-10 h-10 rounded-none border border-border/20 bg-darksec hover:border-primary/40 hover:bg-primary/5 text-sand hover:text-primary flex items-center justify-center transition-all duration-300"
                  data-cursor="magnetic"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-primary uppercase mb-6 font-semibold">Materials</h4>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-sand/80 hover:text-primary transition-colors duration-200" data-cursor="magnetic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Tools */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-primary uppercase mb-6 font-semibold">Digital Suite</h4>
            <ul className="space-y-4">
              {toolsLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-sand/80 hover:text-primary transition-colors duration-200" data-cursor="magnetic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono tracking-widest text-primary uppercase mb-2 font-semibold">Newsletter</h4>
              <p className="text-xs text-sand/60">Subscribe to get technical bulletins and architectural inspiration.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitted}
                className="w-full bg-darksec border border-border/20 rounded-none py-2.5 pl-3 pr-10 text-xs text-stone placeholder-sand/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitted}
                className="absolute right-1 p-1.5 rounded-none bg-primary text-white hover:bg-brick transition-colors disabled:bg-primary/20 disabled:text-muted-foreground cursor-pointer"
                aria-label="Subscribe"
                data-cursor="magnetic"
              >
                {submitted ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-primary font-mono tracking-wide"
                >
                  Subscription confirmed. Welcome.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4 text-xs text-sand/60">
          <p>© {new Date().getFullYear()} Prayag Clay Production. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
