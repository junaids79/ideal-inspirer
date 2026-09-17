"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/data";

export default function EnquireForm({ courses = [] }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Was fetch("/api/enquiry") — that route never existed, so every
    // submission 404'd silently. submitEnquiry() writes straight to the
    // Supabase "enquiries" table that already exists for this purpose.
    const result = await submitEnquiry({
      name,
      phone,
      email,
      service: courseInterest || null,
      message,
    });

    setLoading(false);

    if (!result.ok) {
      setError(
        "Something went wrong sending your enquiry. Please try again, or call us directly."
      );
      return;
    }

    setSubmitted(true);

    // Fire-and-forget email notification. Never blocks or fails the
    // enquiry itself — the enquiry is already safely saved above.
    fetch("/api/notify-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        course: courseInterest || null,
        message,
      }),
    }).catch((err) => console.error("notify-enquiry request failed:", err));
  };

  if (submitted) {
    return (
      <div className="card mt-8 flex flex-col items-center gap-2 px-6 py-12 text-center">
        <p className="font-display text-lg font-semibold text-ink">
          Thanks — we've got your enquiry!
        </p>
        <p className="max-w-sm font-body text-sm text-ink/55">
          A trainer will reach out to you shortly. In the meantime, feel free
          to browse our programs.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
          Full name
        </label>
        <input
          type="text"
          required
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
          Phone number
        </label>
        <input
          type="tel"
          required
          className="field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your phone number"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
          Email
        </label>
        <input
          type="email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      {courses.length > 0 && (
        <div>
          <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
            Which course are you interested in?
          </label>
          <select
            className="field"
            value={courseInterest}
            onChange={(e) => setCourseInterest(e.target.value)}
          >
            <option value="">Not sure yet</option>
            {courses.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="mb-1.5 block font-body text-sm font-medium text-ink/70">
          Message (optional)
        </label>
        <textarea
          className="field"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit about your goals..."
        />
      </div>

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}