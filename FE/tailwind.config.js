const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/react/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#03c6c7", // Default shade
          bgc: "#eaeaea", // Lighter shade
          textl: "#f2f2f2",
          textd:"#393939" // Darker shade
        },
        secondary: {
          DEFAULT: "#9333ea",
          light: "#d8b4fe",
          dark: "#6b21a8",
        },
        customGray: "#f3f4f6",
      },
    },
  },
  plugins: [nextui()],
};
