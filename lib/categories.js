// Single source of truth for course domains.
// Used by: the admin course form, the course browser filter pills,
// the navbar "Courses" menu and the homepage category tiles.
// Keep the names EXACTLY in sync with the `category` values saved on
// courses in Supabase, otherwise filtering by category will not match.
export const COURSE_CATEGORIES = [
  "Software & Technical Tools",
  "Programming Languages",
  "Data & AI",
  "Foreign/Spoken Languages",
  "Test Prep",
  "Marketing",
  
];

// Display-only extras (emoji shown in the navbar menu and homepage tiles).
export const CATEGORY_ICONS = {
  "Software & Technical Tools": "💻",
  "Programming Languages": "🐍",
  "Data & AI": "📊",
  "Foreign/Spoken Languages": "🌐",
  "Test Prep": "📝",
  Marketing: "📣",
 
};

export function categoryHref(category) {
  return `/courses?category=${encodeURIComponent(category)}`;
}