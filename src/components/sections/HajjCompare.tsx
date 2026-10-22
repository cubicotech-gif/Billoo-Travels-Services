"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckIcon, CloseIcon } from "@/components/ui/Icons";
import { formatMoney, formatPkgPrice, pkgCurrency } from "@/lib/packageCurrency";
import { metaOf, whatsappLink, STYLE_BLURB } from "@/lib/hajjMeta";
import type { DbPackage } from "@/lib/useHajjPackages";

export const MAX_COMPARE = 3;

// ─── Sticky bar shown while packages are ticked for comparison ───
export function CompareBar({
  items,
  onOpen,
  onClear,
}: {
  items: DbPackage[];
  onOpen: () => void;
  onClear: () => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] max-w-[560px]">
      <div className="bg-midnight text-white rounded-2xl shadow-[0_18px_50px_rgba(11,22,40,0.45)] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-heading text-[13px] font-bold">
            {items.length} of {MAX_COMPARE} selected
          </div>
          <div className="font-mono text-[11px] text-white/60 truncate">
            {items.map((p) => (p.code || "").toUpperCase()).join(" · ")}
          </div>
        </div>
        <button
          onClick={onClear}
          className="text-white/60 text-[12px] font-heading font-semibold bg-transparent border-none cursor-pointer hover:text-white px-1"
        >
          Clear
        </button>
        <button
          onClick={onOpen}
          disabled={items.length < 2}
          className="bg-accent text-white px-4 py-2.5 rounded-lg font-heading text-[13px] font-semibold border-none cursor-pointer hover:bg-accent-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {items.length < 2 ? "Pick one more" : "Compare"}
        </button>
      </div>
    </div>
  );
}

// ─── Side-by-side comparison ───
export function CompareModal({
  items,
  onClose,
  onRegister,
}: {
  items: DbPackage[];
  onClose: () => void;
  onRegister?: (p: DbPackage) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const metas = items.map((p) => metaOf(p));
  const currency = items[0] ? pkgCurrency(items[0]) : "SAR";

  // Every room type any selected package offers, in a stable order.
  const rooms: string[] = [];
  ["Sharing", "Quad", "Triple", "Double"].forEach((r) => {
    if (items.some((p) => p.pricing?.rooms?.some((x) => x.room.toLowerCase() === r.toLowerCase()))) rooms.push(r);
  });

  const labelCls = "sticky left-0 z-10 bg-surface-alt font-mono text-[10px] tracking-[1.2px] uppercase text-slate-400 px-3 py-3 align-top w-[92px] min-w-[92px] sm:w-[140px] sm:min-w-[140px]";
  const cellCls = "px-3 py-3 align-top text-[13px] text-slate-700 leading-snug border-l border-slate-100 min-w-[170px]";

  function priceCell(p: DbPackage, room: string) {
    const row = p.pricing?.rooms?.find((r) => r.room.toLowerCase() === room.toLowerCase());
    const tiers = p.pricing?.tiers || [];
    if (!row) return <span className="text-slate-300">—</span>;
    const lines = tiers.map((t, i) => {
      const v = row[t.key];
      return (
        <div key={t.key} className="flex items-baseline gap-1.5">
          {tiers.length > 1 && <span className="font-mono text-[10px] text-slate-400">{["A", "B"][i]}</span>}
          <span className={typeof v === "number" ? "font-heading font-bold text-midnight" : "text-slate-300 italic"}>
            {typeof v === "number" && v > 0 ? formatMoney(v, currency) : "N/A"}
          </span>
        </div>
      );
    });
    return <>{lines}</>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Compare packages">
      <div className="absolute inset-0 bg-midnight/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-[980px] max-h-[92vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-200">
          <div>
            <div className="font-heading text-[17px] font-bold text-midnight">Compare packages</div>
            <div className="text-[12px] text-slate-400">
              {currency === "USD" ? "US Dollar" : "Saudi Riyal"} price list · prices per person
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close comparison"
            className="w-9 h-9 rounded-full bg-surface-alt border-none cursor-pointer flex items-center justify-center text-midnight"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <th className={labelCls} scope="row">Package</th>
                {items.map((p) => (
                  <td key={p.id} className={cellCls}>
                    <div className="font-mono text-[11px] font-bold tracking-[1.5px] text-accent-dark">{(p.code || "").toUpperCase()}</div>
                    <div className="font-heading text-[14px] font-bold text-midnight leading-snug mt-0.5">{p.title}</div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className={labelCls} scope="row">Style</th>
                {items.map((p, i) => (
                  <td key={p.id} className={cellCls}>
                    <div className="font-semibold text-midnight">
                      {metas[i].style}
                      {metas[i].aziziya ? " · with Aziziya" : ""}
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5">{STYLE_BLURB[metas[i].style]}</div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className={labelCls} scope="row">Stay</th>
                {items.map((p, i) => (
                  <td key={p.id} className={cellCls}>
                    {metas[i].shifting ? "Shifting" : "Non-shifting"}
                    {metas[i].firstCity ? ` · ${metas[i].firstCity} first` : ""}
                  </td>
                ))}
              </tr>
              <tr>
                <th className={labelCls} scope="row">Length</th>
                {items.map((p) => (
                  <td key={p.id} className={cellCls}>
                    <div className="font-semibold text-midnight">{p.nights}</div>
                    {p.dates && <div className="text-[12px] text-slate-500">{p.dates}</div>}
                  </td>
                ))}
              </tr>
              <tr>
                <th className={labelCls} scope="row">Hotels</th>
                {items.map((p) => (
                  <td key={p.id} className={cellCls}>
                    {p.hotel}
                    {(p.pricing?.tiers?.length || 0) > 1 && (
                      <div className="text-[11.5px] text-slate-400 mt-1.5">
                        {p.pricing!.tiers!.map((t, i) => (
                          <div key={t.key}>
                            <span className="font-mono">{["A", "B"][i]}</span> · {t.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              {rooms.map((room) => (
                <tr key={room} className="bg-accent-pale/30">
                  <th className={labelCls} scope="row">{room}</th>
                  {items.map((p) => (
                    <td key={p.id} className={cellCls}>{priceCell(p, room)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th className={labelCls} scope="row">Highlights</th>
                {items.map((p) => (
                  <td key={p.id} className={cellCls}>
                    <div className="space-y-1.5">
                      {(p.includes || []).slice(0, 6).map((inc) => (
                        <div key={inc} className="flex items-start gap-1.5">
                          <span className="mt-[3px] shrink-0"><CheckIcon size={11} color="#10B981" /></span>
                          <span className="text-[12px] leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className={labelCls} scope="row"></th>
                {items.map((p) => (
                  <td key={p.id} className={cellCls}>
                    <div className="flex flex-col gap-2">
                      {onRegister && (
                        <button
                          onClick={() => {
                            onClose();
                            onRegister(p);
                          }}
                          className="bg-accent text-white py-2.5 rounded-lg font-heading text-[12.5px] font-semibold border-none cursor-pointer hover:bg-accent-dark"
                        >
                          Register for {(p.code || "").toUpperCase()}
                        </button>
                      )}
                      <a
                        href={whatsappLink(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center bg-[#25D366] text-white py-2.5 rounded-lg font-heading text-[12.5px] font-semibold no-underline hover:opacity-90"
                      >
                        WhatsApp us
                      </a>
                      <Link
                        href={`/packages/${p.id}`}
                        className="text-center border border-slate-200 text-midnight py-2.5 rounded-lg font-heading text-[12.5px] font-semibold no-underline hover:border-accent"
                      >
                        Full details · {formatPkgPrice(p)}
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
