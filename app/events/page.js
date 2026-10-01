import SafeImage from "@/components/SafeImage";
import { EVENTS } from "@/lib/events";

export const metadata = {
  title: "Events | Ideal Inspirer",
  description: "Workshops, seminars and celebrations from Ideal Inspirer.",
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

export default function EventsPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
          What's happening
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
          Ideal Inspirer <span className="text-[#0080de]">Events</span>
        </h1>
        <p className="mt-3 max-w-xl font-body text-sm text-ink/60 md:text-base">
          Workshops, seminars, award ceremonies and celebrations from our
          campuses — moments from the Ideal Inspirer community.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        {EVENTS.length === 0 ? (
          <div className="card px-6 py-16 text-center font-body text-sm text-ink/55">
            No events yet — check back soon.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e) => (
              <article
                key={e.title}
                className="card flex flex-col overflow-hidden p-2 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <SafeImage
                    src={e.image}
                    alt={e.title}
                    label="Event image"
                    className="aspect-[5/4] w-full object-cover"
                  />
                  {e.location && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 font-body text-xs font-medium text-white backdrop-blur">
                      <PinIcon />
                      {e.location}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                  <h2 className="font-display text-lg font-semibold leading-snug text-ink">
                    {e.title}
                  </h2>
                  <p className="mt-3 line-clamp-5 font-body text-sm leading-6 text-ink/60">
                    {e.description}
                  </p>
                  {(e.date || e.time) && (
                    <p className="mt-auto pt-4 font-body text-sm font-medium text-[#0080de]">
                      {[e.date, e.time].filter(Boolean).join(" – ")}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
