// ─── HAJJ CAMPAIGN — SHARED CONTENT ───
// Single source of truth for the home promo section, the /hajj landing page,
// and the admin share-kit. Update the campaign here and it flows everywhere.

export const HAJJ = {
  year: "2027",
  hijri: "1449 AH",
  packageInterest: "Hajj 2027 Registration",
  // Public landing page for social-media campaigns
  landingPath: "/hajj",
  // Hero / share imagery
  heroImage:
    "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=85&w=2400",
  shareImage:
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=85&w=1200&h=630",
};

// Headline benefits shown on the promo + landing page
export const HAJJ_BENEFITS = [
  "Government-approved Hajj group operator (Agent ID 1251)",
  "Priority visa & Nusuk processing handled for you",
  "5-star hotels within walking distance of the Haram",
  "VIP Mina & Arafat camps with scholar guidance",
];

// Trust signals — the numbers that build confidence
export const HAJJ_TRUST = [
  { value: "1969", label: "Serving Pilgrims Since" },
  { value: "15,000+", label: "Pilgrims Guided" },
  { value: "4.9★", label: "Client Rating" },
  { value: "100%", label: "Visa Support" },
];

// Why register with Billoo (icon names map to Icons.tsx via ICON_MAP)
export const HAJJ_WHY = [
  {
    icon: "Shield",
    title: "Licensed & Ministry-Approved",
    desc: "A fully registered Hajj operator recognised by the Ministry of Religious Affairs — your pilgrimage is in safe, accountable hands.",
  },
  {
    icon: "Kaaba",
    title: "Steps From the Haram",
    desc: "Hand-picked 5-star hotels within walking distance of Masjid al-Haram and Masjid an-Nabawi — more time in worship, less time travelling.",
  },
  {
    icon: "Visa",
    title: "End-to-End Visa & Nusuk",
    desc: "We manage documentation, submission and the entire Nusuk process, so your seat is secured without the paperwork stress.",
  },
  {
    icon: "Headset",
    title: "24/7 Concierge in the Kingdom",
    desc: "A dedicated coordinator on call throughout your journey — in Pakistan and in Saudi Arabia — whenever you need help.",
  },
  {
    icon: "Plane",
    title: "Seamless, Well-Paced Logistics",
    desc: "Flights, transfers, ziyarat and meals arranged into one effortless itinerary designed around comfort and reflection.",
  },
  {
    icon: "Check",
    title: "Transparent, All-Inclusive Pricing",
    desc: "Clear package pricing with no hidden costs. What you are quoted is exactly what you pay — nothing more.",
  },
];

// The registration journey — what happens after they sign up
export const HAJJ_STEPS = [
  {
    step: "01",
    title: "Register Your Interest",
    desc: "Share your details in under a minute. No payment is required to register — you are simply reserving your place in the queue.",
  },
  {
    step: "02",
    title: "Advisor Call-Back",
    desc: "A dedicated Hajj advisor calls you back to understand your needs and walk you through package options and pricing.",
  },
  {
    step: "03",
    title: "Choose Your Package",
    desc: "Select the package that fits your budget and comfort. We confirm your seat with a simple deposit — the rest is due later.",
  },
  {
    step: "04",
    title: "We Handle Everything",
    desc: "Visa, Nusuk, hotels, flights and ziyarat — all arranged for you. You focus on preparing spiritually for the journey of a lifetime.",
  },
];

// What every Hajj package includes
export const HAJJ_INCLUDED = [
  "Return flights from Pakistan",
  "5-star hotels near the Haram (Makkah & Madinah)",
  "VIP Mina & Arafat air-conditioned camps",
  "Daily breakfast & dinner buffet",
  "Complete visa & Nusuk processing",
  "Guided Hajj rituals with a scholar",
  "Ziyarat tours in Makkah & Madinah",
  "Private airport transfers",
  "24/7 on-ground concierge support",
  "Travel insurance",
];

// Hajj-specific FAQ (also emitted as FAQ schema on the landing page)
export const HAJJ_FAQ = [
  {
    q: `When does Hajj ${HAJJ.year} registration close?`,
    a: "Seats are limited and allocated on a first-come basis by the Saudi quota system. We strongly recommend registering early — once our allocation fills, registration closes for the season.",
  },
  {
    q: "Do I have to pay anything to register?",
    a: "No. Registration is completely free and non-binding. You simply reserve your place, and an advisor calls you back with package details. Payment is only required once you choose and confirm a package.",
  },
  {
    q: "What documents will I need for Hajj?",
    a: "A passport valid for at least 6 months, passport photographs, vaccination certificates and a completed visa form. Our team prepares and submits everything on your behalf.",
  },
  {
    q: "Are your Hajj operations officially licensed?",
    a: "Yes. Billoo Travels is a government-approved Hajj & Umrah operator (Agent ID 1251), recognised by the Ministry of Religious Affairs and partnered with the Saudi Nusuk platform.",
  },
  {
    q: "Can I register for my whole family or a group?",
    a: "Absolutely. Register with your group size and we will arrange family-friendly accommodation, group coordination and special pricing for larger parties.",
  },
  {
    q: "How close will the hotels be to the Haram?",
    a: "We hand-pick 5-star hotels within walking distance of Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah, so you spend more time in worship and less time commuting.",
  },
];
