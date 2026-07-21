"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { CONTACT } from "@/lib/data";
import { HAJJ } from "@/lib/hajj";
import { SITE } from "@/lib/seo";
import { formatPkgPrice, pkgCurrency } from "@/lib/packageCurrency";

interface DbPackage {
  id: number;
  type: string;
  code: string | null;
  title: string;
  nights: string;
  hotel: string;
  hotel_short: string | null;
  dates: string | null;
  currency: string | null;
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  includes: string[];
  badge: string | null;
  img: string | null;
}

const HASHTAGS = `#Hajj${HAJJ.year} #Hajj #HajjPackages #Umrah #BillooTravels #Makkah #Madinah #HajjRegistration`;

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }
  return (
    <button
      onClick={copy}
      className={`px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border transition-all ${
        copied ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-[#0B1628] text-white border-none hover:bg-[#1a3054]"
      }`}
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {copied ? "✓ Copied!" : `⧉ ${label}`}
    </button>
  );
}

export default function AdminPackageShare() {
  const params = useParams();
  const [pkg, setPkg] = useState<DbPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<"facebook" | "instagram" | "whatsapp">("facebook");

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/packages/${params.id}?all=1`)
      .then((r) => r.json())
      .then((d) => setPkg(d.package || null))
      .catch(() => setPkg(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  const link = pkg ? `${SITE.url}/packages/${pkg.id}?utm_source=${channel}&utm_medium=social&utm_campaign=hajj${HAJJ.year}` : "";

  const captions = useMemo(() => {
    if (!pkg) return { facebook: "", instagram: "", whatsapp: "" };
    const price = formatPkgPrice(pkg);
    const highlights = (pkg.includes || []).slice(0, 4);
    const bullets = highlights.map((h) => `✅ ${h}`).join("\n");
    const hotel = pkg.hotel_short || pkg.hotel;

    return {
      facebook: `🕋 ${pkg.title} — Hajj ${HAJJ.year} (${HAJJ.hijri})

Perform Hajj in comfort with Billoo Travels, a government-approved operator serving pilgrims since 1969.

🏨 ${hotel}
🗓️ ${pkg.nights}${pkg.dates ? ` · ${pkg.dates}` : ""}
💰 From ${price} per person

${bullets}

Seats are limited and allocated on a first-come basis. Reserve your place today 👇
👉 ${link}
📞 Or call us: ${CONTACT.phone}

${HASHTAGS}`,

      instagram: `🕋 ${pkg.title} — Hajj ${HAJJ.year}

Your journey to the House of Allah, handled with care. From ${price} per person.

✨ ${pkg.nights} · ${hotel}
${bullets}

Limited seats. 🔗 Link in bio to register.

${HASHTAGS}`,

      whatsapp: `🕋 *${pkg.title}* — Hajj ${HAJJ.year}

Assalamu Alaikum. Here are the details for this Hajj ${HAJJ.year} package with Billoo Travels (approved operator since 1969):

🏨 ${hotel}
🗓️ ${pkg.nights}${pkg.dates ? ` · ${pkg.dates}` : ""}
💰 From *${price}* per person

${bullets}

Full details & registration 👉 ${link}
Or reply to this message and our advisor will call you back, InshaAllah.`,
    };
  }, [pkg, link]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!pkg) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <h1 className="text-xl font-bold text-[#1E293B] mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>Package not found</h1>
          <Link href="/admin/packages" className="text-[#4DA3E8] text-sm font-semibold no-underline hover:underline">← Back to Packages</Link>
        </div>
      </AdminLayout>
    );
  }

  const price = formatPkgPrice(pkg);
  const currency = pkgCurrency(pkg);
  const activeCaption = captions[channel];
  const highlights = (pkg.includes || []).slice(0, 3);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link href="/admin/packages" className="text-[11px] text-slate-400 hover:text-[#4DA3E8] no-underline font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ← All Packages
          </Link>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-1" style={{ fontFamily: "'Sora', sans-serif" }}>
            Share Kit — {pkg.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            <span className="font-semibold text-[#4DA3E8]">{currency} package</span> · Download a PDF brochure or grab a ready-to-post social card &amp; caption.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/packages/${pkg.id}/brochure`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4DA3E8] text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border-none no-underline hover:bg-[#2B7CC4] transition-all"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            ⬇ PDF Brochure
          </a>
          <a
            href={`/packages/${pkg.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-slate-600 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border border-slate-200 no-underline hover:border-[#4DA3E8] transition-all"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            ↗ Public Page
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
        {/* Left: square social card */}
        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-slate-400 mb-2.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Square Post (1:1) — screenshot to post
          </div>
          <div
            className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-square"
            style={{
              backgroundImage: pkg.img
                ? `linear-gradient(165deg, rgba(11,22,40,0.92) 0%, rgba(11,22,40,0.78) 45%, rgba(21,37,69,0.7) 100%), url('${pkg.img}')`
                : "linear-gradient(165deg, #0B1628 0%, #152545 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4DA3E8] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>B</div>
                  <div>
                    <div className="text-[10.5px] font-bold tracking-[1.5px]" style={{ fontFamily: "'Sora', sans-serif" }}>BILLOO TRAVELS</div>
                    <div className="text-[7px] tracking-[2px] text-[#7EC8FF]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>PVT LTD · EST. 1969</div>
                  </div>
                </div>
                <span className="text-[8px] tracking-[1.5px] uppercase bg-[#4DA3E8] px-2 py-1 rounded-md font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {pkg.type}{pkg.code ? ` · ${pkg.code}` : ""}
                </span>
              </div>

              {/* Middle */}
              <div>
                <div className="text-[9px] tracking-[3px] uppercase text-[#7EC8FF] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Hajj {HAJJ.year} · {HAJJ.hijri}
                </div>
                <div className="text-[26px] leading-[1.05] font-normal mb-2.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {pkg.title}
                </div>
                <div className="flex flex-col gap-1">
                  {highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5 text-[11px] text-white/85">
                      <span className="text-emerald-300">✓</span> {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price band */}
              <div>
                <div className="flex items-end justify-between border-t border-white/15 pt-3.5">
                  <div>
                    <div className="text-[8px] tracking-[1.5px] uppercase text-white/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>From · per person</div>
                    <div className="text-[24px] font-bold text-[#7EC8FF]" style={{ fontFamily: "'Sora', sans-serif" }}>{price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/80 font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>{pkg.nights}</div>
                    <div className="text-[9px] text-white/55">{pkg.hotel_short || pkg.hotel}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-[10px] text-white/80 font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>{SITE.url.replace("https://", "")}/hajj</div>
                  <div className="text-[10px] text-[#7EC8FF]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{CONTACT.phone}</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[12px] text-slate-400 mt-3 leading-relaxed">
            Screenshot this card for Facebook / Instagram feed posts. It fills automatically from this package&apos;s data and price.
          </p>
        </div>

        {/* Right: caption composer */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 h-max">
          <div className="flex flex-wrap gap-2 mb-4">
            {([
              { k: "facebook", label: "📘 Facebook" },
              { k: "instagram", label: "📸 Instagram" },
              { k: "whatsapp", label: "💬 WhatsApp" },
            ] as const).map((c) => (
              <button
                key={c.k}
                onClick={() => setChannel(c.k)}
                className={`px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border transition-all ${
                  channel === c.k ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"
                }`}
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] tracking-[1.5px] uppercase text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Caption
            </div>
            <span className="text-[11px] text-slate-400">{activeCaption.length} characters</span>
          </div>

          <textarea
            readOnly
            value={activeCaption}
            rows={18}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-[13.5px] text-[#1E293B] leading-relaxed resize-none focus:outline-none focus:border-[#4DA3E8]"
          />

          <div className="flex flex-wrap gap-2.5 mt-4">
            <CopyButton text={activeCaption} label="Copy Caption" />
            <CopyButton text={link} label="Copy Link" />
            <CopyButton text={HASHTAGS} label="Copy Hashtags" />
          </div>

          {channel === "instagram" && (
            <p className="text-[12px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-2.5 mt-4">
              💡 Instagram doesn&apos;t allow clickable links in captions. Set your bio link to this package link, then post the square card + caption.
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
