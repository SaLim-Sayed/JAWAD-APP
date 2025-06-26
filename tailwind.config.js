/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brownColor: {
          50: "var(--brown-color-50)",
          300: "var(--brown-color-300)",
          400: "var(--brown-color-400)",
          100: "var(--brown-color-100)",
        },
        yellowColor: {
          300: "var(--yellow-color-300)",
        },

        grayColor: {
          100: "var(--gray-color-100)",
        },
        mainColor: {
          100: "var(--main-color-100)",
          200: "var(--main-color-200)",
          300: "var(--main-color-300)",
          400: "var(--main-color-400)",
          500: "var(--main-color-500)",
          600: "var(--main-color-600)",
        },
        successColor: "var(--success-color-100)",
        warningColor: "var(--warning-color-100)",
        darkColor: {
          100: "var(--dark-color-100)",
          200: "var(--dark-color-200)",
        },
        whiteColor: {
          100: "var(--white-color-100)",
          200: "var(--white-color-200)",
        },
        secondryColor: {
          100: "var(--secondry-color-100)",
          200: "var(--secondry-color-200)",
          300: "var(--secondry-color-300)",
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.tajawal-semibold-18': {
          'font-weight': '700',
          'font-size': '18px',
          'line-height': '40px',
          'letter-spacing': '0',
          'vertical-align': 'middle',
        },
        '.tajawal-semibold-16': {
          'font-weight': '700',
          'font-size': '16px',
          'line-height': '40px',
          'letter-spacing': '0',
          'vertical-align': 'middle',
        },
        '.tajawal-medium-20': {
          'font-weight': '500',
          'font-size': '20px',
          'line-height': '60px',
          'letter-spacing': '0',
          'vertical-align': 'middle',
        },
        '.tajawal-16': {
          'font-weight': '500',
          'font-size': '16px',
          'line-height': '24px',
          'letter-spacing': '0',
          'vertical-align': 'middle',
        },  
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};