/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06091A",
        "ink-card": "#0C1024",
        "ink-border": "#1A2540",
        brand: "#2563EB",
        "brand-light": "#60A5FA",
        cta: "#F97316",
        "cta-dark": "#EA6C0A",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
