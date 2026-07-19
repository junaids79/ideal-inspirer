import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="card reveal group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between px-6 pt-6">
        {course.category && (
          <span className="rounded-full bg-teal-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-teal-700">
            {course.category}
          </span>
        )}
        {course.duration && (
          <span className="font-mono text-[11px] text-ink/40">{course.duration}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        <h3 className="font-display text-lg font-semibold text-ink">
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
