const deploy  = require('./deploy');
const serve   = require('./serve');
const clean   = require('./clean');
const bower   = require('./bower');
const assets  = require('./assets');
const css     = require('./css');
const html    = require('./html');

module.exports = {
  deploy,
  serve,
  clean,
  bower,
  assets,
  css,
  html
};