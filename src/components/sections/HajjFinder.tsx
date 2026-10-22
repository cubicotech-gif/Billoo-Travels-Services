"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowIcon, KaabaIcon } from "@/components/ui/Icons";
import { CONTACT } from "@/lib/data";
import { formatMoney, pkgCurrency } from "@/lib/packageCurrency";
import { metaOf, roomFrom, STYLE_BLURB, whatsappLink, type HajjStyle } from "@/lib/hajjMeta";
import type { DbPackage } from "@/lib/useHajjPackages";

type Stay = "haram" | "mix" | "value";
type Length = "short" | "mid" | "long" | "any";

const STAYS: { key: Stay; title: string; desc: string; styles: HajjStyle[] }[] = [
  { key: "haram", title: "Hotel in front of the Haram", desc: "One hotel base, steps from Masjid al-Haram", styles: ["Non-Aziziya"] },
  { key: "mix", title: "Hotel + Aziziya", desc: "Makkah hotel nights, then Aziziya close to Jamarat", styles: ["Flex", "Comfort"] },
  { key: "value", title: "Best value", desc: "Aziziya near Jamarat for the whole Makkah stay", styles: ["Value"] },
];

const LENGTHS: { key: Length; label: string; test: (d: number) => boolean }[] = [
  { key: "short", label: "9–10 days", test: (d) => d <= 10 },
  { key: "mid", label: "13–14 days", test: (d) => d >= 11 && d <= 14 },
  { key: "long", label: "17–20 days", test: (d) => d >= 15 },
  { key: "any", label: "Not sure", test: () => true },
];

const ROOMS: { key: string; label: string; desc: string }[] = [
  { key: "Quad", label: "Quad", desc: "4 sharing — lowest price" },
  { key: "Triple", label: "Triple", desc: "3 sharing" },
  { key: "Double", label: "Double", desc: "Couple, or 2 sharing" },
];

