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

console.log('Using the following configurations:');
console.log(JSON.stringify(objToEnv(config), null, 2));

module.exports = {
  output: {
    path: path.resolve(process.cwd(), 'lib'),
    publicPath: '/',
  },
  plugins: [
    /**
     * Creates the articles manifest file
     */
    new CreateFileWebpack({
      path: './dist/articles/manifest.json',
      fileName: 'index.js',
      content: JSON.stringify(generateManifest(), null, 4),
    }),

    /**
     * Copies the following:
     * - Article `.md` files, stripping the front matter
     */
    new CopyWebpackPlugin([
      {
        transform(content) {
          return Promise.resolve(gm(content.toString()).content.trimLeft());
        },
        // transformPath(targetPath) {
        //   return targetPath.replace('.md', '.html');
        // },
        from: './articles/**/*',
      },
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
