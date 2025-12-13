/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      fontSize: {
        xxs: "0.60rem",
      },
      colors: {
        primary: {
          DEFAULT: "#043545", // Main sidebar background
          light: "#064B5F", // Hover
          dark: "#032A33", // Very dark shade
        },
        secondary: "#0095B1",
        blue: {
          400: "#5C9DD4",
        },
        yellow: {
          400: "#F5BF15",
        },
        green: {
          400: "#93BE3D",
          200: "#93BE3D80",
        },
        orange: {
          400: "#E16126",
        },
      },
    },
  },
  plugins: [],
};
