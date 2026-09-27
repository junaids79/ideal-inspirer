import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import OfficePhotoSlider from "@/components/OfficePhotoSlider";
import StatsMarquee from "@/components/StatsMarquee";
import JoinTheFuture from "@/components/JoinTheFuture";
import Branches from "@/components/Branches";
import { getCourses } from "@/lib/data";
import { CATEGORY_ICONS, categoryHref } from "@/lib/categories";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";

export const revalidate = 0;


export const dynamic = "force-dynamic"; // always fetch fresh courses, never cache this page at build time

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-1rem md:pt-14">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
                             Ignite | Invest | Inspire

            </p>
            <h1 className="mt-4 font-mono font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">
                            Rebuild Your Skills. Rebuild Your Professional Career.

            </h1>
            <p className="mt-5 max-w-md font-body text-base text-ink/65">
             Build your skills. Strengthen your confidence. Transform your career with practical training and expert counselling in communication, technology, and professional development.
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

          {/* Office photo gallery — replaces the old "Discover, Train, Get
              placed" text panel. Add photos in lib/officePhotos.js. */}
          <OfficePhotoSlider />
        </div>
      </section>

      {/* Stats strip — moving left-to-right, like the reference site */}
      <StatsMarquee />

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
          <Link href="/courses" className="font-semibold text-[#0080de] hover:text-[#2b94e0]">
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
          {Object.entries(CATEGORY_ICONS).map(([label, icon]) => (
            <Link
              key={label}
              href={categoryHref(label)}
              className="card flex flex-col items-center gap-3 px-4 py-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl">{icon}</span>
              <span className="font-body text-xs font-semibold text-ink/80 sm:text-sm">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>


  <JoinTheFuture />
      {/* Join the Future — animated counter + learning modes */}

    


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
            <div className="font-display text-4xl font-bold uppercase tracking-[0.25em] text-[#0080de] md:text-6xl">
              IDEAL
            </div>

            <div className="mt-1 font-display text-3xl font-bold uppercase tracking-[0.2em] text-[#0080de] md:text-5xl">
              INSPIRER
            </div>

            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#0080de] md:text-xs">
              TRAINING & CONSULTING
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Right-side content */}
    <div className="order-1 md:order-2">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
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


    {/* About */}
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-24">
  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
    About us
  </p>
  <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold text-ink md:text-3xl">
    A trusted name in modern education and professional training.
  </h2>

  <div className="mt-6 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-start">
    <div className="space-y-4 font-body text-sm leading-6 text-ink/65 md:text-base">
      <p>
        Ideal Inspirer is an EdTech organization transforming education
        through innovation and skill development. Winner of the{" "}
        <span className="font-semibold text-ink bg-[#3ba6f3]">
          Best EdTech Startup Award 2025
        </span>{" "}
        at the Indian School Awards, Hyderabad.
      </p>
      <p>
        Founded by Dr. MD Siraj, we train students and educators in
        software technology, English communication, and life skills —
        bridging the gap between academics and real-world careers.
      </p>

      <div className="card mt-4 flex items-center gap-4 p-6">
       
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
            Founder & CEO
          </p>
          <h3 className="font-display text-lg font-semibold text-ink">
            Dr. MD Siraj
          </h3>
          <p className="font-body text-sm text-ink/55">
            Internationally Certified Master Trainer (ACTD)
          </p>
        </div>
      </div>
    </div>

    <img
      src="/founder_img.png"
      alt="Ideal Inspirer training session"
      className="w-full rounded-2xl object-cover shadow-card md:sticky md:top-24 md:h-[420px]"
    />
  </div>
</section>




      {/* Testimonials — PLACEHOLDER content, replace with real student reviews */}
          <TestimonialsMarquee />

  
      {/* Faculty / Trainers — from the Ideal Inspirer flyer */}
          {/* Faculty / Trainers — from the Ideal Inspirer flyer */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
          Meet the team
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Faculty & Trainers
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center font-body text-sm text-ink/55">
          Internationally certified trainers with real corporate experience —
          not just people reading slides.
        </p>

        <div className="mt-10 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:auto] [scrollbar-width:thin]">
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
            <div
              key={trainer.name}
              className="card w-[78%] shrink-0 snap-start p-6 sm:w-[46%] lg:w-[31%]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 font-display text-lg font-semibold text-[#0080de]">
                {trainer.name
                  .replace(/^(Mr\.|Ms\.|Mrs\.)\s*/, "")
                  .charAt(0)}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {trainer.name}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#0080de]">
                {trainer.role}
              </p>
              <p className="mt-3 font-body text-sm text-ink/60">
                {trainer.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Our Branches */}
      <Branches />

      {/* App download banner — app isn't live yet, so buttons are marked "Coming soon" rather than linking anywhere */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="card flex flex-col items-center gap-6 overflow-hidden p-10 text-center md:flex-row md:justify-between md:p-14 md:text-left">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
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
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
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
                <span className="shrink-0 font-mono text-[#0080de] transition group-open:rotate-45">
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