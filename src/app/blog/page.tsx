"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Search, ArrowRight, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockBlogs } from "@/data/mockBlogs";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const featuredArticle = mockBlogs.find((b) => b.featured) || mockBlogs[0];
  const remainingArticles = mockBlogs.filter((b) => b.slug !== featuredArticle.slug);
  const trendingArticles = mockBlogs.filter((b) => b.trending);

  // Filter remaining articles
  const filteredArticles = useMemo(() => {
    let result = [...remainingArticles];

    if (searchQuery) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory, remainingArticles]);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 font-sans bg-background text-foreground">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Insights & Material Bulletins
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold font-display">AURA Journal</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Explore advanced articles on passive architecture, clinker clay physics, cradle-to-cradle sourcing, and green building envelopes.
          </p>
        </div>

        {/* FEATURED BANNER */}
        {featuredArticle && (
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="block rounded-none overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-500 group text-left shadow-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden border-r border-border">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6 bg-sand/10">
                <div className="space-y-4">
                  <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 rounded-none px-3 py-1 font-semibold">
                    Featured Insight
                  </span>
                  <h2 className="heading-premium text-2xl md:text-3xl text-foreground font-semibold group-hover:text-primary transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={featuredArticle.author.avatar} alt="" className="w-8 h-8 rounded-none object-cover border border-border" />
                    <div>
                      <span className="text-xs font-semibold text-foreground block">{featuredArticle.author.name}</span>
                      <span className="text-[10px] text-muted-foreground">{featuredArticle.author.role}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground font-semibold">{featuredArticle.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Toolbar & Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <h3 className="heading-premium text-2xl text-foreground font-semibold font-display">Latest Technical Publications</h3>

            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4 border-b border-border">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-border rounded-none pl-9 pr-4 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary outline-none transition-all"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1">
                {["all", "Design Trends", "Technical Innovations", "Sustainability"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-none text-[10px] font-semibold border shrink-0 transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-primary text-white border-primary"
                        : "bg-sand/40 border-border text-muted-foreground hover:text-foreground hover:bg-sand/70 hover:border-primary/30"
                    }`}
                  >
                    {cat === "all" ? "All categories" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Feed Grid */}
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground text-sm border border-dashed border-border rounded-none shadow-sm bg-card">
                No articles matches your query keyword.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredArticles.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/blog/${b.slug}`}
                    className="flex flex-col rounded-none overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-300 group shadow-sm"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                      <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] text-primary font-mono tracking-widest uppercase font-semibold">{b.category}</span>
                        <h4 className="text-base font-display text-foreground font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">{b.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{b.excerpt}</p>
                      </div>
                      <div className="pt-3 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground font-mono font-semibold">
                        <span>{b.date}</span>
                        <span>{b.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Trending Column */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="bg-card p-6 rounded-none border border-border space-y-6 shadow-sm">
              <h3 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-2">
                Trending Articles
              </h3>

              <div className="space-y-4">
                {trendingArticles.map((trend, idx) => (
                  <Link
                    key={trend.slug}
                    href={`/blog/${trend.slug}`}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="text-2xl font-display font-bold text-primary/30 group-hover:text-primary transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest font-semibold">{trend.category}</span>
                      <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {trend.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
