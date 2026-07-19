import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/data";

const steps = [
  { label: "Discover", detail: "Find the right program for where you are today." },
  { label: "Train", detail: "Work through modules with mentors who've done the job." },
  { label: "Get placed", detail: "Move into interviews, roles, and real opportunity." },
];

const values = [
  {
    title: "Learning that's built for use, not just for exams",
    detail:
      "Every program pairs a concept with a task you'd actually face at work or in an interview.",
  },
  {
    title: "Mentors who've sat on the other side of the table",
    detail:
      "Trainers bring hiring and industry experience, not just slides.",
  },
  {
    title: "Paced around the learner, not a fixed calendar",
    detail:
      "Modules unlock as you're ready, so progress reflects effort, not attendance.",
  },
  {
    title: "One ecosystem across schools, colleges, and companies",
    detail:
      "Students, educators, and institutions train inside the same programs and grow together.",
  },
];

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
              Award-winning EdTech training
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">
              Transforming talent into opportunity.
            </h1>
            <p className="mt-5 max-w-md font-body text-base text-ink/65">
              Practical training in communication, technology, and leadership —
              built for students, educators, and professionals who want the
              modern-world skills that get them hired.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className="btn-primary">
                Browse courses
              </Link>
              <Link href="/enquire" className="btn-secondary">
                Book a free consultation
              </Link>
            </div>
          </div>

          {/* Signature element: the learner's path, echoed later as the
              module progress ladder inside each course. */}
          <div className="reveal card p-8">
            <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Your path with us
            </p>
            <ol className="mt-6 space-y-6">
              {steps.map((step, i) => (
                <li key={step.label} className="rung text-teal-700">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-ink/30">
                      0{i + 1}
                    </span>
                    <span className="font-display text-base font-semibold text-ink">
                      {step.label}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-sm text-ink/55">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Live course count strip */}
      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 font-body text-sm text-ink/60">
          <p>
            <span className="font-display text-xl font-semibold text-ink">
              {courses.length}
            </span>{" "}
            {courses.length === 1 ? "program" : "programs"} currently open for
            enrollment
          </p>
          <Link href="/courses" className="font-semibold text-teal-700 hover:text-teal-700/80">
            See all programs →
          </Link>
        </div>
      </section>

      {/* Course grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Programs open right now
        </h2>
        <p className="mt-2 max-w-lg font-body text-sm text-ink/55">
          Pick a track below — each one opens into its full module list once
          you're signed in.
        </p>

        {courses.length === 0 ? (
          <div className="card mt-8 flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              No programs published yet
            </p>
            <p className="max-w-sm font-body text-sm text-ink/55">
              Once rows are added to the <code>courses</code> table in
              Supabase, they'll show up here automatically.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Values */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-2xl font-semibold text-white">
            Why learners train with Ideal Inspirer
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="border-l-2 border-marigold pl-5">
                <h3 className="font-display text-base font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 font-body text-sm text-white/60">
                  {value.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
          Not sure which program fits you?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-ink/60">
          Tell us where you're starting from and where you want to go — we'll
          point you at the right course.
        </p>
        <Link href="/enquire" className="btn-primary mt-6 inline-flex">
          Talk to a trainer
        </Link>
      </section>
    </div>
  );
}
