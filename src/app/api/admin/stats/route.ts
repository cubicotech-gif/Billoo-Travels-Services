import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/admin/stats — admin only
export async function GET() {
  const supabase = createAdminClient();

  const [bookingsRes, packagesRes, recentRes] = await Promise.all([
    supabase.from("bookings").select("id, total_price, currency, booking_status, payment_status, created_at"),
    supabase.from("packages").select("id, status"),
    supabase
      .from("bookings")
      .select("id, contact_name, package_title, created_at, total_price, booking_status")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const bookings = bookingsRes.data || [];
  const packages = packagesRes.data || [];
  const recent = recentRes.data || [];

  const totalRevenuePKR = bookings
    .filter((b) => b.currency === "PKR" && b.payment_status !== "refunded")
    .reduce((sum, b) => sum + (b.total_price || 0), 0);

  const activePackages = packages.filter((p) => p.status === "active").length;
  const confirmedBookings = bookings.filter((b) => b.booking_status === "confirmed").length;

  // Revenue by month (last 6 months)
  const now = new Date();
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const monthName = d.toLocaleString("default", { month: "short" });
    const monthStart = d.toISOString().slice(0, 7); // YYYY-MM
    const value = bookings
      .filter(
        (b) =>
          b.created_at?.startsWith(monthStart) &&
          b.currency === "PKR" &&
          b.payment_status !== "refunded"
      )
      .reduce((sum, b) => sum + (b.total_price || 0), 0);
    return { month: monthName, value: Math.round(value / 1_000_000 * 10) / 10 };
  });

  return NextResponse.json({
    totalBookings: bookings.length,
    confirmedBookings,
    totalRevenuePKR,
    activePackages,
    recentBookings: recent,
    monthlyRevenue,
  });
}
