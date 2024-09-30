/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customLime: "var(--color-lime)",
        customLimeLight: "var(--color-limeLight)",
        customRed: "var(--color-red)",

        slate: {
          a: "var(--color-slatea)",
          b: "var(--color-slateb)",
          c: "var(--color-slatec)",
          d: "var(--color-slated)",
          e: "var(--color-slatee)",
          f: "var(--color-slatef)",
        },
      },
    },
  },
  plugins: [],
};
