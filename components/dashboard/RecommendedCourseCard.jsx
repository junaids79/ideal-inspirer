import Link from "next/link";
import CourseThumbnail from "./CourseThumbnail";

export default function RecommendedCourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="card reveal group flex items-start gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <CourseThumbnail
        title={course.title}
        gradient={course.thumbnailColor}
        className="h-12 w-12"
      />
      <div className="min-w-0 flex-1">
        {course.category && (
          <span className="font-mono text-[10px] uppercase tracking-wide text-teal-700">
            {course.category}
          </span>
        )}
        <h3 className="mt-0.5 font-display text-sm font-semibold text-ink group-hover:text-teal-700">
          {course.title}
        </h3>
        {course.description && (
          <p className="mt-1 line-clamp-2 font-body text-xs text-ink/55">
            {course.description}
          </p>
        )}
        {course.duration && (
          <span className="mt-2 block font-mono text-[10px] text-ink/40">
            {course.duration}
          </span>
        )}
      </div>
    </Link>
  );
}
