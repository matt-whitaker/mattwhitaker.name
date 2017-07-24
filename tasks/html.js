const gulp          = require('gulp');
const inject        = require('gulp-inject');
const htmlmin       = require('gulp-htmlmin');
const rename        = require('gulp-rename');
const merge         = require('gulp-merge');
const browserSync   = require('browser-sync').create();
const config        = require('config');
const R             = require('ramda');
const pkg           = require('./../package.json');
const renderSite    = require('./helpers/render-site');
const handleError   = require('./helpers/handleError');

const { srvRoot, srcRoot } = config.get('options');
const mergeContext = R.merge(config.get('context'));

module.exports = () => {
  const cssSources = gulp.src(`./${srvRoot}/**/*.css`, { read: false });

  const context = config.get('context');
  const { version } = pkg;

  return gulp.src(`${srcRoot}/**/*.mustache`)
    .pipe(renderSite(mergeContext({ version })))
    .pipe(inject(cssSources, { ignorePath: srvRoot }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(srvRoot))
    .pipe(browserSync.stream({ once: true }))
    .on('error', handleError);
};