function Option({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl border-2 px-4 py-3 cursor-pointer transition-all ${
        active ? "border-accent bg-white shadow-[0_8px_24px_rgba(77,163,232,0.16)]" : "border-slate-200 bg-white/70 hover:border-accent/50"
      }`}
    >
      <span className="block font-heading text-[14px] font-bold text-midnight">{title}</span>
      {desc && <span className="block text-[12px] text-slate-500 mt-0.5 leading-snug">{desc}</span>}
    </button>
  );
}

export default function HajjFinder({
  packages,
  onRegister,
}: {
  packages: DbPackage[];
  onRegister?: (p: DbPackage) => void;
}) {
  const [open, setOpen] = useState(false);
  const [stay, setStay] = useState<Stay | null>(null);
  const [length, setLength] = useState<Length | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  const done = stay && length && room;

  const { results, relaxed } = useMemo(() => {
    if (!stay || !length || !room) return { results: [] as DbPackage[], relaxed: false };
    const styles = STAYS.find((s) => s.key === stay)!.styles;
    const lenTest = LENGTHS.find((l) => l.key === length)!.test;
    const base = packages.filter((p) => styles.includes(metaOf(p).style) && roomFrom(p, room) > 0);
    const exact = base.filter((p) => lenTest(metaOf(p).days));
    const pool = exact.length ? exact : base;
    return {
      results: [...pool].sort((a, b) => roomFrom(a, room) - roomFrom(b, room)).slice(0, 4),
      relaxed: exact.length === 0 && base.length > 0,
    };
  }, [packages, stay, length, room]);

  function reset() {
    setStay(null);
    setLength(null);
    setRoom(null);
  }

  return (
    <div className="max-w-[860px] mx-auto mb-8 sm:mb-10">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-4 text-left bg-white border-2 border-dashed border-accent/40 rounded-2xl px-5 py-4 cursor-pointer hover:border-accent hover:bg-accent-pale/40 transition-all"
        >
          <span className="w-10 h-10 rounded-full bg-accent-pale flex items-center justify-center shrink-0">
            <KaabaIcon size={18} />
          </span>
          <span className="flex-1">
            <span className="block font-heading text-[15px] font-bold text-midnight">Not sure which package is right?</span>
            <span className="block text-[13px] text-slate-500">Answer 3 quick questions and we&apos;ll narrow it down to the best 3–4.</span>
          </span>
          <ArrowIcon size={16} color="#4DA3E8" />
        </button>
      ) : (
        <div className="bg-accent-pale/50 border border-accent/20 rounded-2xl p-5 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <div className="font-heading text-[16px] font-bold text-midnight">Find my package</div>
            <div className="flex gap-3">
              {(stay || length || room) && (
                <button onClick={reset} className="text-[12px] font-heading font-semibold text-accent bg-transparent border-none cursor-pointer hover:underline p-0">
                  Start over
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-[12px] font-heading font-semibold text-slate-400 bg-transparent border-none cursor-pointer hover:text-midnight p-0">
                Close
              </button>
            </div>
          </div>

          <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-accent mb-2">1 · Where would you like to stay?</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
            {STAYS.map((s) => (
              <Option key={s.key} active={stay === s.key} onClick={() => setStay(s.key)} title={s.title} desc={s.desc} />
            ))}
          </div>

          <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-accent mb-2">2 · How long?</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            {LENGTHS.map((l) => (
              <Option key={l.key} active={length === l.key} onClick={() => setLength(l.key)} title={l.label} />
            ))}
          </div>

          <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-accent mb-2">3 · Who is travelling?</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ROOMS.map((r) => (
              <Option key={r.key} active={room === r.key} onClick={() => setRoom(r.key)} title={r.label} desc={r.desc} />
            ))}
          </div>

          {done && (
            <div className="mt-6 pt-5 border-t border-accent/20">
              {results.length === 0 ? (
                <p className="text-[14px] text-slate-600">
                  No package offers that room in this style. Try a different room type, or{" "}
                  <a className="text-accent font-semibold" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">ask an advisor</a>.
                </p>
              ) : (
                <>
                  <p className="text-[13px] text-slate-500 mb-3">
                    {relaxed
                      ? "No exact match for that length — here are the closest packages in this style, cheapest first:"
                      : `Best matches, cheapest ${room!.toLowerCase()} price first:`}
                  </p>
                  <div className="space-y-2.5">
                    {results.map((p) => {
                      const m = metaOf(p);
                      return (
                        <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-mono text-[11px] font-bold tracking-[1.5px] text-accent-dark">{(p.code || "").toUpperCase()}</span>
                              <span className="text-[11px] text-slate-400">{p.nights}{m.firstCity ? ` · ${m.firstCity} first` : ""}</span>
                            </div>
                            <div className="font-heading text-[14px] font-bold text-midnight leading-snug">{p.title}</div>
                            <div className="text-[12px] text-slate-500 mt-0.5">{STYLE_BLURB[m.style]}</div>
                          </div>
                          <div className="sm:text-right shrink-0">
                            <div className="font-mono text-[10px] uppercase tracking-[1px] text-slate-400">{room} · per person</div>
                            <div className="font-heading text-[18px] font-bold text-midnight">{formatMoney(roomFrom(p, room!), pkgCurrency(p))}</div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Link href={`/packages/${p.id}`} className="px-3.5 py-2.5 rounded-lg border border-slate-200 text-midnight font-heading text-[12.5px] font-semibold no-underline hover:border-accent">
                              Details
                            </Link>
                            {onRegister ? (
                              <button onClick={() => onRegister(p)} className="px-3.5 py-2.5 rounded-lg bg-accent text-white font-heading text-[12.5px] font-semibold border-none cursor-pointer hover:bg-accent-dark">
                                Register
                              </button>
                            ) : (
                              <a href={whatsappLink(p)} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2.5 rounded-lg bg-[#25D366] text-white font-heading text-[12.5px] font-semibold no-underline">
                                WhatsApp
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
