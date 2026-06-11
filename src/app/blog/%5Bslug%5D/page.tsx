"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockBlogs } from "@/data/mockBlogs";

export default function BlogDetailPage() {
  const { slug } = useParams() as { slug: string };
  const article = mockBlogs.find((b) => b.slug === slug);

  // Scroll reading progress
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
          <h2 className="text-2xl font-display text-foreground">Article Not Found</h2>
          <Link href="/blog" className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-none text-sm font-semibold transition-colors hover:bg-brick">
            Return to Journal
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Related articles
  const relatedArticles = mockBlogs.filter((b) => b.slug !== article.slug).slice(0, 2);

  return (
    <>
      {/* Sticky top reading progress indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
        
        {/* Back Link */}
        <div className="text-left">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal Listing
          </Link>
        </div>

        {/* Article Cover block */}
        <div className="space-y-6 text-left max-w-4xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 rounded-none px-3 py-1">
            {article.category}
          </span>
          <h1 className="heading-premium text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 pt-4 border-y border-border py-4 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              <span className="text-foreground">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Full Image */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/8] rounded-none overflow-hidden border border-border shadow-md">
          <img src={article.coverImage} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Article Body + Sticky TOC layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Sticky TOC */}
          <div className="lg:col-span-3 hidden lg:block sticky top-28 text-left">
            <div className="bg-card p-5 rounded-none border border-border space-y-4 shadow-sm">
              <h4 className="text-xs font-mono tracking-widest text-primary uppercase font-bold border-b border-border pb-2">
                Table of Contents
              </h4>
              <ul className="space-y-3 text-[11px] font-mono leading-relaxed">
                {article.toc.map((tocItem) => (
                  <li key={tocItem.id}>
                    <a
                      href={`#${tocItem.id}`}
                      className="text-muted-foreground hover:text-primary transition-colors block border-l border-border pl-2 hover:border-primary"
                    >
                      {tocItem.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: HTML Content */}
          <div className="lg:col-span-9 text-left">
            <article
              className="prose prose-sm md:prose-base max-w-none text-secondary-foreground leading-relaxed space-y-6
                prose-headings:font-display prose-headings:text-foreground prose-headings:font-semibold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                prose-p:mb-6 prose-p:text-sm md:prose-p:text-base"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </div>

        </div>

        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-border pt-16 space-y-8 max-w-5xl mx-auto">
            <h3 className="heading-premium text-2xl text-foreground text-left">Related Technical Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blog/${b.slug}`}
                  className="flex flex-col md:flex-row gap-6 p-4 rounded-none border border-border bg-card hover:border-primary/50 transition-all duration-300 text-left group shadow-sm"
                >
                  <div className="relative w-full md:w-36 aspect-[16/10] md:aspect-square rounded-none overflow-hidden bg-muted flex-shrink-0">
                    <img src={b.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
                    <div className="space-y-2">
                      <span className="text-[9px] text-primary font-mono uppercase tracking-widest">{b.category}</span>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">{b.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{b.excerpt}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{b.date} • {b.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
