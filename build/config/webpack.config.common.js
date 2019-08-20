const path = require('path');
const config = require('config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EnvironmentPlugin } = require('webpack');
const objToEnv = require('../utils/objToEnv');
const { transform, transformPath } = require('../utils/articles');

console.log('Using the following configurations:');
console.log(JSON.stringify(objToEnv(config), null, 2));

module.exports = {
  output: {
    path: path.resolve(process.cwd(), 'lib'),
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([
      { transform, transformPath, from: './articles/**/*' },
    ]),
    new EnvironmentPlugin(objToEnv(config)),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
};
