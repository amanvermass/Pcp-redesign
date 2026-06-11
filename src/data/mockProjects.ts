export interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  country: string;
  architect: string;
  year: string;
  category: "Residential" | "Commercial" | "Institutional" | "Hospitality";
  description: string;
  productsUsed: string[]; // IDs of products
  images: string[];
  details: ProjectDetail[];
  featured: boolean;
}

export const mockProjects: Project[] = [
  {
    id: "monolith-house",
    title: "The Monolith House",
    location: "Zurich",
    country: "Switzerland",
    architect: "Herzog & de Meuron",
    year: "2025",
    category: "Residential",
    description: "A private woodland villa designed as an absolute sculpture of clay and light. Romanesque Longformat bricks create a continuous, rough textured envelope that folds into internal courtyards, marrying local geology with contemporary minimalist detailing.",
    productsUsed: ["handmade-longformat-1", "flat-slate-roof-2"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    details: [
      { label: "Gross Floor Area", value: "450 sqm" },
      { label: "Structural Material", value: "Loadbearing clay blockwork & custom handmade facing bricks" },
      { label: "Sustainability", value: "Minergie-P eco certified" },
      { label: "Acoustics", value: "Class A sound absorption lining" }
    ],
    featured: true
  },
  {
    id: "aero-tower",
    title: "Aero Sunshade Tower",
    location: "Singapore",
    country: "Singapore",
    architect: "WOHA Architects",
    year: "2024",
    category: "Commercial",
    description: "A high-rise tower utilizing over 8,000 linear meters of Aero Glazed Terracotta Louvers in customized platinum glazes. The facades shift colors throughout the day based on ambient light, reducing HVAC loads by 28% through custom passive thermal deflection.",
    productsUsed: ["glazed-louver-2", "terracotta-linear-1"],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    details: [
      { label: "Height", value: "142 meters" },
      { label: "Façade Area", value: "12,500 sqm" },
      { label: "Green Rating", value: "BCA Green Mark Platinum" },
      { label: "Glaze Finish", value: "Dynamic Platinum-Teal Reflective Glaze" }
    ],
    featured: true
  },
  {
    id: "lakeside-resort",
    title: "Lakeside Monarch Pavilion",
    location: "Como",
    country: "Italy",
    architect: "Cino Zucchi Architetti",
    year: "2024",
    category: "Hospitality",
    description: "Nestled in the cliffs overlooking Lake Como, this boutique resort features sweeping roof contours tiled in Heritage Monarch Red tiles. The classic wave pattern reflects traditional Italian roofing, executed with heavy dual-interlocking storm resistance.",
    productsUsed: ["heritage-pantile-1", "clay-paver-premium-1"],
    images: [
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    details: [
      { label: "Project Scope", value: "Luxury hotel wings & pedestrian walkways" },
      { label: "Roof Slope", value: "32 degrees" },
      { label: "Landscape Area", value: "3,200 sqm paved courtyard" },
      { label: "Clay Source", value: "Siena Pit - Premium Terracotta Clay" }
    ],
    featured: true
  },
  {
    id: "vanguard-museum",
    title: "The Brutalist Clay Museum",
    location: "Munich",
    country: "Germany",
    architect: "David Chipperfield",
    year: "2025",
    category: "Institutional",
    description: "A monumental civic museum constructed entirely with Vanguard Heavy Clinker bricks. The monolithic walls express pure mass, punctuated by deep vertical window slots, embodying a timeless, heavy masonry tradition.",
    productsUsed: ["engineered-clinker-2"],
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
    ],
    details: [
      { label: "Client", value: "Bavarian State Gallery" },
      { label: "Compressive Load", value: "85 MPa foundation columns" },
      { label: "Acoustics", value: "Irregular clinker relief patterns for reverberation reduction" },
      { label: "Building Lifespan", value: "Designed for 200+ years" }
    ],
    featured: false
  }
];
