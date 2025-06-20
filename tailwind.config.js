/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f8f4',
          100: '#e9f0e4',
          200: '#d4e1ca',
          300: '#b4cba4',
          400: '#87a96b',
          500: '#6b8a52',
          600: '#5a7344',
          700: '#4a5f39',
          800: '#3d4f31',
          900: '#2f3e2a',
        },
        cream: {
          50: '#fefcf8',
          100: '#fdf9f0',
          200: '#f9f2e4',
          300: '#f4e8d1',
          400: '#edd5b3',
          500: '#e4c088',
          600: '#d4a574',
          700: '#b8855a',
          800: '#9a6d47',
          900: '#7d5a3a',
        },
        offwhite: {
          50: '#fefcf8',
          100: '#fdf9f0',
          200: '#f7f5f0',
          300: '#f2f0eb',
          400: '#ebe8e1',
          500: '#e0ddd4',
          600: '#ccc8bd',
          700: '#a8a399',
          800: '#87837a',
          900: '#6e6b63',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
