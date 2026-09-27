"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getNavCourses } from "@/lib/data";
import { COURSE_CATEGORIES, CATEGORY_ICONS, categoryHref } from "@/lib/categories";

const MAX_COURSES_PER_CATEGORY = 6;

function isAdminUser(user) {
  const email = user?.email?.toLowerCase() ?? "";
  const role = user?.user_metadata?.role ?? user?.app_metadata?.role;
  return role === "admin" || email === "admin123@gmail.com";
}

function Chevron({ open }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

export default function Navbar() {
  const { user, signOut, loading } = useAuth();
  const pathname = usePathname();
  const adminAccess = isAdminUser(user);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // desktop mega menu
  const [courses, setCourses] = useState([]);

  // Load published courses once so the menu can list them under their
  // category. If this fails the menu still works (categories only).
  useEffect(() => {
    let cancelled = false;
    getNavCourses().then((rows) => {
      if (!cancelled) setCourses(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Close every menu whenever the page changes.
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
    setMobileCoursesOpen(false);
  }, [pathname]);

  // Category -> its courses. Categories with no courses are hidden, unless
  // nothing has loaded yet, in which case all categories are shown so the
  // menu is never empty.
  const groups = useMemo(() => {
    const known = new Set(COURSE_CATEGORIES);
    const extra = Array.from(
      new Set(
        courses
          .map((c) => c.category?.trim())
          .filter((c) => c && !known.has(c))
      )
    ).sort((a, b) => a.localeCompare(b));

    const all = [...COURSE_CATEGORIES, ...extra].map((name) => ({
      name,
      icon: CATEGORY_ICONS[name] ?? "📘",
      courses: courses.filter((c) => c.category?.trim() === name),
    }));

    const withCourses = all.filter((g) => g.courses.length > 0);
    return withCourses.length > 0 ? withCourses : all.slice(0, COURSE_CATEGORIES.length);
  }, [courses]);

  const linkClass = (active) =>
    `font-body text-base font-medium transition hover:text-ink ${
      active ? "text-ink" : "text-ink/80"
    }`;

  const closeAll = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur"
      onMouseLeave={() => setMenuOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setMenuOpen(false);
      }}
      onBlur={(e) => {
        // Keyboard users: close the menu when focus leaves the header.
        if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false);
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="relative flex items-center"
          onMouseEnter={() => setMenuOpen(false)}
        >
          <img
            src="/Logo.jpeg"
            alt="Ideal Inspirer"
            className="h-auto w-[9rem] object-contain"
          />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap  px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-gray shadow-card">
            ISO 9001:2015 Certified
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          <Link
            href="/"
            onMouseEnter={() => setMenuOpen(false)}
            className={linkClass(pathname === "/")}
          >
            Home
          </Link>

          <div className="flex items-center gap-1" onMouseEnter={() => setMenuOpen(true)}>
            <Link
              href="/courses"
              onFocus={() => setMenuOpen(true)}
              className={linkClass(pathname?.startsWith("/courses"))}
            >
              Courses
            </Link>
            <button
              type="button"
              aria-label="Show course categories"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-1 text-ink/70 transition hover:text-ink"
            >
              <Chevron open={menuOpen} />
            </button>
          </div>

          <Link
            href="/#about"
            onMouseEnter={() => setMenuOpen(false)}
            className={linkClass(false)}
          >
            About Us
          </Link>

          <Link
            href="/enquire"
            onMouseEnter={() => setMenuOpen(false)}
            className={linkClass(pathname === "/enquire")}
          >
            Enquire
          </Link>
        </nav>

        <div
          className="hidden items-center gap-3 md:flex"
          onMouseEnter={() => setMenuOpen(false)}
        >
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="font-body text-base font-medium text-ink/80 hover:text-ink"
              >
                Log in
              </Link>
              <Link href="/signup" className="btn-primary px-5 py-2.5 text-base">
                Get started
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              {adminAccess && (
                <Link
                  href="/admin"
                  className="font-body text-base font-medium text-ink/80 hover:text-ink"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="font-body text-base font-medium text-ink/80 hover:text-ink"
              >
                Dashboard
              </Link>
              <button onClick={signOut} className="btn-secondary px-5 py-2.5 text-base">
                Log out
              </button>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
          </div>
        </button>
      </div>

      {/* Desktop mega menu: courses grouped by category */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-white shadow-xl md:block">
          <div className="mx-auto max-h-[75vh] max-w-6xl overflow-y-auto px-6 py-8">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((group) => {
                const shown = group.courses.slice(0, MAX_COURSES_PER_CATEGORY);
                const hidden = group.courses.length - shown.length;
                return (
                  <div key={group.name}>
                    <Link
                      href={categoryHref(group.name)}
                      onClick={closeAll}
                      className="flex items-center gap-2 font-display text-sm font-semibold text-ink hover:text-teal-700"
                    >
                      <span aria-hidden="true" className="text-lg">
                        {group.icon}
                      </span>
                      {group.name}
                    </Link>
                    {shown.length > 0 && (
                      <ul className="mt-3 space-y-1.5 border-l border-ink/10 pl-4">
                        {shown.map((course) => (
                          <li key={course.id}>
                            <Link
                              href={`/courses/${course.id}`}
                              onClick={closeAll}
                              className="block truncate font-body text-sm text-ink/65 transition hover:text-teal-700"
                            >
                              {course.title}
                            </Link>
                          </li>
                        ))}
                        {hidden > 0 && (
                          <li>
                            <Link
                              href={categoryHref(group.name)}
                              onClick={closeAll}
                              className="font-body text-sm font-semibold text-teal-700 hover:underline"
                            >
                              +{hidden} more
                            </Link>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5 font-body text-sm">
              <Link
                href="/courses"
                onClick={closeAll}
                className="font-semibold text-teal-700 hover:underline"
              >
                Browse all courses →
              </Link>
              <Link
                href="/enquire"
                onClick={closeAll}
                className="font-semibold text-ink/70 hover:text-ink"
              >
                Not sure which one? Enquire →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-ink/10 bg-paper px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 font-body text-base font-medium text-ink/80">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <div>
              <button
                type="button"
                aria-expanded={mobileCoursesOpen}
                onClick={() => setMobileCoursesOpen((v) => !v)}
                className="flex w-full items-center justify-between text-left"
              >
                Courses
                <Chevron open={mobileCoursesOpen} />
              </button>

              {mobileCoursesOpen && (
                <ul className="mt-3 space-y-2 border-l border-ink/10 pl-4 text-sm">
                  <li>
                    <Link
                      href="/courses"
                      onClick={() => setMobileOpen(false)}
                      className="font-semibold text-teal-700"
                    >
                      All courses
                    </Link>
                  </li>
                  {groups.map((group) => (
                    <li key={group.name}>
                      <Link
                        href={categoryHref(group.name)}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2"
                      >
                        <span aria-hidden="true">{group.icon}</span>
                        {group.name}
                        {group.courses.length > 0 && (
                          <span className="font-mono text-xs text-ink/40">
                            ({group.courses.length})
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/#about" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>

            <Link href="/enquire" onClick={() => setMobileOpen(false)}>
              Enquire
            </Link>

            {!loading && !user && (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  Get started
                </Link>
              </>
            )}
            {!loading && user && (
              <>
                {adminAccess && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)}>
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
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