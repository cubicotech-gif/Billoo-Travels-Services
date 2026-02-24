"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0B1628] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#4DA3E8] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            B
          </div>
          <h1 className="text-white font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Billoo Admin</h1>
          <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-4">
          <div>
            <label className="block text-[11px] tracking-[1.5px] text-white/40 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@billootravels.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4DA3E8] transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-[1.5px] text-white/40 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4DA3E8] transition-all"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4DA3E8] text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-[#2B7CC4] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          BILLOO TRAVELS · AGENT ID 1251
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1628]" />}>
      <LoginForm />
    </Suspense>
  );
}
