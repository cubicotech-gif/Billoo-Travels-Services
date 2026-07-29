import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/blog
//   (default)     → admin: all posts (published + drafts)
//   ?published=1  → public: only published posts (used by the public blog pages)
export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const publishedOnly = new URL(request.url).searchParams.get("published");

  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data });
}

// POST /api/blog — admin only: create new blog post
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const { title, slug, category, author, read_time, img, description, content, published } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert([{
      title,
      slug,
      category: category || "General",
      author: author || "Billoo Travels Editorial Team",
      read_time: read_time || null,
      img: img || null,
      description: description || null,
      content: content || [],
      published: published ?? false,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data }, { status: 201 });
}
