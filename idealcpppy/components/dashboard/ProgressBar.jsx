"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({
  value,
  showLabel = true,
  size = "md",
  className = "",
}) {
  const [animated, setAnimated] = useState(false);
  const clamped = Math.min(100, Math.max(0, value));

  useEffect(() => {
    const timer = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(timer);
  }, [value]);

  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`progress-track flex-1 overflow-hidden rounded-full bg-ink/10 ${heightClass}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`progress-fill h-full rounded-full bg-gradient-to-r from-teal to-teal-400 ${heightClass}`}
          style={{ width: animated ? `${clamped}%` : "0%" }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 font-mono text-xs font-medium text-ink/60">
          {clamped}%
        </span>
      )}
    </div>
  );
}
