/** @type {import('tailwindcss').Config} */
export default {
  content: ["./template/**/*.ejs", "./lang.txt"],
  presets: [
    require("@mattwhitaker.name/core/common-tailwind.js")
  ],
  theme: {
    extend: {
      screens: {
        'mobile-landscape': { raw: '(max-width: 768px) and (orientation: landscape)' },
        landscape: { raw: '(orientation: landscape)' },
        portrait: { raw: '(orientation: portrait)' },
      },
      spacing: {
        xxsmall: "5px",
        xsmall: "10px",
        small: "15px",
        medium: "20px",
        large: "25px",
        xlarge: "30px",
        xxlarge: "35px",
      },
      fontSize: {
        normal: "16px",
        normalp: "1.1em",
        xlarge: "2.2em"
      },
      keyframes: {
        opacity_in: {
          "0%": { opacity: "15%"},
          "100%": { opacity: "100%"}
        },
        pulse: {
          "0%": { color: "theme(colors.green)", opacity: "100%" },
          "30%": { color: "theme(colors.green)", opacity: "100%" },
          "100%": { color: "theme(colors.safety)", opacity: "0%" }
        }
      },
      animation: {
        opacity_in: "opacity_in 700ms forwards",
        pulse: "pulse 1s linear alternate infinite"
      },
      backgroundSize: {
        bannerSizing: "auto calc(100% - theme(spacing.lg))"
      }
    },
  },
  plugins: [],
}

