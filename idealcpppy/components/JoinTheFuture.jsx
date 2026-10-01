import Link from "next/link";
import CountUp from "@/components/CountUp";

const MODES = [
  {
    icon: "💻",
    title: "Online",
    detail: "Live interactive sessions from anywhere in the world.",
  },
  {
    icon: "🏫",
    title: "Offline",
    detail: "Hands-on classroom training at our state-of-the-art centers.",
  },
  {
    icon: "🔀",
    title: "Hybrid",
    detail: "The best of both worlds. Flexibility meets face-to-face mentoring.",
  },
];

export default function JoinTheFuture() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Learn your way
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
            Join the Future
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ink/60 md:text-base">
            Empowering students with industry-standard skills and flexible
            learning environments.
          </p>
        </div>

        {/* Animated counter + Google rating */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-6 rounded-xl2 border border-ink/10 bg-paper px-6 py-10 text-center shadow-card sm:flex-row sm:gap-12">
          <div>
            <CountUp
              end={30000}
              suffix="+"
              className="font-display text-5xl font-bold text-marigold-600 md:text-6xl"
            />
            <p className="mt-2 font-body text-sm font-medium text-ink/60">
              Students Enrolled
            </p>
          </div>

          <div className="hidden h-16 w-px bg-ink/10 sm:block" aria-hidden="true" />

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 shadow-card">
              <span aria-hidden="true" className="text-lg">
                ⭐
              </span>
              <span className="font-display text-lg font-semibold text-ink">
                4.8/5
              </span>
              <span className="font-body text-sm text-ink/60">on Google</span>
            </div>
            <p className="font-body text-xs text-ink/45">Rated by our learners</p>
          </div>
        </div>

        {/* Online / Offline / Hybrid */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {MODES.map((mode) => (
            <div
              key={mode.title}
              className="card p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-marigold-50 text-2xl">
                {mode.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {mode.title}
              </h3>
              <p className="mt-2 font-body text-sm text-ink/60">{mode.detail}</p>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}