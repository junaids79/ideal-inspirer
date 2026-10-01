"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // If email confirmation is off, a session comes back immediately and we
    // can create the profile row right away. If confirmation is required,
    // there's no session yet — the profile gets created on first login instead
    // (see app/dashboard/page.js), so this insert is best-effort here.
    if (data.session && data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        email,
      });
    }

    setLoading(false);

    if (!data.session) {
      setNotice("Account created — check your email to confirm before logging in.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
        Get started
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
        Create your account
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
            Full name
          </label>
          <input
            type="text"
            required
            className="field"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
            Email
          </label>
          <input
            type="email"
            required
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </div>

        {error && <p className="font-body text-sm text-red-600">{error}</p>}
        {notice && <p className="font-body text-sm text-teal-700">{notice}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-ink/55">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-teal-700">
          Log in
        </Link>
      </p>
    </div>
  );
}
