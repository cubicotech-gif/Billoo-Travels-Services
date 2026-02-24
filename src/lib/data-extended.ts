import { PACKAGES, BLOGS, TEAM } from "./data";

// ─── EXTENDED PACKAGES (full details for detail pages) ───
export const PACKAGES_DETAILED = PACKAGES.map((p) => ({
  ...p,
  overview:
    p.type === "Hajj"
      ? "Experience the sacred journey of Hajj with unmatched luxury and devotion. Our Executive Hajj package ensures you focus solely on worship while we handle every detail with precision and care."
      : p.badge === "Most Booked"
      ? "Our most popular Umrah package combines spiritual fulfillment with five-star luxury. Every aspect of your journey is meticulously planned to ensure a profound and comfortable experience."
      : "A premium Umrah experience designed for those seeking spiritual enrichment with exceptional comfort. Perfect for families and individuals looking for quality without compromise.",
  itinerary: [
    {
      day: "Day 1",
      title: "Arrival & Check-in",
      desc: "Airport reception with private transfer. Hotel check-in and orientation briefing. Evening free for rest.",
    },
    {
      day: "Day 2-3",
      title: "Makkah — Umrah Rituals",
      desc: "Guided Umrah performance with scholarly guidance. Tawaf, Sa'i, and all essential rituals covered with personal attention.",
    },
    {
      day: "Day 4-7",
      title: "Makkah — Spiritual Immersion",
      desc: "Daily prayers at Masjid Al-Haram. Optional guided Ziyarat to historical sites. Scholar-led discussion sessions.",
    },
    {
      day: "Day 8-10",
      title: "Madinah — Prophet's City",
      desc: "Transfer to Madinah. Visit Masjid An-Nabawi. Guided tours of Uhud, Quba Mosque, and historical landmarks.",
    },
    {
      day: "Final Day",
      title: "Departure",
      desc: "Farewell breakfast. Private airport transfer. Departure with lifelong memories and spiritual renewal.",
    },
  ],
  included: [
    "Return flights (class as per package tier)",
    "5-star hotel accommodation near Haram",
    "Daily breakfast & dinner buffet",
    "Private airport transfers",
    "Guided Umrah/Hajj rituals",
    "Ziyarat tours in Makkah & Madinah",
    "Scholar guidance throughout",
    "24/7 concierge support",
    "Travel insurance",
    "Visa processing",
  ],
  notIncluded: [
    "Personal expenses & shopping",
    "Lunch meals",
    "Tips & gratuities",
    "Additional excursions not in itinerary",
    "Phone/internet charges",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=600&h=400&fit=crop",
  ],
}));

// ─── EXTENDED BLOG POSTS ───
export const BLOGS_DETAILED = BLOGS.map((b) => ({
  ...b,
  content: [
    {
      type: "text" as const,
      text: `${b.title} — this comprehensive guide covers everything you need to know before embarking on your journey. Whether you're a first-time traveler or a seasoned pilgrim, this guide will help you prepare thoroughly.`,
    },
    {
      type: "heading" as const,
      text: "Planning Ahead",
    },
    {
      type: "text" as const,
      text: "The key to a successful spiritual journey lies in thorough preparation. Start by ensuring your passport has at least six months validity and gather all necessary documentation. Book your packages well in advance — at least 2-3 months for Umrah and 4-6 months for Hajj to secure the best accommodations.",
    },
    {
      type: "heading" as const,
      text: "What to Pack",
    },
    {
      type: "text" as const,
      text: "Pack light but smart. Essential items include comfortable walking shoes, modest clothing suitable for prayer, personal medications, a small prayer mat, and copies of all important documents. Remember that the weather can vary significantly, so layer your clothing.",
    },
    {
      type: "heading" as const,
      text: "During Your Journey",
    },
    {
      type: "text" as const,
      text: "Stay hydrated, especially during summer months. Take advantage of the scholarly guidance provided in your package — they can enrich your understanding of the rituals and their significance. Most importantly, maintain patience and focus on the spiritual aspects of your journey.",
    },
    {
      type: "heading" as const,
      text: "Final Thoughts",
    },
    {
      type: "text" as const,
      text: "Every pilgrimage is a deeply personal experience. Trust in the process, rely on your travel provider for logistics, and dedicate your energy to worship and reflection. The memories and spiritual growth from this journey will last a lifetime.",
    },
  ],
  author: "Billoo Travels Editorial Team",
  authorImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
}));

