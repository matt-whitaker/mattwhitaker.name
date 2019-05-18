const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  output: {
    path: path.resolve(process.cwd(), "lib"),
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html"
    })
  ],
  resolve: {
    extensions: [".jsx",".js"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};