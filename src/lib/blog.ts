// ─── BLOG (DB-BACKED) HELPERS ───
// Shared types + formatting for the public blog pages, which read published
// posts from the `blog_posts` table via /api/blog instead of static content.

export interface BlogBlock {
  type?: string;
  // Seed data uses `text`; the admin editor historically saved `body`.
  // The renderer tolerates either so every post displays correctly.
  text?: string;
  body?: string;
}

export interface DbBlogPost {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  author: string | null;
  read_time: string | null;
  img: string | null;
  placeholder: string | null;
  description: string | null;
  content: BlogBlock[];
  published: boolean;
  created_at: string | null;
}

// Cover image, preferring an uploaded image over the placeholder.
export function blogImage(p: Pick<DbBlogPost, "img" | "placeholder">): string {
  return p.img || p.placeholder || "";
}

// The text of a content block, regardless of which field name was stored.
export function blockText(b: BlogBlock): string {
  return b.text ?? b.body ?? "";
}

// Format an ISO timestamp as e.g. "Jan 15, 2025". Falls back gracefully.
export function formatBlogDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
