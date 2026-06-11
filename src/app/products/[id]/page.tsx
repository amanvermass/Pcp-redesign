"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Send, RefreshCw, Check, Layers, ShieldCheck, Mail, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Tabs from "@/components/ui/Tabs";
import Accordion from "@/components/ui/Accordion";
import Modal from "@/components/ui/Modal";
import { mockProducts } from "@/data/mockProducts";

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string };
  const product = mockProducts.find((p) => p.id === id);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");
  // Specs tabs state
  const [activeTab, setActiveTab] = useState("physical");
  // Inquiry form modal state
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");

  // Product Comparison state (stored in local storage/react state)
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6 bg-background text-foreground">
          <h2 className="text-2xl font-display text-foreground font-semibold">Material Not Found</h2>
          <Link href="/products" className="inline-block px-6 py-2.5 bg-primary hover:bg-brick text-white rounded-none text-sm font-semibold transition-colors cursor-pointer">
            Return to Catalog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Related products
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const toggleCompare = (prodId: string) => {
    setComparisonList((prev) =>
      prev.includes(prodId) ? prev.filter((i) => i !== prodId) : [...prev, prodId].slice(0, 3)
    );
  };

  const clearCompare = () => setComparisonList([]);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryOpen(false);
      setInquiryEmail("");
      setInquiryMsg("");
    }, 2500);
  };

  // Specs options
  const detailTabs = [
    { id: "physical", label: "Physical Dimensions" },
    { id: "performance", label: "Mechanical Metrics" },
    { id: "sustainability", label: "Sustainability & Fire" }
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 font-sans bg-background text-foreground">
        
        {/* Back Link */}
        <div className="text-left">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-mono uppercase font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Materials Catalog
          </Link>
        </div>

        {/* Product Hero block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-none overflow-hidden border border-border bg-sand">
              <img src={selectedImage || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[4/3] w-20 rounded-none overflow-hidden border transition-all cursor-pointer ${
                    (selectedImage || product.images[0]) === img ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-primary uppercase font-semibold">{product.subcategory}</span>
              <h1 className="heading-premium text-3xl md:text-4xl text-foreground font-bold leading-tight">{product.name}</h1>
              <p className="text-xs text-muted-foreground font-mono uppercase font-semibold">{product.priceEstimate}</p>
            </div>

            <p className="text-sm text-secondary-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground uppercase font-semibold">Available Shade Profiles:</span>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-sand/30 border border-border">
                    <span className="w-3.5 h-3.5 rounded-none border border-border" style={{ backgroundColor: c.hex }} />
                    <span className="text-[10px] text-foreground font-medium">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
              <button
                onClick={() => setInquiryOpen(true)}
                className="flex-1 py-3 rounded-none bg-primary hover:bg-brick text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-4.5 h-4.5" />
                Request Specification Inquiry
              </button>
              
              <button
                onClick={() => toggleCompare(product.id)}
                className={`flex px-4 py-3 rounded-none border text-sm font-semibold tracking-wide flex-shrink-0 transition-colors cursor-pointer ${
                  comparisonList.includes(product.id)
                    ? "bg-primary text-white border-primary"
                    : "border-brown bg-white text-brown hover:bg-brown/5"
                }`}
              >
                <RefreshCw className={`w-4.5 h-4.5 mr-2 ${comparisonList.includes(product.id) ? "animate-spin-slow" : ""}`} />
                {comparisonList.includes(product.id) ? "Selected to Compare" : "Compare Material"}
              </button>
            </div>

            {/* Feature lists */}
            <div className="pt-4 space-y-2.5">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical spec sheets & Download tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border pt-16">
          {/* Tabs Details Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="heading-premium text-2xl text-foreground font-semibold">Performance Parameters</h3>
            <Tabs tabs={detailTabs} activeTab={activeTab} onChange={setActiveTab} />
            
            <div className="bg-card p-6 rounded-none border border-border shadow-sm">
              <AnimatePresence mode="wait">
                {activeTab === "physical" && (
                  <motion.div
                    key="physical"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm"
                  >
                    <div>
                      <span className="text-xs text-muted-foreground font-mono font-semibold">Format Dimensions</span>
                      <p className="text-foreground font-medium mt-1">{product.dimensions}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-mono font-semibold">Material Weight</span>
                      <p className="text-foreground font-medium mt-1">{product.weight}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-mono font-semibold">Standard Coverage</span>
                      <p className="text-foreground font-medium mt-1">{product.coverage}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "performance" && (
                  <motion.div
                    key="performance"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm"
                  >
                    <div>
                      <span className="text-xs text-muted-foreground font-mono font-semibold">Compressive Load Strength</span>
                      <p className="text-foreground font-medium mt-1">{product.compressiveStrength}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-mono font-semibold">Water Absorption rate</span>
                      <p className="text-foreground font-medium mt-1">{product.waterAbsorption}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "sustainability" && (
                  <motion.div
                    key="sustainability"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm"
                  >
                    <div>
                      <span className="text-xs text-muted-foreground font-mono font-semibold">Ecological Rating</span>
                      <p className="text-foreground font-medium mt-1">{product.sustainabilityRating}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-mono font-semibold">Fire Resistance Rating</span>
                      <p className="text-foreground font-medium mt-1">Class A1 Non-Combustible</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Downloads Block Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="heading-premium text-2xl text-foreground font-semibold">Technical Downloads</h3>
            <div className="space-y-3">
              {product.downloads.map((dl, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-none border border-border bg-sand/20 hover:border-primary/30 transition-all duration-300 shadow-sm"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-semibold">{dl.type}</span>
                    <h4 className="text-xs font-semibold text-foreground truncate max-w-[200px] md:max-w-xs">{dl.name}</h4>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white border border-border hover:border-primary hover:text-white hover:bg-primary text-xs font-medium text-foreground transition-all cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                    <span>{dl.size}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-16 space-y-8">
            <h3 className="heading-premium text-2xl text-foreground text-left font-semibold">Alternative Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="flex flex-col rounded-none overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-300 group shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  </div>
                  <div className="p-5 space-y-3 text-left">
                    <span className="text-[9px] text-muted-foreground font-mono uppercase font-semibold">{p.subcategory}</span>
                    <h4 className="text-base font-display text-foreground font-medium leading-snug group-hover:text-primary transition-colors line-clamp-1">{p.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* STICKY COMPARISON DRAWER */}
      <AnimatePresence>
        {comparisonList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-35 bg-card border-t-2 border-primary shadow-2xl p-4 flex items-center justify-between font-sans max-w-7xl mx-auto rounded-none"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider hidden md:inline">Compare materials:</span>
              <div className="flex gap-2">
                {comparisonList.map((compId) => {
                  const compProd = mockProducts.find((p) => p.id === compId);
                  return (
                    <div key={compId} className="flex items-center gap-2 bg-sand border border-border rounded-none p-1.5 text-xs text-foreground">
                      <img src={compProd?.images[0]} alt="" className="w-6 h-6 rounded-none object-cover" />
                      <span className="truncate max-w-[80px] md:max-w-[120px] font-semibold">{compProd?.name}</span>
                      <button onClick={() => toggleCompare(compId)} className="text-muted-foreground hover:text-primary cursor-pointer font-bold ml-1">×</button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="text-xs text-muted-foreground hover:text-foreground underline font-mono cursor-pointer"
              >
                Clear all
              </button>
              <button
                onClick={() => setComparisonModalOpen(true)}
                className="px-4 py-2 rounded-none bg-primary hover:bg-brick text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Compare Side-by-Side
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPARISON MODAL DIALOG */}
      <Modal isOpen={comparisonModalOpen} onClose={() => setComparisonModalOpen(false)} title="Material Specs Comparison">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
            {comparisonList.map((cId) => {
              const cp = mockProducts.find((x) => x.id === cId);
              return (
                <div key={cId} className="space-y-2 text-center">
                  <div className="relative aspect-video rounded-none overflow-hidden border border-border">
                    <img src={cp?.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground truncate">{cp?.name}</h4>
                  <span className="text-[10px] text-primary font-mono font-semibold">{cp?.priceEstimate}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 text-xs text-left">
            {/* Dimensions row */}
            <div className="grid grid-cols-4 gap-4 border-b border-border py-2">
              <span className="text-muted-foreground font-mono font-semibold">Dimensions</span>
              {comparisonList.map((cId) => {
                const cp = mockProducts.find((x) => x.id === cId);
                return <span key={cId} className="text-foreground font-medium col-span-1">{cp?.dimensions}</span>;
              })}
            </div>

            {/* Weight row */}
            <div className="grid grid-cols-4 gap-4 border-b border-border py-2">
              <span className="text-muted-foreground font-mono font-semibold">Weight</span>
              {comparisonList.map((cId) => {
                const cp = mockProducts.find((x) => x.id === cId);
                return <span key={cId} className="text-foreground font-medium col-span-1">{cp?.weight}</span>;
              })}
            </div>

            {/* Compressive Strength row */}
            <div className="grid grid-cols-4 gap-4 border-b border-border py-2">
              <span className="text-muted-foreground font-mono font-semibold">Strength</span>
              {comparisonList.map((cId) => {
                const cp = mockProducts.find((x) => x.id === cId);
                return <span key={cId} className="text-foreground font-medium col-span-1">{cp?.compressiveStrength}</span>;
              })}
            </div>

            {/* Absorption row */}
            <div className="grid grid-cols-4 gap-4 border-b border-border py-2">
              <span className="text-muted-foreground font-mono font-semibold">Absorption</span>
              {comparisonList.map((cId) => {
                const cp = mockProducts.find((x) => x.id === cId);
                return <span key={cId} className="text-foreground font-medium col-span-1">{cp?.waterAbsorption}</span>;
              })}
            </div>

            {/* Eco Cert row */}
            <div className="grid grid-cols-4 gap-4 border-b border-border py-2">
              <span className="text-muted-foreground font-mono font-semibold">Certifications</span>
              {comparisonList.map((cId) => {
                const cp = mockProducts.find((x) => x.id === cId);
                return <span key={cId} className="text-foreground font-medium col-span-1">{cp?.sustainabilityRating}</span>;
              })}
            </div>
          </div>
        </div>
      </Modal>

      {/* INQUIRY MODAL */}
      <Modal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} title="Request Specification Inquiry">
        {inquirySubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-none bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
              <Send className="w-5 h-5 animate-pulse" />
            </div>
            <h4 className="text-lg font-display text-foreground font-semibold">Inquiry Sent Successfully</h4>
            <p className="text-xs text-muted-foreground">Our technical consulting department will contact you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleInquiry} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider font-semibold">Material Requested</label>
              <input
                type="text"
                value={product.name}
                disabled
                className="w-full bg-sand/30 border border-border rounded-none p-2.5 text-xs text-muted-foreground outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider font-semibold">Your Contact Email</label>
              <input
                type="email"
                required
                placeholder="architect@firm.com"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                className="w-full bg-white border border-border rounded-none p-2.5 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-foreground"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider font-semibold">Project Description / Special Specifications</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your design, quantity estimations, thermal goals..."
                value={inquiryMsg}
                onChange={(e) => setInquiryMsg(e.target.value)}
                className="w-full bg-white border border-border rounded-none p-2.5 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none font-medium text-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-none bg-primary hover:bg-brick text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Brief to Consultation Team
            </button>
          </form>
        )}
      </Modal>

      <Footer />
    </>
  );
}
