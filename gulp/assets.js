import gulp from 'gulp';
import printFiles from './utils/printFiles';

module.exports = () => gulp.src('assets/**/*.*')
  .pipe(gulp.dest('lib/assets'))
  .pipe(printFiles('assets'));