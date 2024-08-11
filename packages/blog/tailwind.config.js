
/** @type {import("tailwindcss").Config} */
export default {
  content: ["./template/**/*.ejs"],
  presets: [
    require("@mattwhitaker.name/core/common-tailwind.js")
  ],
  theme: {
    extend: {
      borderStyle: {
        inset: "insert",
        outset: "outset",
        groove: "groove"
      },
      keyframes: {
        subtitle_in: {
          "0%": { marginLeft: "0", opacity: "15%" },
          "100%": { marginLeft: "18px", opacity: "100%" },
        },
        opacity_in: {
          "0%": { opacity: "15%"},
          "100%": { opacity: "100%"}
        }
      },
      animation: {
        subtitle_in: "subtitle_in 700ms forwards",
        subtitle_line_in: "opacity_in 700ms forwards",
        opacity_in: "opacity_in 700ms forwards",
      },
    }
  },
  plugins: [

  ],
}

