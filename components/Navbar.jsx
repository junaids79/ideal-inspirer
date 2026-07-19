"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
];

function isAdminUser(user) {
  const email = user?.email?.toLowerCase() ?? "";
  const role = user?.user_metadata?.role ?? user?.app_metadata?.role;
  return role === "admin" || email === "admin123@gmail.com";
}

export default function Navbar() {
  const { user, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const adminAccess = isAdminUser(user);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          Ideal<span className="text-marigold">Inspirer</span>
        </Link>

        <nav className="hidden items-center gap-8 font-body text-sm font-medium text-ink/80 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="font-body text-sm font-medium text-ink/80 hover:text-ink"
              >
                Log in
              </Link>
              <Link href="/signup" className="btn-primary px-5 py-2 text-sm">
                Get started
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              {adminAccess && (
                <Link
                  href="/admin"
                  className="font-body text-sm font-medium text-ink/80 hover:text-ink"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="font-body text-sm font-medium text-ink/80 hover:text-ink"
              >
                Dashboard
              </Link>
              <button onClick={signOut} className="btn-secondary px-5 py-2 text-sm">
                Log out
              </button>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 font-body text-sm font-medium text-ink/80">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            {!loading && !user && (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)}>
                  Get started
                </Link>
              </>
            )}
            {!loading && user && (
              <>
                {adminAccess && (
                  <Link href="/admin" onClick={() => setOpen(false)}>
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={signOut} className="text-left">
                  Log out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
