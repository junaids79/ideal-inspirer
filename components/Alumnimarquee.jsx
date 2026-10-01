"use client";

// "Our Alumni Work at" — auto-sliding logo strip (logos only, no text).
// Same marquee technique as StatsMarquee / TestimonialsMarquee.
//
// Put each logo file in /public/alumni/ using the filename below
// (PNG, SVG, WebP or JPG — just make the `file` value match).
// A logo whose file is missing is skipped automatically, so you can add
// them gradually without breaking the slider.
import { useState } from "react";

const COMPANIES = [
  { name: "Google", file: "google.png" },
  { name: "Microsoft", file: "microsoft.png" },
  { name: "Amazon", file: "amazon.png" },
  { name: "Capgemini", file: "capgemini.png" },
  { name: "Infosys", file: "infosys.png" },
  { name: "TCS", file: "tcs.png" },
  { name: "Tech Mahindra", file: "tech-mahindra.png" },
  { name: "Wipro", file: "wipro.png" },
  { name: "IBM", file: "ibm.png" },
  { name: "Accenture", file: "accenture.png" },
  { name: "Dell", file: "dell.png" },
  { name: "Cognizant", file: "cognizant.png" },
  { name: "Mphasis", file: "mphasis.png" },
  { name: "HCL", file: "hcl.png" },
  { name: "Hewlett Packard Enterprise", file: "hpe.png" },
  { name: "Intel", file: "intel.png" },
  { name: "EY", file: "ey.png" },
  { name: "Techwave", file: "techwave.png" },
  { name: "Mercedes-Benz", file: "mercedes-benz.png" },
  { name: "24/7.ai", file: "247.png" },
  { name: "HP", file: "hp.png" },
  { name: "AEGIS", file: "aegis.png" },
  { name: "UKG", file: "ukg.png" },
  { name: "Concentrix", file: "concentrix.png" },
  { name: "Schneider Electric", file: "schneider-electric.png" },
  { name: "Flipkart", file: "flipkart.png" },
  { name: "Hanu", file: "hanu.png" },
  { name: "Café Coffee Day", file: "cafe-coffee-day.png" },
];

function Logo({ company }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <li className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white px-5 shadow-sm">
      <img
        src={`/alumni/${company.file}`}
        alt={company.name}
        title={company.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="max-h-12 w-auto max-w-full object-contain"
      />
    </li>
  );
}

function Group({ hidden = false }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-6 pr-6"
      aria-hidden={hidden || undefined}
    >
      {COMPANIES.map((c) => (
        <Logo key={c.name} company={c} />
      ))}
    </ul>
  );
}

export default function AlumniMarquee() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-[#0080de]">
          Our Alumni
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-ink md:text-3xl">
          Our Alumni Work at
        </h2>

        <div className="marquee relative mt-10 overflow-hidden">
          <div
            className="marquee-track"
            style={{ animation: "marquee-scroll 60s linear infinite" }}
          >
            <Group />
            <Group hidden />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent sm:w-28" />
        </div>
      </div>
    </section>
  );
}