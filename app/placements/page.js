import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import AlumniMarquee from "@/components/AlumniMarquee";

export const metadata = {
  title: "Placements | Ideal Inspirer",
  description:
    "Placement assistance, internships, resume and interview support from Ideal Inspirer.",
};

// Edit these to match your real placement offerings.
const POINTS = [
  {
    title: "Placement assistance",
    desc: "Dedicated support to connect trained students with hiring companies.",
  },
  {
    title: "Internship opportunities",
    desc: "Hands-on experience alongside training, so you start with real work on your resume.",
  },
  {
    title: "Resume & interview support",
    desc: "Resume reviews, mock interviews and communication coaching before you apply.",
  },
  {
    title: "Industry-ready skills",
    desc: "Courses built around what employers ask for — technology, communication and leadership.",
  },
];

const STATS = [
  { value: "30,000+", label: "Students trained" },
  { value: "25+", label: "Courses" },
  { value: "4.8", label: "Google rating" },
  { value: "28+", label: "Companies our alumni work at" },
];

const STEPS = [
  { n: "1", title: "Train", desc: "Learn job-ready skills from experienced trainers." },
  { n: "2", title: "Practice", desc: "Build confidence with projects, assignments and mock sessions." },
  { n: "3", title: "Interview", desc: "Resume reviews and mock interviews before you apply." },
  { n: "4", title: "Get placed", desc: "We help connect you with hiring companies." },
];

export default function PlacementsPage() {
  return (
    <div>
      {/* Image + side content */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Put your placement photo at public/placements/placement-hero.jpg */}
          <div className="order-2 md:order-1">
            <SafeImage
              src="/placements/placement-hero.jpg"
              alt="Ideal Inspirer students placed in top companies"
              label="Add placement image"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
          </div>

          <div className="order-1 md:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
              Placements
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
              From classroom to <span className="text-[#f51533]">career</span>
            </h1>
            <p className="mt-4 max-w-md font-body text-sm leading-6 text-ink/65 md:text-base">
              Our alumni work at leading technology and services companies.
              We support you beyond the course — with placement assistance,
              internships and interview preparation.
            </p>

            <ul className="mt-6 space-y-4">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0080de] text-xs font-bold text-white">
                    ✓
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      {p.title}
                    </p>
                    <p className="font-body text-sm text-ink/60">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className="btn-primary">
                Browse courses
              </Link>
              <Link href="/enquire" className="btn-secondary">
                Talk to a counsellor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {STATS.map((x) => (
            <div key={x.label} className="text-center">
              <p className="font-display text-3xl font-bold text-white">{x.value}</p>
              <p className="mt-1 font-body text-sm text-white/65">{x.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we help */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Your path to a <span className="text-[#0080de]">placement</span>
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((st) => (
            <div key={st.n} className="card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0080de] font-display text-base font-bold text-white">
                {st.n}
              </span>
              <p className="mt-4 font-display text-lg font-semibold text-ink">{st.title}</p>
              <p className="mt-1 font-body text-sm text-ink/60">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Companies slider */}
      <AlumniMarquee />
    </div>
  );
}
