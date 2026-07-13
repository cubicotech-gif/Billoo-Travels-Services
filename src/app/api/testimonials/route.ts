import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/testimonials — admin: all; public: ?published=1 returns published only
export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const publishedOnly = request.nextUrl.searchParams.get("published") === "1";

  let query = supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) query = query.eq("published", true);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ testimonials: data });
}

// POST /api/testimonials — admin only: create
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const { name, role, text, img, rating, published } = body;

  if (!name || !text) {
    return NextResponse.json({ error: "Name and review text are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("testimonials")
    .insert([{
      name,
      role: role || null,
      text,
      img: img || null,
      rating: rating ?? 5,
      published: published ?? false,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ testimonial: data }, { status: 201 });
}
