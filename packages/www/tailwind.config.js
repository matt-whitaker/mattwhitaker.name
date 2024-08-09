/** @type {import('tailwindcss').Config} */
export default {
  content: ["./template/**/*.ejs", "./lang.txt"],
  theme: {
    spacing: {
      0: "0px",
      xxsmall: "5px",
      xsmall: "10px",
      small: "15px",
      medium: "20px",
      large: "25px",
      xlarge: "30px",
      xxlarge: "35px",
    },
    screens: {
      phone: "320px",
      tablet: "480px",
      desktop: "720px",
      wide: "1100px"
    },
    colors: {
      bgshade: "rgba(0,0,0, .03)",
      pgshade: "rgba(255, 255, 255, 1)",
      white: "#ffffff",
      gray50: "#808080",
      gray25: "#404040",
      silver: "#7c8288",
      blueash: "#414654",
      lightblueash: "#ebedf0",
      black: "#2f333d",
      gold: "#B59410",
      goldstone: "#7A7669",
      "goldstone-faded": "#7A76694f"
    },
    fontFamily: {
      sans: ['Urbanist', 'sans-serif']
    },
    extend: {
      fontSize: {
        normal: "16px",
        normalp: "1.1em",
        xlarge: "2.2em"
      },
    }
  },
  plugins: [],
}

