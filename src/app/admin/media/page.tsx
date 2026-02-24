"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  created_at: string;
  bucket: string;
}

const BUCKETS = ["media", "package-images", "blog-images"] as const;
type Bucket = (typeof BUCKETS)[number];

const bucketLabel: Record<Bucket, string> = {
  "media": "General",
  "package-images": "Packages",
  "blog-images": "Blog",
};

function formatBytes(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminMedia() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBucket, setActiveBucket] = useState<Bucket>("media");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setSelected([]);
    const res = await fetch(`/api/media?bucket=${activeBucket}`);
    const data = await res.json();
    setFiles(data.files || []);
    setLoading(false);
  }, [activeBucket]);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  async function handleUpload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setUploadProgress([]);
    const results: string[] = [];

    for (const file of Array.from(fileList)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", activeBucket);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        results.push(`✓ ${file.name}`);
      } else {
        const err = await res.json();
        results.push(`✗ ${file.name}: ${err.error}`);
      }
      setUploadProgress([...results]);
    }

    setUploading(false);
    setShowUpload(false);
    fetchFiles();
  }

  async function handleDelete(fileName: string) {
    if (!confirm(`Delete "${fileName}"?`)) return;
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: fileName, bucket: activeBucket }),
    });
    fetchFiles();
  }

  async function handleBulkDelete() {
    if (!confirm(`Delete ${selected.length} file(s)?`)) return;
    for (const name of selected) {
      await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: name, bucket: activeBucket }),
      });
    }
    fetchFiles();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    });
  }

  const toggleSelect = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const totalSize = files.reduce((s, f) => s + (f.size || 0), 0);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Media Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {files.length} files · {formatBytes(totalSize)} total
          </p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ↑ Upload Files
        </button>
      </div>

      {/* Upload Area */}
      {showUpload && (
        <div
          className="bg-white rounded-xl border-2 border-dashed border-[#4DA3E8]/40 p-10 mb-6 text-center hover:border-[#4DA3E8]/70 transition-all cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleUpload(e.dataTransfer.files); }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          <div className="w-14 h-14 rounded-full bg-[#EBF5FF] flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4DA3E8" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
          </div>
          {uploading ? (
            <div>
              <div className="text-sm font-semibold text-[#1E293B] mb-2">Uploading…</div>
              <div className="space-y-1">
                {uploadProgress.map((p, i) => (
                  <div key={i} className="text-xs text-slate-500">{p}</div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-base font-bold text-[#1E293B] mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                Drag &amp; drop files here
              </h3>
              <p className="text-sm text-slate-400 mb-4">or click to browse · JPG, PNG, WebP, GIF, MP4 up to 10MB</p>
              <p className="text-xs text-slate-400">Uploading to: <span className="font-semibold text-[#4DA3E8]">{activeBucket}</span></p>
            </>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
        <div className="flex gap-2 flex-wrap">
          {BUCKETS.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBucket(b)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                activeBucket === b ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"
              }`}
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {bucketLabel[b]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="text-red-400 text-xs font-semibold bg-transparent border border-red-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-red-50 transition-all"
            >
              Delete ({selected.length})
            </button>
          )}
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setView("grid")} className={`px-3 py-2 border-none cursor-pointer text-xs ${view === "grid" ? "bg-[#0B1628] text-white" : "bg-white text-slate-400"}`}>Grid</button>
            <button onClick={() => setView("list")} className={`px-3 py-2 border-none cursor-pointer text-xs ${view === "list" ? "bg-[#0B1628] text-white" : "bg-white text-slate-400"}`}>List</button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-slate-100">
              <div className="h-[160px] bg-slate-100 animate-pulse" />
              <div className="p-3 space-y-1">
                <div className="h-3 bg-slate-100 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-slate-50 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="text-slate-200 text-5xl mb-4">🖼</div>
          <div className="text-slate-400 text-sm font-medium">No files in this bucket.</div>
          <div className="text-slate-300 text-xs mt-1">Upload files using the button above.</div>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((f) => (
            <div
              key={f.name}
              onClick={() => toggleSelect(f.name)}
              className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                selected.includes(f.name)
                  ? "border-[#4DA3E8] shadow-[0_0_0_2px_rgba(77,163,232,0.2)]"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="h-[160px] relative overflow-hidden bg-slate-100">
                {f.url.match(/\.(mp4)$/i) ? (
                  <video src={f.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={f.url} alt={f.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                {selected.includes(f.name) && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4DA3E8] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/50 text-white backdrop-blur-sm">{bucketLabel[activeBucket]}</span>
                </div>
              </div>
              <div className="p-3 bg-white">
                <div className="text-xs font-semibold text-[#1E293B] truncate">{f.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{formatBytes(f.size)}</div>
                <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => copyUrl(f.url)}
                    className="text-[#4DA3E8] text-[11px] font-semibold bg-transparent border-none cursor-pointer hover:underline"
                  >
                    {copiedUrl === f.url ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    onClick={() => handleDelete(f.name)}
                    className="text-red-400 text-[11px] font-semibold bg-transparent border-none cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["", "Preview", "Name", "Size", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.name} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <input type="checkbox" checked={selected.includes(f.name)} onChange={() => toggleSelect(f.name)} className="cursor-pointer" />
                  </td>
                  <td className="px-4 py-2.5">
                    {f.url.match(/\.(mp4)$/i) ? (
                      <video src={f.url} className="w-10 h-10 rounded-lg object-cover" muted />
                    ) : (
                      <img src={f.url} alt={f.name} className="w-10 h-10 rounded-lg object-cover" />
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-sm font-semibold text-[#1E293B] max-w-[220px] truncate">{f.name}</td>
                  <td className="px-4 py-2.5 text-sm text-slate-400">{formatBytes(f.size)}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyUrl(f.url)}
                        className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline"
                      >
                        {copiedUrl === f.url ? "Copied!" : "Copy URL"}
                      </button>
                      <button
                        onClick={() => handleDelete(f.name)}
                        className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
