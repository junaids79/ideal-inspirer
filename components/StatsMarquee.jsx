// Stats strip that scrolls left -> right continuously, in the same style as
// the "Our Students Placed At" logo strip on the reference site.
// Edit the numbers below anytime.
const STATS = [
  { icon: "👥", value: "5,000+", label: "Learners trained" },
  { icon: "🎬", value: "25+", label: "Courses" },
  { icon: "⭐", value: "4.8", label: "Google rating" },
  { icon: "📱", value: "1,000+", label: "App installs" },
  { icon: "🏆", value: "2025", label: "Best EdTech Startup Award" },
  { icon: "🛡️", value: "ISO", label: "9001:2015 certified" },
];

function Group({ hidden = false }) {
  // Two copies of the list per group so one group is always wider than the
  // screen; the track holds two groups and slides by exactly one group.
  const items = [...STATS, ...STATS];
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={hidden || undefined}
    >
      {items.map((stat, i) => (
        <li key={`${stat.label}-${i}`} className="flex shrink-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl">
            {stat.icon}
          </div>
          <div>
            <p className="whitespace-nowrap font-display text-xl font-semibold text-white">
              {stat.value}
            </p>
            <p className="whitespace-nowrap font-body text-xs text-white/60 sm:text-sm">
              {stat.label}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function StatsMarquee() {
  return (
    <section className="bg-ink" aria-label="Ideal Inspirer at a glance">
      <div className="marquee relative overflow-hidden py-10">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
        {/* soft fade at both edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28" />
      </div>
    </section>
  );
}