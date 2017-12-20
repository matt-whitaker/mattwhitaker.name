import bower from 'main-bower-files';
import gulp from 'gulp';
import printFiles from './utils/printFiles';

module.exports = () =>
  gulp.src(bower(), { base: 'bower_components' })
    .pipe(gulp.dest('lib'))
    .pipe(printFiles('bower'));