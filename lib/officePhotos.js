// Office photos shown in the sliding gallery on the homepage hero.
//
// HOW TO ADD YOUR PHOTOS
//   1. Copy your office pictures into  public/office/
//   2. Put their file names in the list below (exact spelling, including
//      the extension: .jpg / .jpeg / .png / .webp).
//   3. Save. The slider picks them up automatically. Any name in this list
//      that does not exist in the folder is skipped silently, so you can
//      leave extra names here.
//
// Tip: landscape photos (4:3) around 1200px wide look best.

export const OFFICE_PHOTO_FILES = [
  "office-1.jpg",
  "office-2.jpg",
  "office-3.jpg",
  "office-4.jpg",
  "office-5.jpg",
  "office-6.jpg",
];

// How long each photo stays on screen before sliding to the next (ms).
export const SLIDE_INTERVAL_MS = 2500;

export const OFFICE_PHOTOS = OFFICE_PHOTO_FILES.map((file, i) => ({
  src: `/${file}`,
  alt: `Ideal Inspirer office and training centre, photo ${i + 1}`,
}));