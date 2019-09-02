const path = require('path');
const config = require('config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CreateFileWebpack = require('create-file-webpack');
const { EnvironmentPlugin } = require('webpack');
const objToEnv = require('../utils/objToEnv');
const gm = require('gray-matter');
const generateManifest = require('../utils/generateManifest');
const GenerateJsonPlugin = require('../utils/GenerateJsonPlugin');

const envVars = objToEnv(config);

module.exports = {
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  plugins: [
    /**
     * Creates the articles manifest file
     */
    new GenerateJsonPlugin('articles/manifest.json', generateManifest(), null, 4),

    /**
     * Copies the following:
     * - Article `.md` files, stripping the front matter
     */
    new CopyWebpackPlugin([
      {
        transform(content) {
          return Promise.resolve(gm(content.toString()).content.trimLeft());
        },
        from: './articles/**/*',
      },
    ]),

    /**
     * Provide environment variables generated from configs for a consistent access pattern
     */
    new EnvironmentPlugin(envVars),

    /**
     * Allow local environment variable override
     */
    new EnvironmentPlugin(process.env),

    /**
     * Build the HTML
     */
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      env: { ...envVars, ...process.env },
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.less'],
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
