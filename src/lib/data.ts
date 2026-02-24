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

// ─── PACKAGES ───
export const PACKAGES = [
  {
    id: 1,
    type: "Umrah" as const,
    title: "Royal Umrah Retreat",
    nights: "14 Nights",
    hotel: "Raffles Makkah Palace ★★★★★",
    hotelShort: "Raffles Makkah Palace",
    dates: "Mar 10 – 24, 2025",
    includes: ["Private SUV", "VIP Access", "Executive Visa", "Scholar Guide"],
    price: { PKR: 1250000, USD: 4499, SAR: 16800 },
    badge: "Most Booked",
    img: "/images/package-umrah-royal.jpg",
    placeholder: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=700&h=500&fit=crop",
  },
  {
    id: 2,
    type: "Hajj" as const,
    title: "Executive Hajj",
    nights: "21 Nights",
    hotel: "Fairmont Clock Tower ★★★★★",
    hotelShort: "Fairmont Clock Tower",
    dates: "Jun 1 – 22, 2025",
    includes: ["VIP Mina Tent", "Personal Scholar", "Business Class", "Chauffeur"],
    price: { PKR: 3500000, USD: 12500, SAR: 46800 },
    badge: "Signature",
    img: "/images/package-hajj-exec.jpg",
    placeholder: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=700&h=500&fit=crop",
  },
  {
    id: 3,
    type: "Umrah" as const,
    title: "Premium Umrah",
    nights: "10 Nights",
    hotel: "Hilton Suites Makkah ★★★★★",
    hotelShort: "Hilton Suites Makkah",
    dates: "Apr 15 – 25, 2025",
    includes: ["Guided Ziyarat", "Executive Coach", "Visa Included", "Buffet Meals"],
    price: { PKR: 850000, USD: 2999, SAR: 11250 },
    badge: "Best Value",
    img: "/images/package-umrah-premium.jpg",
    placeholder: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=700&h=500&fit=crop",
  },
];

// ─── PRICING ───
export const PRICING = [
  {
    tier: "Economy",
    price: { PKR: 450000, USD: 1599, SAR: 5999 },
    popular: false,
    perks: [
      { text: "4-Star Hotels", included: true },
      { text: "Group Coach", included: true },
      { text: "Scholar Sessions", included: true },
      { text: "Visa Processing", included: true },
      { text: "Shared Ziyarat", included: true },
      { text: "Private Transport", included: false },
      { text: "Business Class", included: false },
    ],
  },
  {
    tier: "Business",
    price: { PKR: 1250000, USD: 4499, SAR: 16800 },
    popular: true,
    perks: [
      { text: "5-Star Suites", included: true },
      { text: "Private SUV", included: true },
      { text: "Personal Scholar", included: true },
      { text: "Priority Visa", included: true },
      { text: "Private Ziyarat", included: true },
      { text: "Lounge Access", included: true },
      { text: "Business Class", included: false },
    ],
  },
  {
    tier: "First Class",
    price: { PKR: 3500000, USD: 12500, SAR: 46800 },
    popular: false,
    perks: [
      { text: "Palace Suite", included: true },
      { text: "Chauffeur Fleet", included: true },
      { text: "Dedicated Scholar", included: true },
      { text: "VIP Visa", included: true },
      { text: "Private Ziyarat", included: true },
      { text: "Airport Lounge", included: true },
      { text: "Business Class Flights", included: true },
    ],
  },
];

// ─── TESTIMONIALS ───
export const TESTIMONIALS = [
  {
    name: "Fatima Hassan",
    role: "Executive Hajj '24",
    text: "The proximity to the Haram and flawless logistics allowed us to focus entirely on worship. Truly transcendent.",
    img: "/images/testimonial-1.jpg",
    placeholder: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Khalid Abdullah",
    role: "Royal Umrah '24",
    text: "Impeccable from start to finish. The Clock Tower suite and VIP transfers exceeded all expectations.",
    img: "/images/testimonial-2.jpg",
    placeholder: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Dr. Aisha Siddiqui",
    role: "Family Umrah '24",
    text: "Traveling with three children was seamless. The personal concierge was an absolute game changer for our family.",
    img: "/images/testimonial-3.jpg",
    placeholder: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
];

// ─── TEAM ───
export const TEAM = [
  {
    name: "Mr. Shoaib Zakaria",
    role: "Chief Executive Officer",
    img: "/images/team-ceo.jpg",
    placeholder: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Danish Zakariya",
    role: "Managing Director",
    img: "/images/team-md.jpg",
    placeholder: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Ahmad Raza",
    role: "Head of Operations",
    img: "/images/team-ops.jpg",
    placeholder: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Sara Khan",
    role: "Client Relations",
    img: "/images/team-cr.jpg",
    placeholder: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
  },
];

// ─── GALLERY ───
export const GALLERY = [
  { img: "/images/gallery-1.jpg", placeholder: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop", label: "Masjid Al-Haram", span: true },
  { img: "/images/gallery-2.jpg", placeholder: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop", label: "Holy Kaaba", span: false },
  { img: "/images/gallery-3.jpg", placeholder: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop", label: "Madinah", span: false },
  { img: "/images/gallery-4.jpg", placeholder: "https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=600&h=400&fit=crop", label: "Makkah Skyline", span: false },
  { img: "/images/gallery-5.jpg", placeholder: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600&h=400&fit=crop", label: "Mosque Interior", span: false },
  { img: "/images/gallery-6.jpg", placeholder: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop", label: "Istanbul Heritage", span: true },
];

// ─── BLOGS ───
export const BLOGS = [
  {
    title: "Complete Guide to Umrah 2025",
    cat: "Umrah",
    date: "Jan 15, 2025",
    read: "8 min",
    slug: "complete-guide-umrah-2025",
    img: "/images/blog-1.jpg",
    placeholder: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=350&fit=crop",
    desc: "Everything for a spiritually fulfilling Umrah journey this year.",
  },
  {
    title: "Top 10 Tips for Comfortable Hajj",
    cat: "Hajj",
    date: "Feb 5, 2025",
    read: "6 min",
    slug: "tips-comfortable-hajj",
    img: "/images/blog-2.jpg",
    placeholder: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=350&fit=crop",
    desc: "Expert advice from seasoned travelers on making Hajj seamless.",
  },
  {
    title: "Istanbul: Muslim Traveler's Paradise",
    cat: "Travel",
    date: "Feb 18, 2025",
    read: "5 min",
    slug: "istanbul-muslim-travelers-paradise",
    img: "/images/blog-3.jpg",
    placeholder: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=350&fit=crop",
    desc: "Explore the rich Islamic heritage of Turkey's cultural capital.",
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
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
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

export function formatPrice(prices: Record<Currency, number>, currency: Currency): string {
  const v = prices[currency];
  if (currency === "USD") return `$${v.toLocaleString()}`;
  return `${currency} ${v.toLocaleString()}`;
}

// ─── STATS ───
export const STATS = [
  { value: "15,000+", label: "Happy Pilgrims" },
  { value: "20+", label: "Years of Trust" },
  { value: "4.9★", label: "Client Rating" },
];

// ─── IMAGE HELPERS ───
export function getImageSrc(localPath: string, placeholder: string): string {
  // In development/when local images aren't available, use placeholders
  // Replace this logic when HD images are uploaded
  return placeholder;
}
