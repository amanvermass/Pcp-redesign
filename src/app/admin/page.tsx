"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Hammer,
  Layers,
  BookOpen,
  Download,
  Mail,
  MapPin,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  Briefcase
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProducts, Product } from "@/data/mockProducts";
import { mockProjects } from "@/data/mockProjects";
import { mockBlogs } from "@/data/mockBlogs";
import { mockDealers } from "@/data/mockDealers";

// Mock analytics data
const salesData = [
  { month: "Jan", specs: 120, leads: 45 },
  { month: "Feb", specs: 150, leads: 52 },
  { month: "Mar", specs: 220, leads: 78 },
  { month: "Apr", specs: 180, leads: 62 },
  { month: "May", specs: 270, leads: 95 },
  { month: "Jun", specs: 310, leads: 110 }
];

export default function AdminDashboard() {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  // State: Management data (initialized from mocks)
  const [products, setProducts] = useState(mockProducts);
  const [projects, setProjects] = useState(mockProjects);
  const [blogs, setBlogs] = useState(mockBlogs);
  const [dealers, setDealers] = useState(mockDealers);
  
  // Mock Inquiries submitted
  const [leads, setLeads] = useState([
    { id: "lead-1", name: "Richard Rogers", email: "richard@rogerspartners.com", subject: "Singapore Cladding Specs", date: "June 11, 2026", status: "New" },
    { id: "lead-2", name: "Helena Schmidt", email: "h.schmidt@munichlab.de", subject: "Monarch Clay Roof Samples", date: "June 09, 2026", status: "Contacted" },
    { id: "lead-3", name: "David Chipperfield", email: "office@chipperfield.co.uk", subject: "Clinker Brick Loadbearing tests", date: "June 04, 2026", status: "Resolved" }
  ]);

  // Form states: New Product Add
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("facade");
  const [newProductPrice, setNewProductPrice] = useState("$$ - Premium");

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName) return;
    const newProd: Product = {
      id: `custom-prod-${Date.now()}`,
      name: newProductName,
      category: newProductCategory as "facade" | "roof" | "brick" | "paver",
      subcategory: "Custom Cladding",
      description: "Added via Admin Panel console manager.",
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"],
      colors: [{ name: "Custom Clay", hex: "#8A5A36" }],
      dimensions: "Custom",
      weight: "Custom",
      compressiveStrength: "40 MPa",
      waterAbsorption: "5%",
      sustainabilityRating: "Cradle to Cradle Certified",
      features: ["Custom architectural layout"],
      downloads: [],
      tags: [],
      priceEstimate: newProductPrice,
      coverage: "Custom"
    };
    setProducts((prev) => [newProd, ...prev]);
    setNewProductName("");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleLeadStatus = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const nextStatus = l.status === "New" ? "Contacted" : l.status === "Contacted" ? "Resolved" : "New";
          return { ...l, status: nextStatus };
        }
        return l;
      })
    );
  };

  // Nav categories sidebar
  const sidebarNav = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products Manager", icon: Hammer },
    { id: "projects", label: "Projects Case files", icon: Layers },
    { id: "blogs", label: "Blogs & Insights", icon: BookOpen },
    { id: "leads", label: "Inquiries (Leads)", icon: Mail },
    { id: "dealers", label: "Showrooms (Dealers)", icon: MapPin },
    { id: "analytics", label: "Metrics Analytics", icon: TrendingUp }
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans space-y-8">
        
        {/* Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            Platform Control Console
          </div>
          <h1 className="heading-premium text-3xl md:text-4xl text-foreground font-semibold">Console Manager</h1>
        </div>

        {/* Console grid (Sidebar + Workspace Panels) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Navigation Menu */}
          <div className="lg:col-span-3 space-y-1.5 text-left border-r border-border pr-4 h-fit">
            {sidebarNav.map((nav) => {
              const IconComp = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveScreen(nav.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-none text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeScreen === nav.id
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : "text-secondary-foreground hover:bg-sand/50 hover:text-primary"
                  }`}
                >
                  <IconComp className="w-4.5 h-4.5 shrink-0" />
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </div>

          {/* Workspaces Display Panel */}
          <div className="lg:col-span-9 p-6 glass-panel rounded-none border border-border text-left space-y-6 shadow-sm">
            
            {/* OVERVIEW SCREEN */}
            {activeScreen === "dashboard" && (
              <div className="space-y-8">
                <h3 className="heading-premium text-xl text-foreground">Platform Summary</h3>

                {/* Dashboard Metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-4 bg-sand border border-border rounded-none space-y-1 shadow-sm">
                    <span className="text-muted-foreground uppercase">Material count</span>
                    <p className="text-2xl text-foreground font-bold">{products.length}</p>
                  </div>
                  <div className="p-4 bg-sand border border-border rounded-none space-y-1 shadow-sm">
                    <span className="text-muted-foreground uppercase">Case landmarks</span>
                    <p className="text-2xl text-foreground font-bold">{projects.length}</p>
                  </div>
                  <div className="p-4 bg-sand border border-border rounded-none space-y-1 shadow-sm">
                    <span className="text-muted-foreground uppercase">Pending Inquiries</span>
                    <p className="text-2xl text-primary font-bold">{leads.filter(l => l.status !== "Resolved").length}</p>
                  </div>
                  <div className="p-4 bg-sand border border-border rounded-none space-y-1 shadow-sm">
                    <span className="text-muted-foreground uppercase">Active Showrooms</span>
                    <p className="text-2xl text-foreground font-bold">{dealers.length}</p>
                  </div>
                </div>

                {/* Area Chart: Specs downloads trends */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase">Specifier Activity Index</h4>
                  <div className="w-full h-64 bg-card border border-border p-4 rounded-none shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="colorSpecs" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B55A30" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#B55A30" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 44, 29, 0.12)" />
                        <XAxis dataKey="month" stroke="#555555" fontSize={10} />
                        <YAxis stroke="#555555" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "rgba(74, 44, 29, 0.12)", color: "#1F1F1F" }} />
                        <Area type="monotone" dataKey="specs" stroke="#B55A30" strokeWidth={2} fillOpacity={1} fill="url(#colorSpecs)" name="Spec Downloads" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCTS MANAGER SCREEN */}
            {activeScreen === "products" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <h3 className="heading-premium text-xl text-foreground">Products Catalog Database</h3>
                </div>

                {/* Quick Add Product Form */}
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-sand p-4 rounded-none border border-border items-end shadow-sm">
                  <div className="space-y-1 md:col-span-2 text-xs">
                    <label className="text-[9px] font-mono text-muted-foreground uppercase">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bronze Glazed Baguette"
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      className="w-full bg-card border border-border rounded-none p-2 text-foreground outline-none"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="text-[9px] font-mono text-muted-foreground uppercase">Category</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                      className="w-full bg-card border border-border rounded-none p-2 text-foreground outline-none"
                    >
                      <option value="facade">Facade</option>
                      <option value="roof">Roof</option>
                      <option value="brick">Brick</option>
                      <option value="paver">Paver</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-primary hover:bg-brick text-primary-foreground text-xs font-semibold rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Insert Spec
                  </button>
                </form>

                {/* List */}
                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3.5 rounded-none bg-card border border-border text-xs text-foreground shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-10 rounded-none object-cover border border-border shrink-0" />
                        <div>
                          <h4 className="font-semibold">{p.name}</h4>
                          <span className="text-[9px] text-primary font-mono uppercase mt-0.5 block">{p.subcategory} • {p.priceEstimate}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-500 rounded-none hover:bg-sand transition-all cursor-pointer"
                        title="Delete specs record"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS CASE WORKSPACE */}
            {activeScreen === "projects" && (
              <div className="space-y-6">
                <h3 className="heading-premium text-xl text-foreground">Project Case Profiles</h3>

                <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="flex items-center justify-between p-3.5 rounded-none bg-card border border-border text-xs text-foreground shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img src={proj.images[0]} alt="" className="w-12 h-9 rounded-none object-cover border border-border shrink-0" />
                        <div>
                          <h4 className="font-semibold">{proj.title}</h4>
                          <span className="text-[9px] text-muted-foreground font-mono uppercase mt-0.5 block">{proj.location} • By {proj.architect}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/projects/${proj.id}`}
                          className="p-1.5 text-muted-foreground hover:text-primary rounded-none hover:bg-sand transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOGS VIEW */}
            {activeScreen === "blogs" && (
              <div className="space-y-6">
                <h3 className="heading-premium text-xl text-foreground">Blogs & Article Drafts</h3>
                <div className="space-y-3">
                  {blogs.map((b) => (
                    <div
                      key={b.slug}
                      className="flex items-center justify-between p-3.5 rounded-none bg-card border border-border text-xs text-foreground shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img src={b.coverImage} alt="" className="w-12 h-9 rounded-none object-cover border border-border shrink-0" />
                        <div>
                          <h4 className="font-semibold truncate max-w-[280px]">{b.title}</h4>
                          <span className="text-[9px] text-primary font-mono uppercase mt-0.5 block">{b.category} • {b.date}</span>
                        </div>
                      </div>
                      <Link href={`/blog/${b.slug}`} className="p-1.5 text-muted-foreground hover:text-primary rounded-none hover:bg-sand transition-all">
                        <Eye className="w-4.5 h-4.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEADS PANEL */}
            {activeScreen === "leads" && (
              <div className="space-y-6">
                <h3 className="heading-premium text-xl text-foreground">Specification Inquiries</h3>

                <div className="space-y-3">
                  {leads.map((l) => (
                    <div
                      key={l.id}
                      className="p-4 rounded-none bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-foreground shadow-sm"
                    >
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{l.name}</span>
                          <span className="text-[10px] text-muted-foreground">({l.email})</span>
                        </div>
                        <h4 className="font-medium text-secondary-foreground">{l.subject}</h4>
                        <span className="text-[9px] text-muted-foreground font-mono block mt-0.5">Logged: {l.date}</span>
                      </div>

                      <div className="flex items-center gap-3 justify-between md:justify-end">
                        <span className={`px-2 py-0.5 rounded-none text-[9px] font-mono tracking-wide ${
                          l.status === "New"
                            ? "bg-red-500/20 text-red-550 border border-red-500/30"
                            : l.status === "Contacted"
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-green-500/20 text-green-700 border border-green-500/30"
                        }`}>
                          {l.status}
                        </span>

                        <button
                          onClick={() => handleToggleLeadStatus(l.id)}
                          className="px-3 py-1.5 rounded-none bg-card border border-border hover:border-primary text-[10px] font-mono hover:text-primary-foreground hover:bg-primary transition-all text-foreground cursor-pointer"
                        >
                          Cycle status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEALERS PANEL */}
            {activeScreen === "dealers" && (
              <div className="space-y-6">
                <h3 className="heading-premium text-xl text-foreground">Showroom Territories</h3>
                <div className="space-y-3">
                  {dealers.map((d) => (
                    <div
                      key={d.id}
                      className="p-3.5 rounded-none bg-card border border-border flex justify-between items-center text-xs text-foreground shadow-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] text-primary font-mono uppercase tracking-widest">{d.type}</span>
                        <h4 className="font-semibold">{d.name}</h4>
                        <p className="text-[10px] text-muted-foreground">{d.address}</p>
                      </div>
                      <Link href="/dealers" className="p-1.5 text-muted-foreground hover:text-primary rounded-none hover:bg-sand transition-all">
                        <MapPin className="w-4.5 h-4.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ANALYTICS SCREEN */}
            {activeScreen === "analytics" && (
              <div className="space-y-8">
                <h3 className="heading-premium text-xl text-foreground">Metrics Insights</h3>

                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase">Inquiry Conversion trends</h4>
                  <div className="w-full h-64 bg-card border border-border p-4 rounded-none shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 44, 29, 0.12)" />
                        <XAxis dataKey="month" stroke="#555555" fontSize={10} />
                        <YAxis stroke="#555555" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "rgba(74, 44, 29, 0.12)", color: "#1F1F1F" }} />
                        <Bar dataKey="leads" fill="#B55A30" name="Design Brief Leads" radius={[0, 0, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
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
