export type Stylist = {
  id: string;
  name: string;
  role: string;
  swatch: string;
};

export const stylists: Stylist[] = [
  { id: "elena", name: "Elena Vance", role: "Creative Dir.", swatch: "#DDD8CE" },
  { id: "julian", name: "Julian Thorne", role: "Sr. Stylist", swatch: "#D8D4CA" },
  { id: "sasha", name: "Sasha Grey", role: "Color Spec.", swatch: "#DCD8D0" },
  { id: "mia", name: "Mia Laurent", role: "Skin Therapist", swatch: "#D8DCD8" },
];

export type IconKey =
  | "scissors"
  | "balayage"
  | "facial"
  | "wrap"
  | "press"
  | "spa";

export type Service = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: "Hair" | "Skin" | "Spa" | "Nails";
  icon: IconKey;
  thumbBg: string;
  durationMin: number;
};

export const services: Service[] = [
  {
    id: "signature",
    name: "Signature Sculpt & Style",
    desc: "Advanced cut, conditioning & signature blowout",
    price: 145,
    category: "Hair",
    icon: "scissors",
    thumbBg: "#E8E0D0",
    durationMin: 90,
  },
  {
    id: "balayage",
    name: "Luminous Balayage",
    desc: "Hand-painted sun-kissed multi-dimensional finish",
    price: 280,
    category: "Hair",
    icon: "balayage",
    thumbBg: "#EDE0D0",
    durationMin: 120,
  },
  {
    id: "silk-press",
    name: "Silk Press Treatment",
    desc: "High-heat styling with luxury amino acids",
    price: 110,
    category: "Hair",
    icon: "press",
    thumbBg: "#E8E0E0",
    durationMin: 75,
  },
  {
    id: "oxygen",
    name: "Cellular Oxygen Infusion",
    desc: "Active hyaluronic acid for instant luminosity",
    price: 220,
    category: "Skin",
    icon: "facial",
    thumbBg: "#E0E8E8",
    durationMin: 60,
  },
  {
    id: "sanctuary",
    name: "The Sanctuary Journey",
    desc: "Full-body massage, heated stone & scalp ritual",
    price: 385,
    category: "Spa",
    icon: "spa",
    thumbBg: "#E8E0E8",
    durationMin: 120,
  },
];

export const trendingServices: Service[] = [
  services[0],
  services[1],
  {
    id: "gua-sha",
    name: "Sculpting Gua Sha Facial",
    desc: "Lymphatic drainage ritual",
    price: 185,
    category: "Skin",
    icon: "facial",
    thumbBg: "#E0E8E0",
    durationMin: 60,
  },
  {
    id: "wrap",
    name: "Celestial Body Wrap",
    desc: "Clay wrap + silk massage",
    price: 240,
    category: "Spa",
    icon: "wrap",
    thumbBg: "#E8E0E8",
    durationMin: 90,
  },
];

export type Invoice = {
  id: string;
  name: string;
  date: string;
  stylist: string;
  amount: number;
  primary?: boolean;
};

export const invoices: Invoice[] = [
  { id: "1", name: "Signature Sculpt & Style", date: "Apr 15, 2026", stylist: "Elena Vance", amount: 145, primary: true },
  { id: "2", name: "Luminous Balayage", date: "Mar 28, 2026", stylist: "Julian Thorne", amount: 280 },
  { id: "3", name: "Gua Sha Facial", date: "Mar 10, 2026", stylist: "Mia Laurent", amount: 185 },
];
