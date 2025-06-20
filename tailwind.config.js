/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
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
  plugins: [],
};
