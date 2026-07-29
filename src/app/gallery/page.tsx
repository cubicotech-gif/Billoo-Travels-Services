"use client";

import { useEffect, useState, useCallback } from "react";
import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CloseIcon } from "@/components/ui/Icons";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  created_at: string;
  bucket: string;
}

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

export default function GalleryPage() {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/media?bucket=media")
      .then((r) => r.json())
      .then((d) => {
        const files: MediaFile[] = Array.isArray(d.files) ? d.files : [];
        setImages(files.filter((f) => IMAGE_RE.test(f.name)));
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const close = useCallback(() => setLightbox(null), []);
  const show = useCallback(
    (delta: number) =>
      setLightbox((i) => {
        if (i === null) return i;
        const next = i + delta;
        if (next < 0 || next >= images.length) return i;
        return next;
      }),
    [images.length]
  );

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(1);
      else if (e.key === "ArrowLeft") show(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, show]);

  return (
    <InnerLayout>
      <PageBanner
        label="Gallery"
        title="Moments of"
        highlight="Devotion"
        description="A visual journey through the sacred sites of Makkah and Madinah — and the pilgrims we've had the honour to serve."
        bgImage="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-16 md:py-20 px-6 md:px-9 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          {loading ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="font-heading text-xl font-bold text-midnight mb-2">Gallery Coming Soon</h2>
              <p className="text-slate-500 text-sm">We&apos;re curating photos from our recent journeys — please check back shortly.</p>
            </div>
          ) : (
            <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 gap-4">
              {images.map((img, i) => (
                <ScrollReveal key={img.name} delay={(i % 6) * 0.05}>
                  <button
                    onClick={() => setLightbox(i)}
                    className="mb-4 block w-full break-inside-avoid rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer group p-0"
                  >
                    <img
                      src={img.url}
                      alt=""
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </button>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-[100] bg-midnight/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all"
          >
            <CloseIcon className="text-white w-[18px] h-[18px]" />
          </button>

          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); show(-1); }}
              aria-label="Previous"
              className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all"
            >
              ‹
            </button>
          )}

          <img
            src={images[lightbox].url}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />

          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); show(1); }}
              aria-label="Next"
              className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all"
            >
              ›
            </button>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[1px] text-white/60">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </InnerLayout>
  );
}
