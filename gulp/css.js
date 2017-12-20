import gulp from 'gulp';
import less from 'gulp-less';
import handleError from './utils/handleError';
import printFiles from './utils/printFiles';

module.exports = () =>
  gulp.src('src/less/*.less')
    .pipe(less().on('error', handleError))
    .pipe(gulp.dest('lib/assets/css'))
    .pipe(printFiles('css'))
    .pipe(gulp.browserSync.stream({ once: true }))
    .on('error', handleError);