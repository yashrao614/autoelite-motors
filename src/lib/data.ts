export type BodyType =
  | "Sports Coupe"
  | "Grand Tourer"
  | "Performance Sedan"
  | "Luxury SUV"
  | "Flagship Sedan"
  | "Electric Flagship"
  | "Electric GT";

export type FuelType = "Petrol" | "Diesel" | "Electric";
export type Condition = "New" | "Pre-Owned";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  tagline: string;
  price: string;
  priceValue: number;
  keySpec: string;
  bodyType: BodyType;
  fuel: FuelType;
  condition: Condition;
  year: number;
  mileage: string;
  transmission: string;
  engine: string;
  power: string;
  torque: string;
  zeroToHundred: string;
  topSpeed: string;
  rangeOrMileage: string;
  seating: number;
  driveType: string;
  features: string[];
  warranty: string;
  colors: { name: string; hex: string }[];
  image: string;
  accent: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "porsche-911-carrera",
    brand: "Porsche",
    model: "911 Carrera",
    tagline: "Pure performance. Timeless design.",
    price: "₹1.99 Cr*",
    priceValue: 19900000,
    keySpec: "0–100 km/h 4.2s",
    bodyType: "Sports Coupe",
    fuel: "Petrol",
    condition: "New",
    year: 2025,
    mileage: "12 km",
    transmission: "8-Speed PDK",
    engine: "3.0L Twin-Turbo Flat-6",
    power: "379 HP",
    torque: "450 Nm",
    zeroToHundred: "4.2s",
    topSpeed: "293 km/h",
    rangeOrMileage: "9.1 km/l",
    seating: 4,
    driveType: "Rear-Wheel Drive",
    features: ["Sport Chrono Package", "Adaptive Sport Seats", "PASM Suspension", "BOSE Surround Sound"],
    warranty: "4 Years / Unlimited km",
    colors: [
      { name: "GT Silver", hex: "#c7c7c2" },
      { name: "Jet Black", hex: "#17140f" },
      { name: "Guards Red", hex: "#9c2b28" },
    ],
    image: "/cars/porsche-911-carrera-studio.png",
    accent: "#008c91",
  },
  {
    id: "bmw-m4-competition",
    brand: "BMW",
    model: "M4 Competition",
    tagline: "Engineered for the edge.",
    price: "₹1.42 Cr*",
    priceValue: 14200000,
    keySpec: "503 HP",
    bodyType: "Sports Coupe",
    fuel: "Petrol",
    condition: "New",
    year: 2025,
    mileage: "8 km",
    transmission: "8-Speed M Steptronic",
    engine: "3.0L Twin-Turbo Inline-6",
    power: "503 HP",
    torque: "650 Nm",
    zeroToHundred: "3.5s",
    topSpeed: "290 km/h",
    rangeOrMileage: "8.4 km/l",
    seating: 4,
    driveType: "All-Wheel Drive",
    features: ["M Carbon Bucket Seats", "M Drive Professional", "Laser Headlights", "Harman Kardon Audio"],
    warranty: "3 Years / Unlimited km",
    colors: [
      { name: "Isle of Man Green", hex: "#2f4a3c" },
      { name: "Alpine White", hex: "#f2f0ea" },
      { name: "Sapphire Black", hex: "#181a1e" },
    ],
    image: "/cars/bmw-m4-competition-studio.png",
    accent: "#008c91",
  },
  {
    id: "mercedes-amg-gt",
    brand: "Mercedes-AMG",
    model: "GT",
    tagline: "Sculpted for speed.",
    price: "₹2.4 Cr*",
    priceValue: 24000000,
    keySpec: "469 HP",
    bodyType: "Grand Tourer",
    fuel: "Petrol",
    condition: "New",
    year: 2025,
    mileage: "15 km",
    transmission: "9-Speed AMG Speedshift",
    engine: "4.0L Twin-Turbo V8",
    power: "469 HP",
    torque: "600 Nm",
    zeroToHundred: "3.9s",
    topSpeed: "302 km/h",
    rangeOrMileage: "7.6 km/l",
    seating: 2,
    driveType: "Rear-Wheel Drive",
    features: ["AMG Ride Control+", "Burmester 3D Audio", "AMG Track Pace", "Carbon Fibre Trim"],
    warranty: "3 Years / Unlimited km",
    colors: [
      { name: "Graphite Grey", hex: "#4a4a4a" },
      { name: "Obsidian Black", hex: "#15151a" },
      { name: "Designo Diamond White", hex: "#efeee8" },
    ],
    image: "/cars/mercedes-amg-gt-studio.png",
    accent: "#008c91",
  },
  {
    id: "audi-rs7-sportback",
    brand: "Audi",
    model: "RS7 Sportback",
    tagline: "Silent power, sharp precision.",
    price: "₹1.94 Cr*",
    priceValue: 19400000,
    keySpec: "591 HP",
    bodyType: "Performance Sedan",
    fuel: "Petrol",
    condition: "Pre-Owned",
    year: 2023,
    mileage: "6,200 km",
    transmission: "8-Speed Tiptronic",
    engine: "4.0L Twin-Turbo V8",
    power: "591 HP",
    torque: "800 Nm",
    zeroToHundred: "3.6s",
    topSpeed: "305 km/h",
    rangeOrMileage: "8.0 km/l",
    seating: 5,
    driveType: "Quattro All-Wheel Drive",
    features: ["RS Sport Suspension+", "Matrix LED Headlights", "Bang & Olufsen 3D Audio", "Carbon Roof"],
    warranty: "4 Years / Unlimited km",
    colors: [
      { name: "Nardo Grey", hex: "#8f938f" },
      { name: "Mythos Black", hex: "#1a1a1c" },
      { name: "Glacier White", hex: "#eef0ee" },
    ],
    image: "/cars/audi-rs7-sportback-studio.png",
    accent: "#008c91",
  },
  {
    id: "range-rover-sport",
    brand: "Range Rover",
    model: "Sport",
    tagline: "Command every terrain.",
    price: "₹1.65 Cr*",
    priceValue: 16500000,
    keySpec: "395 HP",
    bodyType: "Luxury SUV",
    fuel: "Diesel",
    condition: "New",
    year: 2025,
    mileage: "20 km",
    transmission: "8-Speed Automatic",
    engine: "3.0L Turbocharged I6 MHEV",
    power: "395 HP",
    torque: "550 Nm",
    zeroToHundred: "5.7s",
    topSpeed: "225 km/h",
    rangeOrMileage: "11.2 km/l",
    seating: 5,
    driveType: "All-Wheel Drive",
    features: ["Adaptive Air Suspension", "Terrain Response 2", "Meridian Signature Sound", "Executive Class Seating"],
    warranty: "3 Years / Unlimited km",
    colors: [
      { name: "Santorini Black", hex: "#16161a" },
      { name: "Fuji White", hex: "#eeece4" },
      { name: "Batumi Gold", hex: "#a98a52" },
    ],
    image: "/cars/range-rover-sport-studio.png",
    accent: "#008c91",
  },
  {
    id: "mercedes-s-class",
    brand: "Mercedes-Benz",
    model: "S-Class",
    tagline: "The art of arrival.",
    price: "₹1.71 Cr*",
    priceValue: 17100000,
    keySpec: "429 HP",
    bodyType: "Flagship Sedan",
    fuel: "Petrol",
    condition: "New",
    year: 2025,
    mileage: "5 km",
    transmission: "9-Speed 9G-Tronic",
    engine: "3.0L Turbocharged I6 EQ Boost",
    power: "429 HP",
    torque: "520 Nm",
    zeroToHundred: "4.9s",
    topSpeed: "250 km/h",
    rangeOrMileage: "10.5 km/l",
    seating: 5,
    driveType: "All-Wheel Drive",
    features: ["Executive Rear Seats", "Burmester High-End 4D Sound", "MBUX Hyperscreen", "Active Ambient Lighting"],
    warranty: "3 Years / Unlimited km",
    colors: [
      { name: "Obsidian Black", hex: "#15151a" },
      { name: "Diamond White", hex: "#efeee8" },
      { name: "Selenite Grey", hex: "#79787c" },
    ],
    image: "/cars/mercedes-s-class-studio.png",
    accent: "#008c91",
  },
  {
    id: "bmw-i7",
    brand: "BMW",
    model: "i7",
    tagline: "Silence, redefined.",
    price: "₹1.95 Cr*",
    priceValue: 19500000,
    keySpec: "625 km Range",
    bodyType: "Electric Flagship",
    fuel: "Electric",
    condition: "New",
    year: 2025,
    mileage: "10 km",
    transmission: "Single-Speed Automatic",
    engine: "Dual Electric Motor",
    power: "544 HP",
    torque: "745 Nm",
    zeroToHundred: "4.7s",
    topSpeed: "240 km/h",
    rangeOrMileage: "625 km Range",
    seating: 5,
    driveType: "All-Wheel Drive",
    features: ["BMW Theatre Screen", "31-Speaker Bowers & Wilkins", "Sky Lounge Panoramic Roof", "Level 3 Automation Ready"],
    warranty: "8 Years / 1,60,000 km (Battery)",
    colors: [
      { name: "Oxide Grey", hex: "#5a5750" },
      { name: "Alpine White", hex: "#f2f0ea" },
      { name: "Carbon Black", hex: "#141414" },
    ],
    image: "/cars/bmw-i7-studio.png",
    accent: "#008c91",
  },
  {
    id: "porsche-taycan",
    brand: "Porsche",
    model: "Taycan",
    tagline: "The future, uncompromised.",
    price: "₹1.68 Cr*",
    priceValue: 16800000,
    keySpec: "431 km Range",
    bodyType: "Electric GT",
    fuel: "Electric",
    condition: "Pre-Owned",
    year: 2024,
    mileage: "3,100 km",
    transmission: "2-Speed Automatic",
    engine: "Dual Electric Motor",
    power: "469 HP",
    torque: "650 Nm",
    zeroToHundred: "4.0s",
    topSpeed: "230 km/h",
    rangeOrMileage: "431 km Range",
    seating: 4,
    driveType: "All-Wheel Drive",
    features: ["Porsche Active Suspension", "800V Fast Charging", "BOSE Surround Sound", "Adaptive Air Suspension"],
    warranty: "4 Years / 1,60,000 km (Battery)",
    colors: [
      { name: "Frozen Blue", hex: "#4a6a78" },
      { name: "Jet Black", hex: "#17140f" },
      { name: "Ice Grey", hex: "#c9cbc6" },
    ],
    image: "/cars/porsche-taycan-studio.png",
    accent: "#008c91",
  },
];

