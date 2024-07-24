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
      bgshade: "rgba(0,0,0, .03)",
      pgshade: "rgba(255, 255, 255, 1)",
      white: "#ffffff",
      gray50: "#808080",
      gray25: "#404040",
      silver: "#7c8288",
      blueash: "#414654",
      blueashfaded: "#4146541c",
      lightblueash: "#ebedf0",
      lightblueashfaded: "#ebedf01c",
      black: "#2f333d",
      blackfaded: "#2f333d33",
      gold: "#B59410"
    },
    fontFamily: {
      sans: ['Urbanist', 'sans-serif']
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
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
    },
    extend: {
      leading: {

      }
    }
  },
  plugins: [],
}

