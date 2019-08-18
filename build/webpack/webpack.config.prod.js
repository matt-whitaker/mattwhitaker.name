const merge = require("webpack-merge");
const common = require("./webpack.config.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",

  devtool: "source-map",

  entry: "./src/index.jsx",

  output: {
    filename: "js/app.min.js"
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/app.min.css"
    })
  ]
});