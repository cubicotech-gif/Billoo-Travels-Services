// Renders a Hajj itinerary grouped into journey stages (In Madinah, In Makkah,
// Days of Hajj, Departure…) so it reads the way a pilgrim thinks about the trip
// — instead of a long flat list of days. Each stage is a card with its day
// range; each day is a clean row of Day · date/Hijri · what happens.
// Falls back to a simple day/title/desc list for older itinerary data.

export interface ItItem {
  day?: string;
  date?: string;   // Gregorian, e.g. "7 May"
  hijri?: string;  // e.g. "1 Zil Hajj"
  stay?: string;   // accommodation / activity for the day
  stage?: string;  // grouping label, e.g. "In Madinah", "Days of Hajj"
  title?: string;  // legacy
  desc?: string;   // legacy
}

function dayNum(d?: string): string {
  return (d || "").replace(/[^0-9]/g, "");
}

function groupByStage(items: ItItem[]): { stage: string; items: ItItem[] }[] {
  const groups: { stage: string; items: ItItem[] }[] = [];
  for (const it of items) {
    const stage = it.stage || "";
    const last = groups[groups.length - 1];
    if (last && last.stage === stage) last.items.push(it);
    else groups.push({ stage, items: [it] });
  }
  return groups;
}

export default function Itinerary({
  items,
  variant = "web",
}: {
  items: ItItem[];
  variant?: "web" | "brochure";
}) {
  if (!items?.length) return null;
  const brochure = variant === "brochure";
  const structured = items.some((i) => i.stage || i.date || i.stay);

  // ── Legacy fallback: simple day / title / desc list ──
  if (!structured) {
    return (
      <div className={brochure ? "space-y-2.5" : "space-y-4"}>
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className={`shrink-0 w-16 font-body font-bold text-accent ${brochure ? "text-[10px]" : "text-[11px]"}`}>{item.day}</div>
            <div className="flex-1 border-l-2 border-slate-100 pl-3.5">
              <h4 className={`font-heading font-bold text-midnight ${brochure ? "text-[12.5px]" : "text-[15px]"}`}>{item.title}</h4>
              {item.desc && <p className={`text-slate-500 ${brochure ? "text-[11.5px]" : "text-sm"} leading-relaxed`}>{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const groups = groupByStage(items);

  return (
    <div className={brochure ? "space-y-2" : "space-y-4"}>
      {groups.map((g, gi) => {
        const isHajjDays = /days of hajj/i.test(g.stage);
        const first = dayNum(g.items[0].day);
        const last = dayNum(g.items[g.items.length - 1].day);
        const range = !first ? "" : first === last ? `Day ${first}` : `Days ${first}–${last}`;
        return (
          <div
            key={gi}
            className={`rounded-xl border overflow-hidden brochure-break ${
              isHajjDays ? "border-accent/30" : "border-slate-200"
            }`}
          >
            {/* Stage header */}
            <div
              className={`flex items-center justify-between gap-3 ${brochure ? "px-3 py-1.5" : "px-5 py-3"} ${
                isHajjDays ? "bg-accent text-white" : "bg-surface-alt"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`inline-block rounded-full ${isHajjDays ? "bg-white" : "bg-accent"} ${brochure ? "w-1.5 h-1.5" : "w-2 h-2"}`} />
                <span className={`font-display ${isHajjDays ? "text-white" : "text-midnight"} ${brochure ? "text-[12.5px]" : "text-[16px]"}`}>
                  {g.stage}
                </span>
              </div>
              {range && (
                <span className={`font-body font-semibold ${isHajjDays ? "text-white/85" : "text-slate-400"} ${brochure ? "text-[9.5px]" : "text-[12px]"}`}>
                  {range}
                </span>
              )}
            </div>

            {/* Day rows */}
            <div className="divide-y divide-slate-100 bg-white">
              {g.items.map((it, i) => (
                <div key={i} className={`flex items-start gap-2.5 ${brochure ? "px-3 py-1" : "px-5 py-3"}`}>
                  <div className={`shrink-0 font-heading font-bold text-midnight ${brochure ? "text-[10px] w-[38px]" : "text-[13px] w-[52px]"}`}>
                    Day {dayNum(it.day)}
                  </div>
                  <div className={`shrink-0 ${brochure ? "w-[78px]" : "w-[112px]"}`}>
                    {it.date && <div className={`font-body text-slate-500 ${brochure ? "text-[9px]" : "text-[12px]"}`}>{it.date}</div>}
                    {it.hijri && <div className={`font-body text-accent-dark ${brochure ? "text-[8.5px]" : "text-[11px]"}`}>{it.hijri}</div>}
                  </div>
                  <div className={`flex-1 font-body text-slate-600 leading-snug ${brochure ? "text-[9.5px]" : "text-[13px]"}`}>
                    {it.stay}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
