"use client";

import { useState } from "react";

// <img> that shows a soft branded placeholder if the file is missing,
// so pages still look fine before you drop your real photos in.
export default function SafeImage({ src, alt, className = "", label = "Add image" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-marigold-50 to-teal-50 font-mono text-xs uppercase tracking-wide text-ink/40 ${className}`}
        role="img"
        aria-label={alt}
      >
        {label}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
