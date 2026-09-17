import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/data";
export const revalidate = 0;
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

export const dynamic = "force-dynamic"; // always fetch fresh courses, never cache this page at build time

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

      {/* Stats strip — placeholder numbers, update with real figures anytime */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
          {[
            { icon: "👥", value: "5,000+", label: "Learners trained" },
            { icon: "🎬", value: "25+", label: "Courses" },
            { icon: "⭐", value: "4.8", label: "Google rating" },
            { icon: "📱", value: "1,000+", label: "App installs" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl">
                {stat.icon}
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-white/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
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

      {/* Category tiles — jump straight into a filtered course list */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Browse by category
        </h2>
        <p className="mt-2 max-w-lg font-body text-sm text-ink/55">
          Jump straight to the track you're interested in.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {[
            { icon: "💻", label: "Computer Courses" },
            { icon: "🐍", label: "Programming" },
            { icon: "🌐", label: "Foreign Languages" },
            { icon: "📊", label: "Data & Analytics" },
            { icon: "☁️", label: "Cloud & DevOps" },
            { icon: "🎓", label: "Academic Coaching" },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={`/courses?category=${encodeURIComponent(cat.label)}`}
              className="card flex flex-col items-center gap-3 px-4 py-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-body text-xs font-semibold text-ink/80 sm:text-sm">
                {cat.label}
              </span>
            </Link>
          ))}
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
{/* Certificate showcase */}
<section className="bg-teal-50/60">
  <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">

    {/* Certificate Image + Watermark */}
    <div className="order-2 md:order-1">
      <div className="relative overflow-hidden rounded-2xl border border-ink/10 shadow-card">

        {/* Certificate */}
        <img
          src="/certificates/certificate-template.jpg"
          alt="Sample Ideal Inspirer certificate of completion"
          className="block w-full"
        />

        {/* Watermark - ONLY inside image */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="rotate-[-20deg] text-center opacity-[0.10]">
            <div className="font-display text-4xl font-bold uppercase tracking-[0.25em] text-teal-700 md:text-6xl">
              IDEAL
            </div>

            <div className="mt-1 font-display text-3xl font-bold uppercase tracking-[0.2em] text-teal-700 md:text-5xl">
              INSPIRER
            </div>

            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-teal-700 md:text-xs">
              TRAINING & CONSULTING
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Right-side content */}
    <div className="order-1 md:order-2">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
        Get proof for your newly learnt skills
      </p>

      <h2 className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">
        Get job-ready with an Ideal Inspirer certificate
      </h2>

      <p className="mt-4 max-w-md font-body text-sm text-ink/60 md:text-base">
        Every program ends with a certificate of completion you can add
        to your resume, LinkedIn, or portfolio — backed by our
        ISO 9001:2015 certified training standards.
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink/60">
        🛡️ ISO 9001:2015 Certified Training Provider
      </div>

      <div className="mt-8">
        <Link href="/courses" className="btn-primary">
          Join for free →
        </Link>
      </div>
    </div>

  </div>
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

      {/* Testimonials — PLACEHOLDER content, replace with real student reviews */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            What learners say
          </p>
          <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
            Student stories
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Priya S.",
                course: "Advanced Excel & Data Analyst",
                quote:
                  "The trainers explained everything with real work examples, not just theory. I felt job-ready by the end of the course.",
                rating: 5,
              },
              {
                name: "Rahul K.",
                course: "Java Programming",
                quote:
                  "Best coding classes I've attended. The mentor's corporate background really showed in how he taught debugging.",
                rating: 5,
              },
              {
                name: "Ayesha M.",
                course: "IELTS & PTE",
                quote:
                  "Scored well above my target band. The practice tests and feedback sessions made all the difference.",
                rating: 4,
              },
            ].map((t) => (
              <div key={t.name} className="card p-6">
                <div className="text-marigold" aria-hidden="true">
                  {"★".repeat(t.rating)}
                  <span className="text-ink/20">{"★".repeat(5 - t.rating)}</span>
                </div>
                <p className="mt-3 font-body text-sm leading-6 text-ink/70">
                  “{t.quote}”
                </p>
                <p className="mt-4 font-display text-sm font-semibold text-ink">
                  {t.name}
                </p>
                <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
                  {t.course}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wide text-ink/30">
            Sample testimonials — replace with real student reviews
          </p>
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

      {/* Faculty / Trainers — from the Ideal Inspirer flyer */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          Meet the team
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Faculty & Trainers
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center font-body text-sm text-ink/55">
          Internationally certified trainers with real corporate experience —
          not just people reading slides.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Mr. Mady",
              role: "Data Science & Data Analysis",
              bio: "15 years certified corporate experience trainer, USA returns.",
            },
            {
              name: "Ms. Iefa Maheen",
              role: "AI + ML Trainer (B.Tech)",
              bio: "Python | C & C++ | AI + ML — certified professional trainer.",
            },
            {
              name: "Mr. Srinu",
              role: "Cyber Security / Ethical Hacking",
              bio: "20+ years corporate experience in the IT industry.",
            },
            {
              name: "Ms. Yasmeen Shaik",
              role: "Digital Marketing",
              bio: "15 years experience in digital products marketing — Global SEO & Meta Ads strategy expert.",
            },
            {
              name: "Mr. Dinesh",
              role: "AWS & Azure Certified Trainer",
              bio: "15+ years experience training in corporate environments.",
            },
            {
              name: "Mr. Osman",
              role: "IELTS & PTE Trainer",
              bio: "18+ years experience helping learners crack IELTS & PTE.",
            },
            {
              name: "Mr. Sai",
              role: "Java Programming & Coding",
              bio: "12+ years corporate expertise in Java programming and coding.",
            },
          ].map((trainer) => (
            <div key={trainer.name} className="card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 font-display text-lg font-semibold text-teal-700">
                {trainer.name
                  .replace(/^(Mr\.|Ms\.|Mrs\.)\s*/, "")
                  .charAt(0)}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {trainer.name}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-teal-700">
                {trainer.role}
              </p>
              <p className="mt-3 font-body text-sm text-ink/60">
                {trainer.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* App download banner — app isn't live yet, so buttons are marked "Coming soon" rather than linking anywhere */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="card flex flex-col items-center gap-6 overflow-hidden p-10 text-center md:flex-row md:justify-between md:p-14 md:text-left">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
              Download our app and
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
              Learn offline, anytime
            </h2>
            <p className="mt-3 max-w-sm font-body text-sm text-ink/60">
              Our mobile app is on the way — soon you'll be able to learn
              anywhere, no internet required.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <span className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-2.5 opacity-60">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-ink" aria-hidden="true">
                <path d="M16.365 1.43c0 1.14-.462 2.096-1.14 2.815-.735.788-1.98 1.39-2.985 1.31-.132-1.09.42-2.24 1.11-2.95.756-.803 2.088-1.4 3.015-1.44zm3.6 15.885c-.66 1.53-1.47 3.045-2.64 4.35-1.05 1.17-2.13 2.28-3.75 2.31-1.62.03-2.115-.945-3.945-.945-1.83 0-2.385.915-3.945.975-1.56.06-2.76-1.26-3.825-2.415-2.13-2.31-3.75-6.51-1.575-9.42 1.05-1.395 2.91-2.28 4.86-2.31 1.53-.03 2.895 1.05 3.825 1.05.93 0 2.7-1.29 4.53-1.11.765.03 2.925.315 4.32 2.37-.105.075-2.58 1.5-2.55 4.5.03 3.585 3.135 4.77 3.165 4.785-.03.09-.51 1.71-1.47 3.36z" />
              </svg>
              <span className="font-body text-sm text-ink/70">
                App Store
                <br />
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                  Coming soon
                </span>
              </span>
            </span>

            <span className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-2.5 opacity-60">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-ink" aria-hidden="true">
                <path d="M3 3.6v16.8c0 .35.2.53.44.4l14.4-8.4a.46.46 0 000-.8L3.44 3.2A.44.44 0 003 3.6z" />
              </svg>
              <span className="font-body text-sm text-ink/70">
                Google Play
                <br />
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                  Coming soon
                </span>
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          Questions
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Frequently asked questions
        </h2>

        <div className="mt-8 space-y-3">
          {[
            {
              q: "Do I get a certificate after completing a course?",
              a: "Yes. Every program ends with an Ideal Inspirer certificate of completion, backed by our ISO 9001:2015 certified training standards.",
            },
            {
              q: "Are classes online, offline, or both?",
              a: "We offer both online and in-person (offline) batches depending on the course — check the course page for the current batch format, or ask us during your free consultation.",
            },
            {
              q: "Do I need prior experience to join?",
              a: "No. Most of our courses are designed to take you from beginner to job-ready, with separate tracks for learners who already have some experience.",
            },
            {
              q: "Do you provide placement assistance?",
              a: "Yes, we offer placement assistance and internship opportunities alongside training, along with resume and interview support.",
            },
            {
              q: "What are the batch timings?",
              a: "We run multiple batches through the week, including weekend and evening slots for working professionals and students. Contact us for the current schedule.",
            },
            {
              q: "Is there an EMI or installment option for fees?",
              a: "Yes, installment options are available for most long-duration and coaching programs — reach out to our team for details specific to your course.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="card group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-semibold text-ink">
                {item.q}
                <span className="shrink-0 font-mono text-teal-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 font-body text-sm leading-6 text-ink/60">
                {item.a}
              </p>
            </details>
          ))}
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