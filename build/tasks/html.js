const gulp          = require('gulp');
const inject        = require('gulp-inject');
const htmlmin       = require('gulp-htmlmin');
const rename        = require('gulp-rename');
const merge         = require('gulp-merge');
const browserSync   = require('browser-sync').create();
const config        = require('config');
const R             = require('ramda');
const pkg           = require('../../package.json');
const renderSite    = require('./helpers/renderSite');
const handleError   = require('../utils/handleError');

const { srvRoot, srcRoot } = config.get('build');

module.exports = () => {
  const cssSources = gulp.src(`./${srvRoot}/**/*.css`, { read: false });

  const { version } = pkg;

  const context = R.merge(config.get('site'))({
    version
  });

  return gulp.src(`${srcRoot}/**/*.mustache`)
    .pipe(renderSite(context))
    .pipe(inject(cssSources, { ignorePath: srvRoot }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(srvRoot))
    .pipe(browserSync.stream({ once: true }))
    .on('error', handleError);
};