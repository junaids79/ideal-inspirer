"use client";

import { useMemo, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { COURSE_CATEGORIES } from "@/components/admin/CourseForm";

export default function CourseBrowser({ courses, initialCategory = null }) {
  const [query, setQuery] = useState("");
  // null = no pill actively chosen yet (still shows every course). Distinct
  // from the user explicitly clicking "All", so "All" doesn't render as
  // pre-selected on first load. A category passed in via the URL (e.g. from
  // the homepage's category tiles) pre-selects that pill instead.
  const [category, setCategory] = useState(initialCategory);

  // Fixed domain list (not derived from courses) so every domain shows as a
  // filter pill even before any course is tagged into it. Any legacy/typo
  // category still present on old rows is appended at the end so it doesn't
  // silently disappear from the filter.
  const categories = useMemo(() => {
    const known = new Set(COURSE_CATEGORIES);
    const extras = new Set(
      courses
        .map((c) => c.category)
        .filter((c) => c && c.trim().length > 0 && !known.has(c))
    );
    return [
      "All",
      ...COURSE_CATEGORIES,
      ...Array.from(extras).sort((a, b) => a.localeCompare(b)),
    ];
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesCategory =
        category === null || category === "All" || c.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = `${c.title ?? ""} ${c.description ?? ""} ${
        c.category ?? ""
      }`.toLowerCase();
      return haystack.includes(q);
    });
  }, [courses, query, category]);

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            aria-label="Search courses"
            className="w-full rounded-full border border-ink/10 bg-white px-5 py-2.5 font-body text-sm text-ink placeholder:text-ink/40 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = category !== null && cat === category;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition ${
                  active
                    ? "bg-teal-700 text-white"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-10 flex flex-col items-center gap-2 px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            No courses match your search
          </p>
          <p className="max-w-sm font-body text-sm text-ink/55">
            Try a different keyword or choose a different category.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}