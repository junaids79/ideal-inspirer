/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#10233F",
          50: "#EEF1F6",
          100: "#D7DEE9",
          400: "#3E5578",
          700: "#182F52",
          900: "#0A1526",
        },
        marigold: {
          DEFAULT: "#F5A524",
          50: "#FEF6E9",
          100: "#FCE9C4",
          400: "#F7B655",
          600: "#D98A0E",
        },
        teal: {
          DEFAULT: "#0E7C7B",
          50: "#E7F4F3",
          100: "#C6E6E4",
          400: "#3E9C9A",
          700: "#0A5C5B",
        },
        paper: "#F3F6F5",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,35,63,0.06), 0 8px 24px -12px rgba(16,35,63,0.15)",
      },
    },
  },
  plugins: [],
};
