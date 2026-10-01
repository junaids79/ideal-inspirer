export default function StatsCard({ icon, label, value, accent = "teal" }) {
  const accentClasses = {
    teal: "bg-teal-50 text-teal-700",
    marigold: "bg-marigold-50 text-marigold-600",
    ink: "bg-ink-50 text-ink-700",
  };

  return (
    <div className="card reveal flex items-start gap-4 px-5 py-5 sm:px-6 sm:py-6">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${accentClasses[accent] ?? accentClasses.teal}`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink/40">
          {label}
        </p>
        <p className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {value}
        </p>
      </div>
    </div>
  );
}
