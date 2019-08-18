const { DllPlugin } = require("webpack");

module.exports = {
  context: process.cwd(),

  entry: {
    library: [
      "axios",
      "react",
      "react-dom",
      "react-router",
      "react-router-dom",
      "react-markdown",
      "react-redux",
      "redux"
    ]
  },

  output: {
    filename: "vendor.dll.js",
    library: "[name]"
  },

  plugins: [
    DllPlugin({ name: "vendor", path: "lib" })
  ]
};