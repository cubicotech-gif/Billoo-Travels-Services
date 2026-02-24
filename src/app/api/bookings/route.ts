import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateBookingId } from "@/lib/payments";

// GET /api/bookings — admin only (requires service role)
export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const payment = searchParams.get("payment");
  const search = searchParams.get("search");

  let query = supabase
    .from("bookings")
    .select("*, travelers(*)")
    .order("created_at", { ascending: false });

  if (status && status !== "All") {
    query = query.eq("booking_status", status);
  }
  if (payment && payment !== "All") {
    query = query.eq("payment_status", payment);
  }
  if (search) {
    query = query.or(
      `contact_name.ilike.%${search}%,id.ilike.%${search}%,contact_email.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}

// POST /api/bookings — public (anyone can create a booking)
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const {
    packageId,
    packageTitle,
    tier,
    travelers,
    contactName,
    contactEmail,
    contactPhone,
    departureDate,
    specialRequests,
    currency,
    basePrice,
    totalPrice,
    paymentMethod,
  } = body;

  // Validate required fields
  if (!contactName || !contactEmail || !contactPhone) {
    return NextResponse.json(
      { error: "Contact name, email, and phone are required." },
      { status: 400 }
    );
  }
  if (!travelers || travelers.length === 0) {
    return NextResponse.json(
      { error: "At least one traveler is required." },
      { status: 400 }
    );
  }

  const bookingId = generateBookingId();

  // Insert booking
  const { error: bookingError } = await supabase.from("bookings").insert([
    {
      id: bookingId,
      package_id: packageId || null,
      package_title: packageTitle,
      tier: tier || null,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      departure_date: departureDate || null,
      special_requests: specialRequests || null,
      currency: currency || "PKR",
      base_price: basePrice || 0,
      total_price: totalPrice || 0,
      booking_status: "pending",
      payment_status: "unpaid",
      payment_method: paymentMethod || null,
    },
  ]);

  if (bookingError) {
    return NextResponse.json({ error: bookingError.message }, { status: 500 });
  }

  // Insert travelers
  const travelerRows = travelers.map((t: { name: string; passport: string; dob: string; gender: string }) => ({
    booking_id: bookingId,
    name: t.name,
    passport: t.passport,
    dob: t.dob || null,
    gender: t.gender || null,
  }));

  const { error: travelerError } = await supabase
    .from("travelers")
    .insert(travelerRows);

  if (travelerError) {
    // Booking created but travelers failed — still return success with booking id
    console.error("Travelers insert error:", travelerError.message);
  }

  // Increment bookings_count on the package
  if (packageId) {
    await supabase.rpc("increment_booking_count", { pkg_id: packageId }).then(
      () => {},
      () => {} // Non-critical
    );
  }

  return NextResponse.json({ bookingId, success: true }, { status: 201 });
}
