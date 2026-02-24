import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// POST /api/contact — public
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const { fullName, email, phone, destination, packageInterest, message } = body;

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "Full name and email are required." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("contact_messages").insert([
    {
      full_name: fullName,
      email,
      phone: phone || null,
      destination: destination || null,
      package_interest: packageInterest || null,
      message: message || null,
      status: "new",
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// GET /api/contact — admin only
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data });
}

// PATCH /api/contact — admin only: update message status
export async function PATCH(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "id and status are required." }, { status: 400 });
  }

  const { error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
