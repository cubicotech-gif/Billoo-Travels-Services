// ─── SERVICES ───
export const SERVICES = [
  {
    icon: "Kaaba",
    title: "Hajj & Umrah",
    desc: "VIP pilgrimage packages with five-star hotels and scholarly guidance.",
    metric: "15K+ Pilgrims",
    img: "/images/service-hajj.jpg",
    placeholder: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=250&fit=crop",
  },
  {
    icon: "Headset",
    title: "Private Concierge",
    desc: "Personal travel designer available 24/7 for every request.",
    metric: "24/7 Support",
    img: "/images/service-concierge.jpg",
    placeholder: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop",
  },
  {
    icon: "Visa",
    title: "Visa Services",
    desc: "Priority processing with guaranteed approval by our executive team.",
    metric: "99.8% Approval",
    img: "/images/service-visa.jpg",
    placeholder: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
  },
  {
    icon: "Globe",
    title: "Global Tours",
    desc: "Curated luxury itineraries across the Middle East, Europe and Asia.",
    metric: "50+ Cities",
    img: "/images/service-tours.jpg",
    placeholder: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=250&fit=crop",
  },
];

// ─── TEAM / LEADERSHIP ───
export const TEAM = [
  {
    name: "Danish Bangloria",
    role: "Founder & Chief Executive",
    img: "/images/team-ceo.jpg",
    placeholder: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
  },
];

// ─── FAQS ───
export const FAQS = [
  {
    q: "What documents are required for Umrah?",
    a: "Valid passport (6+ months), photographs, vaccination certificates, and visa forms. Our team handles the entire process for you.",
  },
  {
    q: "How far in advance should I book?",
    a: "2-3 months for Umrah, 4-6 months for Hajj to secure the best hotel proximity and flights.",
  },
  {
    q: "Are payments refundable?",
    a: "Full refund up to 30 days before departure, 50% up to 15 days, case-by-case after that.",
  },
  {
    q: "Do you provide group packages?",
    a: "Yes! Custom group packages for families and organizations with special pricing and dedicated coordinators.",
  },
  {
    q: "What's included in VIP packages?",
    a: "5-star suites near Haram, private SUV, personal scholar, priority visa, business class flights, and 24/7 concierge.",
  },
];

// ─── NAV LINKS ───
// `highlight` renders the link as a stand-out accent pill (see Navbar).
export const NAV_LINKS: { label: string; href: string; highlight?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Hajj 2027", href: "/hajj", highlight: true },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// ─── CONTACT INFO ───
export const CONTACT = {
  phone: "021-32313461-63",
  email: "vip@billootravels.com",
  address: "M2 Mezzanine, Plot 41c, DHA Phase 5, Karachi",
  whatsapp: "https://wa.me/922132313461",
  agentId: "1251",
};

// ─── CURRENCIES ───
export type Currency = "PKR" | "USD" | "SAR";
export const CURRENCIES: Currency[] = ["PKR", "USD", "SAR"];
