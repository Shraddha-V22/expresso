/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        japnicaLight: "#FCAA95",
        japnica: "#E7846D",
        japnicaDark: "#CF6650",
        japnicaDarker: "#B44B37",

        sanJuanLighter: "#5B7F99",
        sanJuanLight: "#415E78",
        sanJuan: "#2E4661",
        sanJuanDark: "#213652",
      },
      fontFamily: {
        karla: ["Karla"],
      },
      boxShadow: {
        one: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      },
    },
  },
  plugins: [],
};