// ─── ABOUT PAGE DATA ───
export const ABOUT = {
  story: [
    "Founded in 2000 by the visionary Sharif family, Billoo Travels began with a simple yet profound mission: to make the sacred journey of Hajj and Umrah accessible, comfortable, and spiritually enriching for every Pakistani pilgrim.",
    "Over two decades, we've grown from a small Karachi-based office into one of Pakistan's most trusted travel agencies, serving over 15,000 pilgrims and earning the trust of families across the nation.",
    "Today, under the leadership of CEO Mr. Shoaib Zakaria, we continue to raise the bar in premium spiritual travel — combining five-star hospitality with deep respect for the sanctity of the journey.",
  ],
  mission: "To elevate every sacred journey through meticulous planning, elite hospitality, and an unwavering commitment to our clients' spiritual and physical comfort.",
  vision: "To be the most trusted name in premium Hajj and Umrah travel across South Asia, known for excellence, integrity, and devotion to service.",
  values: [
    { title: "Excellence", desc: "Every detail matters. We deliver nothing less than exceptional service." },
    { title: "Trust", desc: "20+ years of transparent, honest relationships with our pilgrims." },
    { title: "Devotion", desc: "We approach every journey with the reverence it deserves." },
    { title: "Innovation", desc: "Constantly improving our services with modern solutions." },
  ],
  milestones: [
    { year: "2000", event: "Billoo Travels founded in Karachi" },
    { year: "2005", event: "Received Ministry of Hajj License (ID 1251)" },
    { year: "2010", event: "Expanded to premium 5-star packages" },
    { year: "2015", event: "10,000th pilgrim served milestone" },
    { year: "2020", event: "Launched digital booking platform" },
    { year: "2024", event: "15,000+ pilgrims served with 4.9★ rating" },
  ],
  team: TEAM,
};

// ─── POLICIES ───
export const PRIVACY_POLICY = {
  lastUpdated: "January 1, 2025",
  sections: [
    {
      title: "Information We Collect",
      content: "We collect personal information you provide when booking packages, including your name, email address, phone number, passport details, travel preferences, and payment information. We also collect usage data when you interact with our website.",
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to process bookings, communicate about your travel arrangements, provide customer support, send relevant updates about your journey, process payments, and improve our services. We never sell your personal data to third parties.",
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures including SSL encryption, secure payment processing through BankAlfalah, and restricted access to personal data. Your passport and sensitive documents are stored in encrypted formats.",
    },
    {
      title: "Cookies & Tracking",
      content: "Our website uses essential cookies for functionality and analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings.",
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. Contact our data protection team at privacy@billootravels.com for any requests.",
    },
    {
      title: "Contact",
      content: "For privacy-related inquiries, reach us at privacy@billootravels.com or call 021-32313461-63.",
    },
  ],
};

export const TERMS_OF_SERVICE = {
  lastUpdated: "January 1, 2025",
  sections: [
    {
      title: "Booking & Confirmation",
      content: "All bookings are subject to availability and confirmation. A booking is confirmed only upon receipt of the required deposit and written confirmation from Billoo Travels. Package prices are subject to change until booking is confirmed.",
    },
    {
      title: "Payment Terms",
      content: "A 30% deposit is required at the time of booking. The remaining balance must be paid at least 30 days before the departure date. Payments can be made via bank transfer, credit/debit card through BankAlfalah, or cash at our office.",
    },
    {
      title: "Travel Documents",
      content: "Clients are responsible for ensuring valid passports (minimum 6 months validity), providing accurate personal information, and meeting all visa and health requirements. Billoo Travels assists with visa processing but does not guarantee approval.",
    },
    {
      title: "Changes & Modifications",
      content: "Changes to confirmed bookings may incur additional charges depending on the nature of the change and timing. Name changes, date changes, and package upgrades/downgrades are subject to availability and supplier policies.",
    },
    {
      title: "Liability",
      content: "Billoo Travels acts as an intermediary between clients and service providers (airlines, hotels, transport). While we ensure the highest standards, we are not liable for service disruptions caused by third parties, natural events, or circumstances beyond our control.",
    },
    {
      title: "Governing Law",
      content: "These terms are governed by the laws of Pakistan. Any disputes shall be resolved through arbitration in Karachi.",
    },
  ],
};

export const REFUND_POLICY = {
  lastUpdated: "January 1, 2025",
  sections: [
    {
      title: "Cancellation by Client",
      content: "Cancellations made 30+ days before departure: Full refund minus processing fee (PKR 10,000). Cancellations 15-29 days before: 50% refund. Cancellations less than 15 days: Case-by-case evaluation, generally non-refundable.",
    },
    {
      title: "Cancellation by Billoo Travels",
      content: "In the rare event that we cancel a package, clients receive a full 100% refund or the option to transfer to an alternative package of equal or greater value at no additional cost.",
    },
    {
      title: "Visa Rejection",
      content: "If a visa application is rejected despite proper documentation, the client receives a full refund minus visa processing fees and any non-recoverable supplier costs.",
    },
    {
      title: "Refund Processing",
      content: "Approved refunds are processed within 7-14 business days. Refunds are issued to the original payment method. Bank processing times may add additional days.",
    },
    {
      title: "Non-Refundable Items",
      content: "Visa processing fees, travel insurance premiums (once activated), and any third-party services already rendered are non-refundable regardless of cancellation timing.",
    },
    {
      title: "Force Majeure",
      content: "In cases of force majeure (natural disasters, pandemics, government restrictions), Billoo Travels will work with clients to reschedule or provide credit vouchers valid for 12 months.",
    },
  ],
};
