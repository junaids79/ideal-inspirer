"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";

// Fixed, site-wide entry point into the training advisor. Opens the chat
// as a floating panel on top of whatever page you're on, instead of
// navigating to /dashboard and scrolling down to find it.
export default function AdvisorButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[22rem] max-w-[calc(100vw-2.5rem)]">
          <div className="mb-2 flex items-center justify-between rounded-t-2xl bg-ink px-4 py-3">
            <p className="font-display text-sm font-semibold text-white">
              Training advisor
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close training advisor"
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
          <ChatWidget />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close training advisor" : "Chat with the training advisor"}
        title="Training advisor"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-marigold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <rect x="5" y="4" width="14" height="14" rx="4" />
          <path d="M5 9h-1.5v3H5" />
          <path d="M19 9h1.5v3H19" />
          <circle cx="9.3" cy="10" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="14.7" cy="10" r="1.1" fill="currentColor" stroke="none" />
          <path d="M9 13.2c0.9 1.1 4.1 1.1 5 0" />
          <path d="M19 15v3a2 2 0 0 1-2 2h-3" />
          <circle cx="12" cy="20" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </button>
    </>
  );
}