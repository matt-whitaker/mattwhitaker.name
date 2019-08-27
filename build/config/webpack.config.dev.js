const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: './src/index.jsx',

  output: {
    filename: 'js/app.js',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.css',
      hmr: true,
    }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: ['dist', 'assets'],
  },
});
