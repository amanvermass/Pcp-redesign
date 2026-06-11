export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogTocItem {
  id: string;
  text: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: "Design Trends" | "Technical Innovations" | "Sustainability" | "Material Science";
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  author: BlogAuthor;
  toc: BlogTocItem[];
  contentHtml: string;
  trending: boolean;
  featured: boolean;
}

export const mockBlogs: BlogArticle[] = [
  {
    slug: "monolithic-clay-facades-future-passive",
    title: "Monolithic Clay Facades: The Future of Passive Solar Design",
    category: "Technical Innovations",
    date: "May 28, 2026",
    readTime: "6 min read",
    excerpt: "Explore how high-performance clay cladding and clinker bricks are redefining building envelopes, offering structural durability while maximizing thermal efficiency.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Marcus Aurelius Vane",
      role: "Principal Architectural Consultant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    toc: [
      { id: "intro", text: "Introduction: The Heavy Facade Revival" },
      { id: "thermal-mass", text: "The Physics of Clay Thermal Mass" },
      { id: "ventilated-envelopes", text: "Rear-Ventilated Rainscreens" },
      { id: "future", text: "Looking Ahead: Self-Cleaning Surfaces" }
    ],
    contentHtml: `
      <p>In the quest for high-efficiency skyscrapers and residential spaces, modern architecture has frequently relied on light glass-and-aluminum curtain walls. However, as extreme weather patterns intensify, architects are looking backward to move forward. The revival of natural clay as a heavy, monolithic rainscreen envelope represents a profound shift in building envelope technology.</p>
      
      <h2 id="intro">Introduction: The Heavy Facade Revival</h2>
      <p>Modern building envelopes must do more than keep water out; they must act as dynamic thermal filters. Lightweight envelopes often let solar heat radiation pass directly into interior spaces, requiring heavy active air-conditioning. Heavy clay facades, on the other hand, provide a natural thermal barrier that regulates interior comfort levels passively.</p>
      
      <h2 id="thermal-mass">The Physics of Clay Thermal Mass</h2>
      <p>Clay exhibits high specific heat capacity and high bulk density, translating into exceptional thermal inertia. During the day, raw clay tiles and clinker bricks absorb solar energy. Rather than transmitting this heat immediately into the building core, the clay matrix stores the energy, releasing it slowly into the environment as temperatures fall during the night. This heat delay is known as thermal lag, and it significantly flattens energy consumption spikes.</p>
      
      <h2 id="ventilated-envelopes">Rear-Ventilated Rainscreens</h2>
      <p>By suspending terracotta panels on lightweight aluminum tracking systems, architects create a continuous ventilated airspace between the insulation and the cladding. This chimney effect drives warm air upward and out of the building envelope, preventing heat buildup and completely eliminating moisture accumulation behind the brickwork. It is the perfect marriage of raw geological materiality and precision metal engineering.</p>
      
      <h2 id="future">Looking Ahead: Self-Cleaning Surfaces</h2>
      <p>The latest generation of terracotta panels feature baked-in titanium dioxide coatings. Under ultraviolet light, these coatings activate a photocatalytic reaction that breaks down organic pollutants on the surface. When rain hits the facade, it sheets off evenly, carrying away particles. This ensures that monumental projects retain their clean, luxury aesthetic for decades without costly maintenance routines.</p>
    `,
    trending: true,
    featured: true
  },
  {
    slug: "reclaiming-craftsmanship-roman-longformat",
    title: "Reclaiming Craftsmanship: The Romanesque Longformat Trend",
    category: "Design Trends",
    date: "June 04, 2026",
    readTime: "4 min read",
    excerpt: "Why top-tier luxury residential designers are ditching standard bricks for custom handmade Roman linear profiles, bringing texture and shadow to modern facades.",
    coverImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Elisa Chipper",
      role: "Lead Exterior Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    toc: [
      { id: "origin", text: "The Ancient Roman Roots" },
      { id: "shadow-play", text: "The Shadow Play of Long Formats" },
      { id: "luxury-residential", text: "High-End Residential Applications" }
    ],
    contentHtml: `
      <p>The standard facing brick, with its uniform proportions, has been a workhorse of construction. But in premium residential architecture, where customization is everything, standard brickwork can feel repetitive. The rise of longformat, handmade bricks is offering a textural antidote, restoring high-tactility craftsmanship to the exterior facade.</p>
      
      <h2 id="origin">The Ancient Roman Roots</h2>
      <p>Long, thin bricks are not a new invention; they trace their origins to early Roman architecture, where thin clay slabs were layered with thick beds of structural mortar. Modern longformat bricks (typically 490mm long and just 40mm high) pay tribute to this aesthetic. Their horizontal ratio creates a striking horizontal lineation that grounds buildings visually.</p>
      
      <h2 id="shadow-play">The Shadow Play of Long Formats</h2>
      <p>Unlike wire-cut bricks, handmade longformats are molded individually. Their surface irregularities, micro-creases, and uneven color blooms mean that no two bricks are identical. When laid in a facade, these variations catch the sunlight at angled pitches, casting microscopic shadows that animate the surface, giving it a textile-like richness.</p>
      
      <h2 id="luxury-residential">High-End Residential Applications</h2>
      <p>Architects utilize these elongated bricks to create massive, sculptural chimneys, exterior accent walls, and entries that blur the boundary between indoor and outdoor spaces. The result is a home that feels crafted, permanent, and tactilely integrated into its surroundings.</p>
    `,
    trending: true,
    featured: false
  },
  {
    slug: "circular-masonry-cradle-to-cradle-roofing",
    title: "Circular Masonry: Achieving True Cradle-to-Cradle Roofing",
    category: "Sustainability",
    date: "April 15, 2026",
    readTime: "8 min read",
    excerpt: "How modern clay roof tiling practices are adapting to the circular economy, focusing on zero-waste manufacturing, clean clay sources, and dry-fixing layouts.",
    coverImage: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Arthur Pendelton",
      role: "Director of Green Materials",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    toc: [
      { id: "circularity", text: "Circular Economy in Roofing" },
      { id: "cradle-certified", text: "Cradle-to-Cradle Manufacturing" },
      { id: "dry-fixing", text: "Dry-Fix Installation Mechanics" }
    ],
    contentHtml: `
      <p>A roof is the first line of defense against the elements. Historically, once a roof tiles' lifecycle expired, the mortar and adhesive waste rendered recycling impossible. Now, architectural sustainability standards demand circular systems. Clay, as a pure geological material, is uniquely positioned to achieve zero-waste loops.</p>
      
      <h2 id="circularity">Circular Economy in Roofing</h2>
      <p>Circular construction demands that every material can be disassembled, sorted, and returned to the manufacturing cycle at the end of a building's life. Standard mortar-fixed roof tiles are incredibly difficult to reclaim because mortar residue contaminates clay crushers. The industry is responding by replacing wet mortar joints with sophisticated dry-fixing mechanics.</p>
      
      <h2 id="cradle-certified">Cradle-to-Cradle Manufacturing</h2>
      <p>Achieving Cradle-to-Cradle certification involves scrutinizing the entire supply chain. First, clay must be sourced locally to minimize haulage emissions. Second, kilns must run on clean fuel sources (such as green hydrogen or biomethane) to reduce greenhouse output. Finally, all factory process water must be recycled, creating a closed-loop system.</p>
      
      <h2 id="dry-fixing">Dry-Fix Installation Mechanics</h2>
      <p>Modern interlocking clay roof systems are installed using mechanical clips, screws, and continuous ridge vent profiles. This dry-fixing method allows individual tiles to be replaced if damaged. More importantly, when the roof is decommissioned, tiles can be detached quickly and crushed into chamotte—a recycled clay sand that is fed directly back into new tile production.</p>
    `,
    trending: false,
    featured: false
  }
];
