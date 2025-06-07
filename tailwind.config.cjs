/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-red-500", "text-white", "p-4", "max-w-sm"],
  theme: {
    extend: {},
  },
  plugins: [],
};
