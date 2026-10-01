"use client";

import { useEffect, useState } from "react";
import { OFFICE_PHOTOS, SLIDE_INTERVAL_MS } from "@/lib/officePhotos";

// Sliding gallery of office photos. Replaces the old "Discover, Train, Get
// placed" text block in the hero. See lib/officePhotos.js to add your own
// photos — just drop files into public/office/ and list the file names
// there; nothing here needs to change.
export default function OfficePhotoSlider() {
  const [index, setIndex] = useState(0);
  const photos = OFFICE_PHOTOS;

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  if (photos.length === 0) {
    // No photos configured/uploaded yet — fall back to the original text
    // panel instead of showing an empty box.
    return (
      <div className="reveal card p-8">
        <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Your path with us
        </p>
        <p className="mt-4 font-display text-lg font-semibold text-ink">
          Discover, train, and get placed.
        </p>
        <p className="mt-2 font-body text-sm text-ink/55">
          Add your office photos to <code>public/office/</code> and list
          them in <code>lib/officePhotos.js</code> to show this gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="reveal card overflow-hidden p-0">
      <div className="photo-slider aspect-[4/3] w-full">
        {photos.map((photo, i) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className={i === index ? "is-active" : ""}
          />
        ))}
      </div>

      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-3">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-teal-700" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}