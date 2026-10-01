export default function CourseThumbnail({ title, gradient = "from-teal-600 to-teal-800", className = "" }) {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-display text-sm font-semibold text-white ${gradient} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
