import { Currency } from "./data";

// ─── BANKALFALAH CONFIG ───
// Replace with real credentials when going live
export const BANKALFALAH_CONFIG = {
  merchantId: "BILLOO_TRAVELS_001",
  storeId: "STORE_001",
  channelId: "CHANNEL_001",
  returnUrl: "https://billootravels.com/booking/confirm",
  apiUrl: "https://sandbox.bankalfalah.com/HS/HS/HS", // Switch to production URL for live
  currency: "PKR",
};

// ─── BOOKING TYPES ───
export interface BookingDetails {
  id: string;
  packageId: number;
  packageTitle: string;
  tier: string;
  travelers: Traveler[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  departureDate: string;
  specialRequests: string;
  currency: Currency;
  basePrice: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
}

export interface Traveler {
  name: string;
  passport: string;
  dob: string;
  gender: string;
}

export type BookingStatus = "pending" | "confirmed" | "processing" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "deposit_paid" | "partially_paid" | "paid" | "refunded";

// ─── GENERATE BOOKING ID ───
export function generateBookingId(): string {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BT-${y}${m}-${rand}`;
}

// ─── INVOICE DATA ───
export interface InvoiceData {
  invoiceNo: string;
  bookingId: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  packageTitle: string;
  tier: string;
  travelers: number;
  nights: string;
  hotel: string;
  departureDate: string;
  currency: Currency;
  lineItems: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balance: number;
  status: "draft" | "sent" | "paid" | "overdue";
}

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export function generateInvoiceNo(): string {
  const d = new Date();
  const y = d.getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INV-${y}-${rand}`;
}

// ─── EMAIL TEMPLATES ───
export const EMAIL_TEMPLATES = {
  bookingConfirmation: {
    subject: "Booking Confirmed — {packageTitle} | Billoo Travels",
    type: "Booking Confirmation" as const,
  },
  paymentReceipt: {
    subject: "Payment Received — {amount} | Billoo Travels",
    type: "Payment Receipt" as const,
  },
  invoiceSent: {
    subject: "Invoice #{invoiceNo} — {packageTitle} | Billoo Travels",
    type: "Invoice" as const,
  },
  departureReminder: {
    subject: "Your Journey Begins Soon — {departureDate} | Billoo Travels",
    type: "Departure Reminder" as const,
  },
  welcomeEmail: {
    subject: "Welcome to Billoo Travels — Your Sacred Journey Awaits",
    type: "Welcome" as const,
  },
};

// ─── PRICE CALCULATOR ───
export function calculateBookingPrice(
  basePrice: Record<Currency, number>,
  currency: Currency,
  travelers: number
): { perPerson: number; subtotal: number; tax: number; total: number } {
  const perPerson = basePrice[currency];
  const subtotal = perPerson * travelers;
  const taxRate = 0; // Pakistan has no GST on Hajj/Umrah — adjust if needed
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;
  return { perPerson, subtotal, tax, total };
}

// ─── FORMAT HELPERS ───
export function formatBookingStatus(status: BookingStatus): { label: string; color: string } {
  const map: Record<BookingStatus, { label: string; color: string }> = {
    pending: { label: "Pending", color: "bg-amber-50 text-amber-600" },
    confirmed: { label: "Confirmed", color: "bg-emerald-50 text-emerald-600" },
    processing: { label: "Processing", color: "bg-blue-50 text-blue-600" },
    completed: { label: "Completed", color: "bg-slate-100 text-slate-600" },
    cancelled: { label: "Cancelled", color: "bg-red-50 text-red-500" },
  };
  return map[status];
}

export function formatPaymentStatus(status: PaymentStatus): { label: string; color: string } {
  const map: Record<PaymentStatus, { label: string; color: string }> = {
    unpaid: { label: "Unpaid", color: "bg-red-50 text-red-500" },
    deposit_paid: { label: "Deposit Paid", color: "bg-amber-50 text-amber-600" },
    partially_paid: { label: "Partial", color: "bg-orange-50 text-orange-600" },
    paid: { label: "Paid", color: "bg-emerald-50 text-emerald-600" },
    refunded: { label: "Refunded", color: "bg-purple-50 text-purple-600" },
  };
  return map[status];
}
