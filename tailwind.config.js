/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36a9f8',
          500: '#0c8de9',
          600: '#026fc7',
          700: '#0359a2',
          800: '#074c85',
          900: '#0c406e',
          950: '#082849',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', '"Plus Jakarta Sans"', '"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-body)', '"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['var(--font-body)', '"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.06)',
        'glass': '0 20px 50px 0 rgba(15, 23, 42, 0.08)',
        'glow-brand': '0 0 25px -5px rgba(12, 141, 233, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
      },
    },
  },
  plugins: [],
};
