export interface Dealer {
  id: string;
  name: string;
  region: "Europe" | "Asia Pacific" | "North America" | "Middle East";
  city: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number; x: number; y: number }; // x/y percentage on custom map for custom visual canvas representation
  type: "Flagship Studio" | "Authorized Gallery" | "Technical Partner";
}

export const mockDealers: Dealer[] = [
  {
    id: "london-flagship",
    name: "London Aura Flagship Studio",
    region: "Europe",
    city: "London",
    address: "72 Clerkenwell Road, London, EC1M 5PX, UK",
    phone: "+44 20 7490 1122",
    email: "london@aura-materials.com",
    coordinates: { lat: 51.5222, lng: -0.1018, x: 45, y: 38 },
    type: "Flagship Studio"
  },
  {
    id: "munich-gallery",
    name: "Munich Technical Gallery",
    region: "Europe",
    city: "Munich",
    address: "Brienner Strasse 14, 80333 Munich, Germany",
    phone: "+49 89 2870 0910",
    email: "munich@aura-materials.com",
    coordinates: { lat: 48.1448, lng: 11.5762, x: 49, y: 44 },
    type: "Technical Partner"
  },
  {
    id: "singapore-hub",
    name: "Singapore Asia-Pacific Hub",
    region: "Asia Pacific",
    city: "Singapore",
    address: "24 Raffles Place, #18-02 Clifford Centre, Singapore 048621",
    phone: "+65 6535 8899",
    email: "singapore@aura-materials.com",
    coordinates: { lat: 1.2833, lng: 103.8500, x: 74, y: 70 },
    type: "Flagship Studio"
  },
  {
    id: "sydney-gallery",
    name: "Sydney Authorized Gallery",
    region: "Asia Pacific",
    city: "Sydney",
    address: "140 George Street, The Rocks, Sydney, NSW 2000, Australia",
    phone: "+61 2 9240 1200",
    email: "sydney@aura-materials.com",
    coordinates: { lat: -33.8688, lng: 151.2093, x: 85, y: 88 },
    type: "Authorized Gallery"
  },
  {
    id: "ny-studio",
    name: "New York Design District Studio",
    region: "North America",
    city: "New York",
    address: "200 Lexington Avenue, Suite 402, New York, NY 10016, USA",
    phone: "+1 212 683 4500",
    email: "ny@aura-materials.com",
    coordinates: { lat: 40.7484, lng: -73.9857, x: 22, y: 42 },
    type: "Flagship Studio"
  },
  {
    id: "la-gallery",
    name: "Los Angeles Creative Studio",
    region: "North America",
    city: "Los Angeles",
    address: "8687 Melrose Avenue, Suite B400, West Hollywood, CA 90069, USA",
    phone: "+1 310 854 1100",
    email: "la@aura-materials.com",
    coordinates: { lat: 34.0522, lng: -118.2437, x: 12, y: 48 },
    type: "Authorized Gallery"
  },
  {
    id: "dubai-technical",
    name: "Dubai Design District Partner",
    region: "Middle East",
    city: "Dubai",
    address: "Building 8, Dubai Design District, Dubai, UAE",
    phone: "+971 4 433 3000",
    email: "dubai@aura-materials.com",
    coordinates: { lat: 25.2048, lng: 55.2708, x: 59, y: 55 },
    type: "Technical Partner"
  }
];
