const gulp        = require('gulp');
const less        = require('gulp-less');
const config      = require('config');
const handleError = require('../utils/handleError');

const { srvRoot, srcRoot } = config.get('build');

module.exports = () =>
  gulp.src(`${srcRoot}/less/*.less`)
    .pipe(less().on('error', handleError))
    .pipe(gulp.dest(`${srvRoot}/assets/css`))
    .pipe(gulp.browserSync.stream({ once: true }))
    .on('error', handleError);