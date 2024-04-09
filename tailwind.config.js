/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-once': 'ping 600ms cubic-bezier(0.5, 0.3, 0.1, 0)',
      }
    },
  },
  plugins: [],
}

