/** @type {import('tailwindcss').Config} */
export default {
  content: ["./template/**/*.ejs", "./lang.txt"],
  theme: {
    spacing: {
      0: "0px",

      xxxsmall: "3px",
      xxsmall: "5px",
      xsmall: "10px",
      small: "15px",
      medium: "20px",
      large: "25px",
      xlarge: "30px",
      xxlarge: "35px",

      "letter-width": "816px",
      "letter-height": "1056px",
      sidebar: "186px",
      content: "630px",
    },
    colors: {
      bgshade: "#0000000a",
      white: "#ffffff",
      blueash: {
        300: "#ebedf0",
        500: "#414654"
      },
      black: "#2f333d",
      gray: {
        25: "#404040",
        50: "#808080"
      },
      silver: "#7c8288",
      gold: "#B59410"
    },
    fontFamily: {
      sans: ["Urbanist", "sans-serif"]
    },
    fontSize: {
      normal: "16px",

      sm: ".78em",
      md: "1em",
      lg: "1.2em",
      xl: "1.8em",
      xxl: "2.4em",

      retitle: "2em",
      title: "3em"
    },
    extend: {
      listStyleType: {
        square: 'square',
      },
      lineHeight: {
        common: "1.3em"
      }
    }
  },
  plugins: [],
}

