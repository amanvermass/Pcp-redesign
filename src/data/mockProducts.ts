export interface ProductDownload {
  type: "BIM" | "CAD" | "Brochure" | "Specification" | "Certificate";
  name: string;
  size: string;
}

export interface Product {
  id: string;
  name: string;
  category: "facade" | "roof" | "brick" | "paver";
  subcategory: string;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  dimensions: string;
  weight: string;
  compressiveStrength: string;
  waterAbsorption: string;
  sustainabilityRating: string;
  features: string[];
  downloads: ProductDownload[];
  tags: string[];
  priceEstimate: string; // e.g. "$$ - Premium"
  coverage: string; // e.g. "48 bricks per sqm"
  
  // New international architect spec fields:
  uValue?: string; // Thermal transmittance (W/m²K)
  thermalConductivity?: string; // Lambda value (W/mK)
  acousticRating?: string; // Sound reduction index (dB)
  fireRating?: string; // Fire resistance class
  cadTexture?: {
    albedo: string; // Hex albedo color
    roughness: number; // 0.0 to 1.0
    metalness: number; // 0.0 to 1.0
    resolution: string; // Resolution standard
    maps: string[]; // Map file types included
  };
}

export const mockProducts: Product[] = [
  {
    id: "terracotta-linear-1",
    name: "Linear Terracotta Cladding Panel",
    category: "facade",
    subcategory: "Terracotta Panels",
    description: "Architectural grade terracotta facade panel with a linear grooved texture. Ideal for modern commercial high-rises demanding a natural, warm, and highly breathable external envelope.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    colors: [
      { name: "Sienna Bronze", hex: "#8A5A36" },
      { name: "Charcoal Obsidian", hex: "#2B2D2F" },
      { name: "Tuscan Ochre", hex: "#C28E58" }
    ],
    dimensions: "1200 x 300 x 30 mm",
    weight: "38 kg/m²",
    compressiveStrength: ">= 40 MPa",
    waterAbsorption: "< 6%",
    sustainabilityRating: "LEED Gold Certified",
    features: [
      "Rear-ventilated rainscreen system compatibility",
      "High frost resistance and thermal efficiency",
      "Self-cleaning hydrophilic surface coating",
      "100% natural, recyclable clay construction"
    ],
    downloads: [
      { type: "BIM", name: "Linear_Terracotta_Cladding_Revit_v2.rfa", size: "4.2 MB" },
      { type: "CAD", name: "Linear_Terracotta_Section_Details.dwg", size: "1.8 MB" },
      { type: "Brochure", name: "Premium_Facade_Systems_2026.pdf", size: "12.4 MB" },
      { type: "Specification", name: "Ventilated_Facade_Specs_Section_07.doc", size: "350 KB" }
    ],
    tags: ["Commercial", "Modern", "Ventilated", "Temperate", "Arid"],
    priceEstimate: "$$$ - Luxury",
    coverage: "2.78 panels per sqm",
    uValue: "0.24 W/m²K",
    thermalConductivity: "0.13 W/mK",
    acousticRating: "38 dB Rw",
    fireRating: "Class A1 (EN 13501-1, Non-Combustible)",
    cadTexture: {
      albedo: "#8A5A36",
      roughness: 0.85,
      metalness: 0.0,
      resolution: "4K Seamless PBR",
      maps: ["Albedo", "Normal", "Roughness", "Ambient Occlusion", "Displacement"]
    }
  },
  {
    id: "glazed-louver-2",
    name: "Aero Glazed Terracotta Louver",
    category: "facade",
    subcategory: "Baguettes & Louvers",
    description: "Sun-shading baguettes featuring high-performance reflective metallic glazes. These elements offer functional sun protection while acting as an dynamic, light-catching architectural screen.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    colors: [
      { name: "Platinum Metallic", hex: "#A8A9AD" },
      { name: "Oxidized Gold", hex: "#B5932A" },
      { name: "Slate Teal", hex: "#2E4A50" }
    ],
    dimensions: "50 x 50 x 1500 mm",
    weight: "4.5 kg/piece",
    compressiveStrength: ">= 45 MPa",
    waterAbsorption: "< 3.5%",
    sustainabilityRating: "BREEAM Excellent",
    features: [
      "Optimized sun-shading angles",
      "Custom glaze matching capabilities",
      "Pre-assembled internal aluminum support rod",
      "Exceptional wind-load resistance"
    ],
    downloads: [
      { type: "BIM", name: "Aero_Louver_Sunshade_System.rfa", size: "3.1 MB" },
      { type: "CAD", name: "Louver_Mounting_Details.dwg", size: "1.1 MB" },
      { type: "Brochure", name: "Baguettes_And_Louvers_Brochure.pdf", size: "6.8 MB" }
    ],
    tags: ["Commercial", "Minimalist", "Sunshade", "Tropical", "Arid"],
    priceEstimate: "$$$$ - Super Luxury",
    coverage: "Custom basis",
    uValue: "N/A (External Screen)",
    thermalConductivity: "0.18 W/mK",
    acousticRating: "N/A",
    fireRating: "Class A1 (EN 13501-1)",
    cadTexture: {
      albedo: "#A8A9AD",
      roughness: 0.15,
      metalness: 0.95,
      resolution: "4K Seamless PBR",
      maps: ["Albedo", "Normal", "Roughness", "Metallic", "Gloss"]
    }
  },
  {
    id: "heritage-pantile-1",
    name: "Monarch Clay Roof Tile",
    category: "roof",
    subcategory: "Interlocking Tiles",
    description: "Premium double-interlocking clay roof tiles with a deep wave profile. Designed to perform flawlessly under heavy storm conditions while giving a timeless European aesthetic to residential estates.",
    images: [
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    colors: [
      { name: "Terracotta Red", hex: "#B34A33" },
      { name: "Antic Gold", hex: "#C79554" },
      { name: "Rustic Umber", hex: "#5E4638" }
    ],
    dimensions: "420 x 270 mm",
    weight: "3.2 kg/piece",
    compressiveStrength: ">= 18 kN breaking load",
    waterAbsorption: "< 5%",
    sustainabilityRating: "Cradle to Cradle Certified",
    features: [
      "Dual interlocking channels prevent wind-driven rain",
      "UV-resistant colors that will not fade for 100 years",
      "Extreme storm and frost durability",
      "Low maintenance clay matrix"
    ],
    downloads: [
      { type: "BIM", name: "Monarch_Roof_Tile_System.rfa", size: "5.5 MB" },
      { type: "CAD", name: "Monarch_Interlocking_Details.dwg", size: "2.3 MB" },
      { type: "Brochure", name: "Premium_Clay_Roofing_Monarch.pdf", size: "8.2 MB" },
      { type: "Certificate", name: "Cradle_To_Cradle_Monarch_Roof.pdf", size: "1.4 MB" }
    ],
    tags: ["Residential", "Classic", "Waterproof", "Tropical", "Cold"],
    priceEstimate: "$$ - Premium",
    coverage: "12.5 tiles per sqm",
    uValue: "0.32 W/m²K (Assembled)",
    thermalConductivity: "0.12 W/mK",
    acousticRating: "44 dB Rw (System)",
    fireRating: "Class A1 (EN 13501-1)",
    cadTexture: {
      albedo: "#B34A33",
      roughness: 0.9,
      metalness: 0.0,
      resolution: "4K Seamless PBR",
      maps: ["Albedo", "Normal", "Roughness", "Height"]
    }
  },
  {
    id: "flat-slate-roof-2",
    name: "Zenith Flat Clay Roof Tile",
    category: "roof",
    subcategory: "Flat Tiles",
    description: "Ultra-minimalist flat clay roof tile creating a monolithic, slate-like roof plane. Engineered for modern, linear residential architecture.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    colors: [
      { name: "Graphite Charcoal", hex: "#22252A" },
      { name: "Alabaster Grey", hex: "#94969A" }
    ],
    dimensions: "450 x 285 mm",
    weight: "4.1 kg/piece",
    compressiveStrength: ">= 2.0 kN breaking load",
    waterAbsorption: "< 4%",
    sustainabilityRating: "EPD Certified Eco-Material",
    features: [
      "Clean linear aesthetic with hidden interlocking joints",
      "Integrated storm-clip installation system",
      "High fire resistance rating (Class A1)",
      "Optimal rainwater collection compatibility"
    ],
    downloads: [
      { type: "BIM", name: "Zenith_Flat_Tile_Roofing_Revit.rfa", size: "4.9 MB" },
      { type: "CAD", name: "Zenith_Flat_Tile_Layout.dwg", size: "1.7 MB" },
      { type: "Brochure", name: "Zenith_Minimalist_Roof_Catalog.pdf", size: "5.1 MB" }
    ],
    tags: ["Residential", "Minimalist", "Monolithic", "Temperate", "Cold"],
    priceEstimate: "$$$ - Luxury",
    coverage: "10.8 tiles per sqm",
    uValue: "0.29 W/m²K (Assembled)",
    thermalConductivity: "0.14 W/mK",
    acousticRating: "46 dB Rw (System)",
    fireRating: "Class A1 (EN 13501-1)",
    cadTexture: {
      albedo: "#22252A",
      roughness: 0.75,
      metalness: 0.1,
      resolution: "4K Seamless PBR",
      maps: ["Albedo", "Normal", "Roughness", "Ambient Occlusion", "Height"]
    }
  },
  {
    id: "handmade-longformat-1",
    name: "Romanesque Longformat Face Brick",
    category: "brick",
    subcategory: "Longformat Bricks",
    description: "Elongated, handmade facing bricks featuring highly irregular surfaces and organic edge contours. Perfectly blends classical craftsmanship with modern linear facades.",
    images: [
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    colors: [
      { name: "Tudor Rust", hex: "#8A4F41" },
      { name: "Nordic Frost Grey", hex: "#7E8287" },
      { name: "Coal Ash Black", hex: "#1C1D1F" }
    ],
    dimensions: "490 x 90 x 40 mm",
    weight: "3.5 kg/piece",
    compressiveStrength: ">= 30 MPa",
    waterAbsorption: "< 8%",
    sustainabilityRating: "LEED V4 Raw Material Sourcing",
    features: [
      "Hand-molded texturing for unique visual variety",
      "Excellent acoustic dampening",
      "Highly resistant to efflorescence",
      "Thin linear mortar joint alignment"
    ],
    downloads: [
      { type: "BIM", name: "Romanesque_Longformat_Bricks.rfa", size: "3.8 MB" },
      { type: "CAD", name: "Romanesque_Masonry_Standard_Wall.dwg", size: "1.4 MB" },
      { type: "Brochure", name: "Romanesque_Longformat_Collection.pdf", size: "9.3 MB" }
    ],
    tags: ["Residential", "Commercial", "Brutalist", "Contemporary", "Temperate"],
    priceEstimate: "$$$ - Luxury",
    coverage: "41 bricks per sqm",
    uValue: "0.58 W/m²K (Double Leaf)",
    thermalConductivity: "0.22 W/mK",
    acousticRating: "52 dB Rw (Wall)",
    fireRating: "Class A1 (Non-Combustible Structural)",
    cadTexture: {
      albedo: "#8A4F41",
      roughness: 0.95,
      metalness: 0.0,
      resolution: "4K Seamless PBR",
      maps: ["Albedo", "Normal", "Roughness", "Displacement", "Bump"]
    }
  },
  {
    id: "engineered-clinker-2",
    name: "Vanguard Heavy Clinker Brick",
    category: "brick",
    subcategory: "Clinker Bricks",
    description: "High-fired clay clinker bricks with an extremely dense matrix. Impervious to aggressive chemical elements, frost, and high-impact conditions, with a rich dark metallic sheen.",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    colors: [
      { name: "Metallic Bronze Shimmer", hex: "#4C3F34" },
      { name: "Obsidian Core", hex: "#121417" }
    ],
    dimensions: "240 x 115 x 71 mm",
    weight: "3.1 kg/piece",
    compressiveStrength: ">= 80 MPa",
    waterAbsorption: "< 3%",
    sustainabilityRating: "Carbon-Neutral Production",
    features: [
      "High acid and alkali resistance",
      "Exceptional high loadbearing capacity",
      "Zero moisture expansion",
      "Naturally vitrified metallic colors"
    ],
    downloads: [
      { type: "BIM", name: "Vanguard_Clinker_Systems.rfa", size: "2.7 MB" },
      { type: "Brochure", name: "Clinker_Bricks_Engineering_Guide.pdf", size: "11.1 MB" }
    ],
    tags: ["Commercial", "Brutalist", "High-Durability", "Cold", "Tropical"],
    priceEstimate: "$$ - Premium",
    coverage: "48 bricks per sqm",
    uValue: "0.65 W/m²K",
    thermalConductivity: "0.28 W/mK",
    acousticRating: "55 dB Rw (Wall)",
    fireRating: "Class A1 (Structural Heavy Load)",
    cadTexture: {
      albedo: "#4C3F34",
      roughness: 0.65,
      metalness: 0.3,
      resolution: "4K Seamless PBR",
      maps: ["Albedo", "Normal", "Roughness", "Metalness", "Displacement"]
    }
  },
  {
    id: "clay-paver-premium-1",
    name: "Regent Clay Walkway Paver",
    category: "paver",
    subcategory: "Clay Pavers",
    description: "Premium chamfered clay pavers engineered for pedestrian plazas, custom gardens, and high-end residential driveways. Delivers structural stability and rich, non-fading colors.",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2381f0db?auto=format&fit=crop&w=1200&q=80"
    ],
    colors: [
      { name: "Autumn Copper", hex: "#A05A42" },
      { name: "Sandstone Beige", hex: "#D4BE9F" },
      { name: "Volcanic Grey", hex: "#4B4D52" }
    ],
    dimensions: "200 x 100 x 52 mm",
    weight: "2.4 kg/piece",
    compressiveStrength: ">= 60 MPa",
    waterAbsorption: "< 4%",
    sustainabilityRating: "Permeable Paver Eco-Award",
    features: [
      "High slip resistance (Class U3/SRV)",
      "Resistant to road salt and oil stains",
      "Easily configurable in Herringbone or Running bond patterns",
      "High eco-permeability compatibility"
    ],
    downloads: [
      { type: "BIM", name: "Regent_Clay_Pavers_Hatch_Patterns.rfa", size: "1.9 MB" },
      { type: "CAD", name: "Paver_Ground_Subbase_Sections.dwg", size: "3.2 MB" },
      { type: "Brochure", name: "Regent_Pavers_Paving_Manual.pdf", size: "7.0 MB" }
    ],
    tags: ["Residential", "Commercial", "Landscape", "Tropical", "Arid"],
    priceEstimate: "$$ - Premium",
    coverage: "48 pavers per sqm",
    uValue: "N/A (Ground Paver)",
    thermalConductivity: "0.20 W/mK",
    acousticRating: "N/A",
    fireRating: "Class A1 (Floor Ramps)",
    cadTexture: {
      albedo: "#A05A42",
      roughness: 0.9,
      metalness: 0.0,
      resolution: "4K Seamless PBR",
      maps: ["Albedo", "Normal", "Roughness", "Ambient Occlusion", "Displacement"]
    }
  }
];