export const brands = [
  "Porsche",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Range Rover",
  "Jaguar",
  "Aston Martin",
  "Lexus",
] as const;

export const bodyTypes: BodyType[] = [
  "Sports Coupe",
  "Grand Tourer",
  "Performance Sedan",
  "Luxury SUV",
  "Flagship Sedan",
  "Electric Flagship",
  "Electric GT",
];

export const fuelTypes: FuelType[] = ["Petrol", "Diesel", "Electric"];

export const whyChooseUs = [
  {
    title: "Certified Vehicles",
    body: "Every vehicle passes a 210-point inspection and comes with a verified history report.",
  },
  {
    title: "Transparent Pricing",
    body: "One price, clearly stated. No hidden fees, no last-minute surprises.",
  },
  {
    title: "Flexible Financing",
    body: "Financing structured around your cash flow, not a generic template.",
  },
  {
    title: "Expert Consultation",
    body: "Product specialists who know torque curves as well as trim levels.",
  },
  {
    title: "After-Sales Support",
    body: "Priority servicing and concierge support long after delivery.",
  },
];

export const services = [
  { title: "Vehicle Financing", body: "Tailored loan structures across tenures and down payments." },
  { title: "Trade-In / Exchange", body: "Instant valuations and same-day exchange processing." },
  { title: "Vehicle Sourcing", body: "Access to allocations and rare configurations, globally." },
  { title: "Insurance Assistance", body: "Comprehensive cover matched to vehicle value and usage." },
  { title: "Detailing", body: "Paint correction, ceramic coating and interior restoration." },
  { title: "Service & Maintenance", body: "Manufacturer-trained technicians, genuine parts only." },
  { title: "Extended Warranty", body: "Coverage that extends well beyond the factory term." },
  { title: "Delivery Assistance", body: "White-glove delivery, anywhere you take ownership." },
];

export const locations = [
  {
    city: "Delhi NCR",
    address: "27 Aerocity Boulevard, New Delhi 110037",
    phone: "+91 98100 44210",
    hours: "10:00 AM – 8:00 PM, all days",
    mapEmbedSrc: "https://www.google.com/maps?q=Aerocity+New+Delhi&output=embed",
  },
  {
    city: "Mumbai",
    address: "12 Bandra-Kurla Complex, Mumbai 400051",
    phone: "+91 98200 55321",
    hours: "10:00 AM – 8:00 PM, all days",
    mapEmbedSrc: "https://www.google.com/maps?q=Bandra+Kurla+Complex+Mumbai&output=embed",
  },
  {
    city: "Bengaluru",
    address: "8 Residency Road, Bengaluru 560025",
    phone: "+91 98450 66432",
    hours: "10:00 AM – 8:00 PM, all days",
    mapEmbedSrc: "https://www.google.com/maps?q=Residency+Road+Bengaluru&output=embed",
  },
];

export const dealershipEmail = "concierge@autoelite.in";
export const dealershipName = "AutoElite";
