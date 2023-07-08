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

        mineShaftLighter: "#3C4644",
        mineShaftLight: "#2E3635",
        mineShaft: "#232B29",
        mineShaftDark: "#1C2321",
      },
      fontFamily: {
        karla: ["Karla"],
      },
      boxShadow: {
        one: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      },
      backgroundImage: {
        blob: "url('src/assets/bg-blobs.webp')",
        "blob-dark": "url('src/assets/bg-blobs-dark.webp')",
      },
    },
  },
  plugins: [],
};
