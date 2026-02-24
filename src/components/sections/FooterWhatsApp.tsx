import { CONTACT } from "@/lib/data";
import { WhatsAppIcon } from "@/components/ui/Icons";

// ─── FOOTER ───
export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];
  const serviceLinks = [
    { label: "Hajj Packages", href: "/packages" },
    { label: "Umrah Packages", href: "/packages" },
    { label: "Visa Processing", href: "/#services" },
    { label: "Luxury Tours", href: "/packages" },
    { label: "Group Bookings", href: "/contact" },
  ];

  return (
    <footer className="bg-charcoal pt-16 pb-7 px-6 md:px-9">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-10 lg:gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-accent rounded-[10px] flex items-center justify-center font-display font-bold text-lg text-white">B</div>
            <div className="font-heading text-base font-bold text-white tracking-wide">BILLOO TRAVELS</div>
          </div>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-[280px]">
            Pakistan&apos;s premier travel agency for luxury Hajj, Umrah and international tours since 2000.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="font-mono text-[10px] text-white/30 tracking-[2px] mb-5">NAVIGATE</h4>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="block text-white/40 no-underline text-[13px] mb-2.5 hover:text-accent transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Services */}
        <div>
          <h4 className="font-mono text-[10px] text-white/30 tracking-[2px] mb-5">SERVICES</h4>
          {serviceLinks.map((l) => (
            <a key={l.label} href={l.href} className="block text-white/40 no-underline text-[13px] mb-2.5 hover:text-accent transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Agent ID */}
        <div>
          <div className="p-5 bg-white/[0.03] rounded-[14px] border border-white/[0.06]">
            <div className="font-mono text-[10px] text-white/30 tracking-[2px] mb-1.5">LICENSED OPERATOR</div>
            <div className="text-[13px] text-white/50 mb-2.5">Ministry of Hajj & Umrah</div>
            <div className="font-heading text-[28px] font-bold text-accent">ID {CONTACT.agentId}</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto mt-12 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-3">
        <span className="text-xs text-white/25">© 2025 Billoo Travels Services Pvt Ltd. All Rights Reserved.</span>
        <div className="flex gap-5">
          {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Refunds", href: "/refunds" }].map((l) => (
            <a key={l.label} href={l.href} className="text-white/25 no-underline text-xs hover:text-accent transition-colors">{l.label}</a>
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
      className="fixed bottom-7 right-7 w-[54px] h-[54px] rounded-[14px] bg-[#25D366] flex items-center justify-center z-50 shadow-[0_6px_20px_rgba(37,211,102,0.25)] transition-all hover:-translate-y-1 hover:rounded-full no-underline"
    >
      <WhatsAppIcon />
    </a>
  );
}
