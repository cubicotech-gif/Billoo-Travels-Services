import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/blog — admin: all posts (published + drafts)
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

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
