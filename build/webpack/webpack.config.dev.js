const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.common");

const SRC_ROOT = "src";
const LIB_ROOT = "lib";
const ASSETS_ROOT = "assets";

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  entry: "./src/index.jsx",

  output: {
    filename: "js/app.js"
  },

  devServer: {
    historyApiFallback: true
  }
});