"use client";

import React, { useState, useEffect, useRef } from "react";
import { Compass, Heart, Bookmark, Plus, Share2, Eye, FolderPlus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/ui/Modal";

// Extended items for inspiration gallery
interface InspirationItem {
  id: string;
  title: string;
  image: string;
  architect: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  category: "clay" | "facade" | "roof" | "paver";
}

const initialInspirationItems: InspirationItem[] = [
  {
    id: "insp-1",
    title: "Linear Shadow Terracotta Lines",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    architect: "Herzog & de Meuron",
    likes: 142,
    liked: false,
    saved: false,
    category: "facade"
  },
  {
    id: "insp-2",
    title: "Double interlocking red tile joints",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80",
    architect: "Renzo Piano Workshop",
    likes: 98,
    liked: false,
    saved: false,
    category: "roof"
  },
  {
    id: "insp-3",
    title: "Longformat roman brick masonry detail",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    architect: "David Chipperfield",
    likes: 215,
    liked: false,
    saved: false,
    category: "clay"
  },
  {
    id: "insp-4",
    title: "Platinum glazed sunshade baguettes reflections",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    architect: "WOHA Architects",
    likes: 310,
    liked: false,
    saved: false,
    category: "facade"
  },
  {
    id: "insp-5",
    title: "Minimalist slate monolithic residential roof",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    architect: "Studio K",
    likes: 87,
    liked: false,
    saved: false,
    category: "roof"
  },
  {
    id: "insp-6",
    title: "Pedestrian plaza Herringbone paver layout",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    architect: "Cino Zucchi Studio",
    likes: 120,
    liked: false,
    saved: false,
    category: "paver"
  }
];

export default function InspirationHub() {
  const [items, setItems] = useState<InspirationItem[]>(initialInspirationItems);
  const [activeTab, setActiveTab] = useState<"all" | "facade" | "roof" | "clay" | "paver">("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Collections state
  const [collections, setCollections] = useState<string[]>(["Modern Commercials", "Minimalist Homes", "Earth Textures"]);
  const [newColName, setNewColName] = useState("");
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [selectedItemForCollection, setSelectedItemForCollection] = useState<string | null>(null);

  // Filter items
  const filteredItems = activeTab === "all"
    ? items
    : items.filter((item) => item.category === activeTab);

  // Like button handler
  const handleLike = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            liked: !item.liked,
            likes: item.liked ? item.likes - 1 : item.likes + 1
          };
        }
        return item;
      })
    );
  };

  // Open Save to Collection Modal
  const openSave = (id: string) => {
    setSelectedItemForCollection(id);
    setCollectionModalOpen(true);
  };

  // Confirm Save to Collection
  const saveToCollection = (colName: string) => {
    if (!selectedItemForCollection) return;
    
    // Toggle save status
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === selectedItemForCollection) {
          return { ...item, saved: true };
        }
        return item;
      })
    );
    setCollectionModalOpen(false);
    setSelectedItemForCollection(null);
  };

  // Create new collection
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    setCollections((prev) => [...prev, newColName.trim()]);
    setNewColName("");
  };

  // Infinite Scroll simulator via button click or trigger
  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      const extraItems: InspirationItem[] = [
        {
          id: `insp-extra-${page}-1`,
          title: `Terracotta louvers structure ${page}`,
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
          architect: "Chipperfield Munich",
          likes: 42,
          liked: false,
          saved: false,
          category: "facade"
        },
        {
          id: `insp-extra-${page}-2`,
          title: `High density clinker wall panels ${page}`,
          image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80",
          architect: "Herzog Zurich",
          likes: 67,
          liked: false,
          saved: false,
          category: "clay"
        }
      ];
      setItems((prev) => [...prev, ...extraItems]);
      setPage((p) => p + 1);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans bg-background text-foreground">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            <Compass className="w-3.5 h-3.5" />
            Inspiration Hub
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold font-display">Architectural Canvas</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            A premium collection of high-tactility masonry patterns, textured facades, and modular assemblies curated for specifier reference.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 justify-start overflow-x-auto pb-2 border-b border-border">
          {[
            { id: "all", label: "All Inspirations" },
            { id: "facade", label: "Facades & Sunshades" },
            { id: "roof", label: "Clay Roofs" },
            { id: "clay", label: "Bricks & Blocks" },
            { id: "paver", label: "Paved Grounds" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "all" | "facade" | "roof" | "clay" | "paver")}
              className={`px-4 py-2 rounded-none text-xs font-semibold border shrink-0 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary text-white border-primary"
                  : "bg-sand/40 border-border text-muted-foreground hover:text-foreground hover:bg-sand/70 hover:border-primary/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid relative rounded-none overflow-hidden border border-border bg-card group shadow-md"
            >
              {/* Image */}
              <img src={item.image} alt={item.title} className="w-full object-cover" />

              {/* Top save overlay (hidden on default desktop, shown on hover/touch) */}
              <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => openSave(item.id)}
                  className={`p-2 rounded-none border shadow-md flex items-center justify-center transition-all cursor-pointer ${
                    item.saved
                      ? "bg-primary border-primary text-white"
                      : "bg-darksec border-darksec text-white hover:bg-darksec/80"
                  }`}
                  title="Save to Collection"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom detail overlay */}
              <div className="absolute inset-0 bg-darksec/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-left space-y-3">
                <div>
                  <h4 className="text-sm font-display text-white font-semibold leading-snug">{item.title}</h4>
                  <span className="text-[10px] text-muted-foreground font-mono mt-0.5">By {item.architect}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  {/* Likes */}
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1 text-[10px] font-mono transition-colors cursor-pointer ${
                      item.liked ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${item.liked ? "fill-primary text-primary" : ""}`} />
                    <span>{item.likes}</span>
                  </button>

                  <button
                    onClick={() => openSave(item.id)}
                    className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>{item.saved ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Scroll simulator trigger */}
        <div className="pt-8 text-center">
          <button
            onClick={loadMoreItems}
            disabled={loading}
            className="px-6 py-3 rounded-none border border-brown bg-white hover:bg-brown/5 text-brown text-xs font-semibold tracking-wide flex items-center gap-2 mx-auto disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Syncing Canvas Library...
              </>
            ) : (
              <>
                <span>Load More Inspirations</span>
              </>
            )}
          </button>
        </div>

      </main>

      {/* SAVE TO COLLECTION MODAL */}
      <Modal isOpen={collectionModalOpen} onClose={() => setCollectionModalOpen(false)} title="Save to Project Collection">
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Choose target Collection</span>
            <div className="space-y-1.5">
              {collections.map((colName) => (
                <button
                  key={colName}
                  onClick={() => saveToCollection(colName)}
                  className="w-full flex items-center justify-between p-3 rounded-none bg-sand/30 border border-border hover:border-primary/30 hover:bg-sand/50 text-xs font-semibold text-foreground transition-all text-left cursor-pointer"
                >
                  <span>{colName}</span>
                  <Check className="w-4 h-4 text-primary opacity-0 hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Create collection form */}
          <form onSubmit={handleCreateCollection} className="pt-4 border-t border-border space-y-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block font-semibold">Create New Collection</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Italian Terracotta Facades"
                required
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                className="flex-1 bg-white border border-border rounded-none px-3 py-2 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-all font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-brick text-white text-xs font-semibold rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Footer />
    </>
  );
}
