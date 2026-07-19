import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/data";

export const metadata = {
  title: "Courses | Ideal Inspirer",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
        All programs
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        Find your next skill
      </h1>
      <p className="mt-2 max-w-lg font-body text-sm text-ink/55">
        Every program below is broken into modules — sign in to track your
        progress as you complete each one.
      </p>

      {courses.length === 0 ? (
        <div className="card mt-10 flex flex-col items-center gap-2 px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            No programs published yet
          </p>
          <p className="max-w-sm font-body text-sm text-ink/55">
            Add rows to the <code>courses</code> table in Supabase and they'll
            appear here.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
