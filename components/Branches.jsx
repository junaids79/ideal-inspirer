import Link from "next/link";

// ---- Edit these to change the branch details ------------------------------
const MAHABUBNAGAR = {
  name: "Mahabubnagar",
  address: "Hanumanpura, Old Palamoor, Mahbubnagar, Telangana 509001",
  phone: "+91 97039 79806",
  phoneHref: "tel:+919703979806",
};
// The map pin is found from the address text. For an exact pin, open your
// office in Google Maps > Share > "Embed a map", copy the src="..." link and
// paste it into MAP_EMBED_URL below (and the "Share" link into DIRECTIONS_URL).
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  MAHABUBNAGAR.address
)}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAHABUBNAGAR.address
)}`;
// ---------------------------------------------------------------------------

export default function Branches() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          Locations
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Our Branches
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center font-body text-sm text-ink/55">
          Visit our training centre for hands-on, in-person learning.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Mahabubnagar (live) */}
          <div className="card overflow-hidden lg:col-span-2">
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <div className="flex flex-col p-6 md:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-teal-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />
                  Open now
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {MAHABUBNAGAR.name}
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-ink/65">
                  {MAHABUBNAGAR.address}
                </p>
                <a
                  href={MAHABUBNAGAR.phoneHref}
                  className="mt-3 font-body text-sm font-medium text-ink/80 hover:text-ink"
                >
                  {MAHABUBNAGAR.phone}
                </a>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-6 w-fit px-5 py-2.5 text-sm"
                >
                  Get Directions
                </a>
              </div>

              <div className="min-h-[18rem] border-t border-ink/10 md:border-l md:border-t-0">
                <iframe
                  title="Ideal Inspirer office in Mahabubnagar on Google Maps"
                  src={MAP_EMBED_URL}
                  className="h-full min-h-[18rem] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Hyderabad (coming soon) */}
          <div className="card flex flex-col justify-between border-dashed p-6 md:p-8">
            <div>
              <span className="inline-flex w-fit items-center rounded-full bg-marigold-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-marigold-600">
                Coming soon
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                Hyderabad
              </h3>
              <p className="mt-3 font-body text-sm leading-6 text-ink/65">
                We are bringing Ideal Inspirer training to Hyderabad soon!
              </p>
            </div>
            <Link
              href="/enquire"
              className="btn-secondary mt-6 w-fit px-5 py-2.5 text-sm"
            >
              Notify Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}