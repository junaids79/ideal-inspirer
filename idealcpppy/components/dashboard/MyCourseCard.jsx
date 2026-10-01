import Link from "next/link";
import CourseThumbnail from "./CourseThumbnail";
import ProgressBar from "./ProgressBar";

export default function MyCourseCard({ course }) {
  return (
    <div className="card reveal flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start gap-4 p-5">
        <CourseThumbnail
          title={course.title}
          gradient={course.thumbnailColor}
          className="h-12 w-12"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold text-ink">
            {course.title}
          </h3>
          {course.category && (
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink/40">
              {course.category}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto border-t border-ink/5 px-5 py-4">
        {course.completed ? (
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-teal-700">
              <span aria-hidden="true">🎓</span> Completed
            </span>
            <Link
              href={`/courses/${course.id}`}
              className="btn-secondary px-4 py-2 text-xs"
            >
              Certificate
            </Link>
          </div>
        ) : (
          <>
            <ProgressBar value={course.progress} size="sm" />
            <Link
              href={`/courses/${course.id}`}
              className="btn-primary mt-4 w-full py-2.5 text-sm"
            >
              Continue
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
