const path = require('path');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EnvironmentPlugin } = require('webpack');

const objToEnv = require('../utils/objToEnv');

console.log('Using environment variables: ');
console.log(objToEnv(config));

module.exports = {
  output: {
    path: path.resolve(process.cwd(), 'lib'),
    publicPath: '/',
  },
  plugins: [
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
