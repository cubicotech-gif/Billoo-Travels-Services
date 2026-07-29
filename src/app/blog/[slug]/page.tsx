"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InnerLayout from "@/components/InnerLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CalendarIcon, ClockIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { DbBlogPost, blogImage, blockText, formatBlogDate } from "@/lib/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?published=1")
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d.posts) ? d.posts : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <InnerLayout>
        <div className="min-h-[60vh] flex items-center justify-center pt-24">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </InnerLayout>
    );
  }

  const post = posts.find((b) => b.slug === slug);

  if (!post) {
    return (
      <InnerLayout>
        <div className="min-h-[60vh] flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-midnight mb-4">Article Not Found</h1>
            <Link href="/blog" className="text-accent font-heading text-sm font-semibold no-underline hover:underline">← Back to Blog</Link>
          </div>
        </div>
      </InnerLayout>
    );
  }

  const author = post.author || "Billoo Travels Editorial Team";
  const authorInitials = author.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const date = formatBlogDate(post.created_at);
  const otherPosts = posts.filter((b) => b.slug !== post.slug).slice(0, 2);

  return (
    <InnerLayout>
      {/* Hero */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img src={blogImage(post)} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,22,40,0.85) 0%, rgba(11,22,40,0.3) 50%, rgba(11,22,40,0.5) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="max-w-[800px] mx-auto">
            {post.category && (
              <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">{post.category}</span>
            )}
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white mt-4 mb-3 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1"><CalendarIcon color="rgba(255,255,255,0.4)" />{date}</span>
              {post.read_time && <span className="flex items-center gap-1"><ClockIcon color="rgba(255,255,255,0.4)" />{post.read_time} read</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-9 bg-surface">
        <div className="max-w-[800px] mx-auto">
          {/* Author */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-slate-200">
              <div className="w-10 h-10 rounded-full bg-accent-pale flex items-center justify-center font-heading text-sm font-bold text-accent">
                {authorInitials}
              </div>
              <div>
                <div className="font-heading text-sm font-semibold text-midnight">{author}</div>
                <div className="text-xs text-slate-400">{date}</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Article Body */}
          {(post.content || []).map((block, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              {block.type === "heading" ? (
                <h2 className="font-heading text-xl font-bold text-midnight mt-8 mb-3">{blockText(block)}</h2>
              ) : (
                <p className="text-base text-slate-500 leading-relaxed mb-5">{blockText(block)}</p>
              )}
            </ScrollReveal>
          ))}

          {/* Share / Back */}
          <ScrollReveal>
            <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
              <Link href="/blog" className="text-accent font-heading text-[13px] font-semibold no-underline flex items-center gap-1 hover:gap-2 transition-all">
                ← All Articles
              </Link>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400 tracking-[1px]">SHARE:</span>
                {["Twitter", "Facebook", "LinkedIn"].map((s) => (
                  <button key={s} className="px-3 py-1 rounded-md border border-slate-200 bg-white font-heading text-[11px] text-slate-500 cursor-pointer hover:border-accent hover:text-accent transition-all">{s}</button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 px-6 md:px-9 bg-surface-alt">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-heading text-2xl font-bold text-midnight mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((b, i) => (
                <ScrollReveal key={b.id} delay={i * 0.1}>
                  <Link href={`/blog/${b.slug}`} className="no-underline block">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-accent hover:shadow-[0_12px_32px_rgba(77,163,232,0.08)] transition-all duration-400 group flex flex-col sm:flex-row">
                      <div className="h-[160px] sm:h-auto sm:w-[200px] shrink-0 overflow-hidden">
                        <img src={blogImage(b)} alt={b.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                      </div>
                      <div className="p-5">
                        {b.category && <span className="font-mono text-[10px] font-semibold tracking-[1px] text-accent">{b.category}</span>}
                        <h3 className="font-heading text-base font-bold text-midnight mt-1 mb-2 leading-snug">{b.title}</h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </InnerLayout>
  );
}
