"use client";

import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PolicySection {
  title: string;
  content: string;
}

interface Props {
  label: string;
  title: string;
  highlight: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export default function PolicyPage({ label, title, highlight, lastUpdated, sections }: Props) {
  return (
    <InnerLayout>
      <PageBanner label={label} title={title} highlight={highlight} />

      <section className="py-20 px-6 md:px-9 bg-surface">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <div className="bg-accent-pale/50 rounded-xl px-5 py-3 mb-10 border border-accent/10 inline-flex items-center gap-2">
              <span className="font-mono text-[10px] text-accent tracking-[1px] font-semibold">LAST UPDATED:</span>
              <span className="text-sm text-slate-600">{lastUpdated}</span>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div>
                  <h2 className="font-heading text-xl font-bold text-midnight mb-3 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-accent tracking-[1px]">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <p className="text-base text-slate-500 leading-relaxed pl-8">{s.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-14 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-400 leading-relaxed">
                If you have questions about this policy, please contact us at{" "}
                <a href="mailto:vip@billootravels.com" className="text-accent no-underline hover:underline">
                  vip@billootravels.com
                </a>{" "}
                or call <span className="font-semibold text-slate-500">021-32313461-63</span>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </InnerLayout>
  );
}
