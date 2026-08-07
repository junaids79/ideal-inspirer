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

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          About us
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold text-ink md:text-3xl">
          A trusted name in modern education and professional training.
        </h2>

        <div className="mt-6 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div className="space-y-4 font-body text-sm leading-6 text-ink/65 md:text-base">
            <p>
              Ideal Inspirer is a forward-thinking EdTech organization dedicated
              to transforming education through innovation, practical learning,
              and skill development. Recognized with the{" "}
              <span className="font-semibold text-ink">
                Best EdTech Startup Award 2025
              </span>{" "}
              at the prestigious Indian School Awards held at Ashoka Hotel,
              Hyderabad, Ideal Inspirer has established itself as a trusted name
              in modern education and professional training.
            </p>
            <p>
              Founded by Dr. MD Siraj, Ideal Inspirer focuses on empowering
              students and educators through advanced training in software
              technology, English communication, and life skills development.
              The organization bridges the global skills gap by preparing
              learners with the practical knowledge and confidence needed to
              succeed in today's competitive and technology-driven world.
            </p>
            <p>
              At Ideal Inspirer, education goes beyond textbooks. Our programs
              are designed for schools and colleges — helping students
              develop the creativity, communication skills, and professional
              competence required for global opportunities.
            </p>
        
          </div>

          <img
            src="/founder_img.png"
            alt="Ideal Inspirer training session"
            className="w-full rounded-2xl object-cover shadow-card md:sticky md:top-24 md:h-[420px]"
          />
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="card grid gap-8 p-8 md:grid-cols-[minmax(0,220px)_1fr] md:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
                Founder & CEO
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Dr. MD Siraj
              </h3>
              <p className="mt-1 font-body text-sm text-ink/55">
                Internationally Certified Master Trainer (ACTD)
              </p>
            </div>
            <div className="space-y-4 font-body text-sm leading-6 text-ink/65 md:text-base">
              <p>
                Dr. MD Siraj is the visionary founder of Ideal Inspirer and an
                internationally certified master trainer committed to
                transforming education through innovation and skill-based
                learning. With extensive experience in professional training
                and educational development, he has empowered thousands of
                students, educators, and professionals to unlock their true
                potential.
              </p>
              <p>
                His mission is to bridge the gap between academic learning and
                real-world skills by introducing modern training programs in
                technology, communication, and personal development. Through
                his leadership, Ideal Inspirer continues to create impactful
                learning opportunities that prepare individuals for global
                success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          What drives us
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Mission &amp; Vision
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="card group relative overflow-hidden p-8 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute inset-x-0 top-0 h-1 bg-marigold" />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-marigold-50 text-2xl">
              🎯
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
              Our mission
            </p>
            <p className="mt-3 font-body text-sm leading-6 text-ink/65 md:text-base">
              Our mission is to empower students and educators by providing
              high-quality training in technology, communication, and life
              skills. Through innovative teaching methods and practical
              learning approaches, we aim to build confident individuals who
              are prepared to succeed on a global stage.
            </p>
          </div>

          <div className="card group relative overflow-hidden p-8 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute inset-x-0 top-0 h-1 bg-teal" />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-2xl">
              🔭
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
              Our vision
            </p>
            <p className="mt-3 font-body text-sm leading-6 text-ink/65 md:text-base">
              Our vision is to become a globally recognized education and
              training platform that nurtures future leaders. By delivering
              impactful learning experiences and fostering innovation, Ideal
              Inspirer strives to shape the future of education and skill
              development across India and beyond.
            </p>
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