import Link from "next/link";
import { CATEGORY_ICONS } from "@/lib/categories";

// Same deterministic-hash idea used for dashboard thumbnails (lib/data.js
// paletteFor) — kept local here so this card has no extra dependency.
const BANNER_PALETTE = [
  "from-teal-600 to-teal-800",
  "from-ink-700 to-ink-900",
  "from-marigold-600 to-marigold",
  "from-teal-400 to-teal-700",
  "from-ink-400 to-ink-700",
  "from-teal-700 to-teal-900",
  "from-marigold-400 to-marigold-600",
  "from-teal-500 to-ink-700",
];

function bannerGradientFor(id = "") {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % BANNER_PALETTE.length;
  }
  return BANNER_PALETTE[hash];
}

export default function CourseCard({ course }) {
  const icon = CATEGORY_ICONS[course.category] ?? "📘";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="card reveal group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Banner — real thumbnail if the course has one, otherwise a
          category-colored gradient with the category icon. Covers the
          top half of the card, like the reference screenshot. */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
              {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br text-5xl ${bannerGradientFor(
              course.id
            )}`}
          >
            <span aria-hidden="true" className="opacity-90 drop-shadow-sm">
              {icon}
            </span>
          </div>
        )}

        {course.duration && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-white backdrop-blur">
            {course.duration}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        {course.category && (
          <span className="w-fit rounded-full bg-teal-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-teal-700">
            {course.category}
          </span>
        )}

        <h3 className="mt-3 font-display text-lg font-semibold text-ink">
          {course.title}
        </h3>
        {course.description && (
          <p className="mt-2 line-clamp-3 font-body text-sm text-ink/60">
            {course.description}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-ink transition group-hover:gap-2">
          View modules
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}