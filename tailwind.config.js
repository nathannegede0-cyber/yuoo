/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#0f172a",
        brandGold: "#ffc107",
      },
    },
  },
  plugins: [],
};
