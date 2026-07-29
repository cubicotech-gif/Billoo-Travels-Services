"use client";

import { useEffect, useState } from "react";
import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CalendarIcon, ClockIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { DbBlogPost, blogImage, formatBlogDate } from "@/lib/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?published=1")
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d.posts) ? d.posts : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const rest = posts;

  return (
    <InnerLayout>
      <PageBanner
        label="Journal"
        title="Travel"
        highlight="Insights"
        description="Guides, tips, and stories to help you prepare for a meaningful journey."
        bgImage="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-20 px-6 md:px-9 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          {loading ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="font-heading text-xl font-bold text-midnight mb-2">No Articles Yet</h2>
              <p className="text-slate-500 text-sm">Check back soon — new travel insights are on the way.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featured && (
                <ScrollReveal>
                  <Link href={`/blog/${featured.slug}`} className="no-underline block mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-accent hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] transition-all duration-400 group">
                      <div className="h-[250px] md:h-[340px] overflow-hidden">
                        <img src={blogImage(featured)} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        {featured.category && (
                          <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white self-start mb-4">{featured.category}</span>
                        )}
                        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                          <span className="flex items-center gap-1"><CalendarIcon />{formatBlogDate(featured.created_at)}</span>
                          {featured.read_time && <span className="flex items-center gap-1"><ClockIcon />{featured.read_time}</span>}
                        </div>
                        <h2 className="font-heading text-2xl font-bold text-midnight mb-3 leading-snug">{featured.title}</h2>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{featured.description}</p>
                        <span className="text-accent font-heading text-[13px] font-semibold">Read Article →</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )}

              {/* All Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((b, i) => (
                  <ScrollReveal key={b.id} delay={i * 0.08}>
                    <Link href={`/blog/${b.slug}`} className="no-underline block h-full">
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-[450ms] hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] hover:border-accent group cursor-pointer h-full">
                        <div className="relative h-[200px] overflow-hidden">
                          <img src={blogImage(b)} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          {b.category && (
                            <div className="absolute top-3.5 left-3.5">
                              <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">{b.category}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-5 pb-6">
                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                            <span className="flex items-center gap-1"><CalendarIcon />{formatBlogDate(b.created_at)}</span>
                            {b.read_time && <span className="flex items-center gap-1"><ClockIcon />{b.read_time}</span>}
                          </div>
                          <h3 className="font-heading text-[17px] font-bold text-midnight mb-2 leading-snug">{b.title}</h3>
                          <p className="text-[13px] text-slate-500 leading-relaxed">{b.description}</p>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </InnerLayout>
  );
}
