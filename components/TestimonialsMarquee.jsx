// Student stories, auto-sliding continuously — same marquee technique as
// StatsMarquee.jsx (uses the .marquee / .marquee-track rules already in
// app/globals.css), just slower since there's more text to read here.
// Replace with real student reviews whenever you have them.
const TESTIMONIALS = [
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
  {
    name: "Vikram N.",
    course: "AWS & DevOps",
    quote:
      "Hands-on labs from day one, not just slides. I moved from zero cloud experience to clearing my AWS certification.",
    rating: 5,
  },
  {
    name: "Sneha R.",
    course: "Digital Marketing",
    quote:
      "Learned SEO and Meta Ads the practical way — running real campaigns, not just watching demos. Landed a marketing role right after.",
    rating: 5,
  },
  {
    name: "Farhan A.",
    course: "Spoken English",
    quote:
      "I was hesitant to speak in English before this course. Now I can hold a full interview confidently. Patient trainers, great environment.",
    rating: 4,
  },
  {
    name: "Meghana P.",
    course: "Data Science & AI",
    quote:
      "The projects mirrored actual industry problems. My portfolio from this course is what got me shortlisted for interviews.",
    rating: 5,
  },
];

function Stars({ rating }) {
  return (
    <div className="text-marigold" aria-hidden="true">
      {"★".repeat(rating)}
      <span className="text-ink/20">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

function Group({ hidden = false }) {
  // Two copies per group so one group is always wider than the screen —
  // same trick as StatsMarquee: the track holds two groups and slides by
  // exactly one group's width for a seamless loop.
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <ul className="flex shrink-0 items-stretch gap-6 pr-6" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t.name}-${i}`} className="card w-80 shrink-0 p-6">
          <Stars rating={t.rating} />
          <p className="mt-3 font-body text-sm leading-6 text-ink/70">“{t.quote}”</p>
          <p className="mt-4 font-display text-sm font-semibold text-ink">{t.name}</p>
          <p className="font-mono text-xs uppercase tracking-wide text-ink/40">{t.course}</p>
        </li>
      ))}
    </ul>
  );
}

export default function TestimonialsMarquee() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          What learners say
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Student stories
        </h2>

        <div className="marquee relative mt-10 overflow-hidden">
          <div className="marquee-track" style={{ animation: "marquee-scroll 70s linear infinite" }}>
            <Group />
            <Group hidden />
          </div>
          {/* soft fade at both edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wide text-ink/30">
          Sample testimonials — replace with real student reviews
        </p>
      </div>
    </section>
  );
}