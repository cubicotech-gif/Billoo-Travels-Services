import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { WhatsAppIcon, PhoneIcon, MailIcon, MapPinIcon } from "@/components/ui/Icons";

// ─── FOOTER ───
export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Packages", href: "/packages" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];
  const serviceLinks = [
    { label: "Hajj Packages", href: "/packages" },
    { label: "Umrah Packages", href: "/packages" },
    { label: "Visa Processing", href: "/contact" },
    { label: "Luxury Tours", href: "/packages" },
    { label: "Group Bookings", href: "/contact" },
    { label: "Book Now", href: "/booking" },
  ];

  return (
    <footer className="bg-charcoal pt-16 pb-7 px-6 md:px-9">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.8fr] gap-10 lg:gap-12">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-4 no-underline">
            <div className="w-9 h-9 bg-accent rounded-[10px] flex items-center justify-center font-display font-bold text-lg text-white">B</div>
            <div className="font-heading text-base font-bold text-white tracking-wide">BILLOO TRAVELS</div>
          </Link>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-[280px] mb-6">
            Pakistan&apos;s premier travel agency for luxury Hajj, Umrah and international tours since 2000.
          </p>
          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2.5 text-[12px] text-white/35 no-underline hover:text-accent transition-colors">
              <PhoneIcon size={13} color="rgba(255,255,255,0.3)" />
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-[12px] text-white/35 no-underline hover:text-accent transition-colors">
              <MailIcon size={13} color="rgba(255,255,255,0.3)" />
              {CONTACT.email}
            </a>
            <div className="flex items-start gap-2.5 text-[12px] text-white/35">
              <MapPinIcon size={13} color="rgba(255,255,255,0.3)" />
              <span>{CONTACT.address}</span>
            </div>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="font-mono text-[10px] text-white/30 tracking-[2px] mb-5">NAVIGATE</h4>
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="block text-white/40 no-underline text-[13px] mb-2.5 hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Services */}
        <div>
          <h4 className="font-mono text-[10px] text-white/30 tracking-[2px] mb-5">SERVICES</h4>
          {serviceLinks.map((l) => (
            <Link key={l.label} href={l.href} className="block text-white/40 no-underline text-[13px] mb-2.5 hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Agent ID + WhatsApp */}
        <div className="flex flex-col gap-4">
          <div className="p-5 bg-white/[0.03] rounded-[14px] border border-white/[0.06]">
            <div className="font-mono text-[10px] text-white/30 tracking-[2px] mb-1.5">LICENSED OPERATOR</div>
            <div className="text-[13px] text-white/50 mb-2.5">Ministry of Hajj & Umrah</div>
            <div className="font-heading text-[28px] font-bold text-accent">ID {CONTACT.agentId}</div>
          </div>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-[14px] no-underline hover:bg-[#25D366]/15 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <WhatsAppIcon size={18} />
            </div>
            <div>
              <div className="font-heading text-sm font-bold text-white">Chat on WhatsApp</div>
              <div className="text-[11px] text-white/40">Instant replies during business hours</div>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto mt-12 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-3">
        <span className="text-xs text-white/25">© 2025 Billoo Travels Services Pvt Ltd. All Rights Reserved.</span>
        <div className="flex gap-5">
          {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Refunds", href: "/refunds" }].map((l) => (
            <Link key={l.label} href={l.href} className="text-white/25 no-underline text-xs hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP WIDGET ───
export function WhatsAppWidget() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 w-[54px] h-[54px] rounded-[14px] bg-[#25D366] flex items-center justify-center z-50 shadow-[0_6px_20px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-1 hover:rounded-full hover:shadow-[0_10px_30px_rgba(37,211,102,0.4)] no-underline"
    >
      <WhatsAppIcon />
    </a>
  );
}
