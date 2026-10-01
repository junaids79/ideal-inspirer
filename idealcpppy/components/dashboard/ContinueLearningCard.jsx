import Link from "next/link";
import CourseThumbnail from "./CourseThumbnail";
import ProgressBar from "./ProgressBar";

export default function ContinueLearningCard({ course }) {
  return (
    <div className="card reveal flex min-w-[280px] flex-col overflow-hidden sm:min-w-0">
      <div className="flex items-start gap-4 p-5">
        <CourseThumbnail
          title={course.title}
          gradient={course.thumbnailColor}
          className="h-14 w-14"
        />
        <div className="min-w-0 flex-1">
          {course.category && (
            <span className="font-mono text-[10px] uppercase tracking-wide text-teal-700">
              {course.category}
            </span>
          )}
          <h3 className="mt-0.5 font-display text-base font-semibold text-ink">
            {course.title}
          </h3>
          <p className="mt-1 truncate font-body text-xs text-ink/50">
            Last lesson: {course.lastLesson}
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-ink/5 px-5 py-4">
        <ProgressBar value={course.progress} size="sm" />
        <Link
          href={`/courses/${course.id}`}
          className="btn-primary mt-4 w-full py-2.5 text-sm"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
}
