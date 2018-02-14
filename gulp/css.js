import gulp from 'gulp';
import less from 'gulp-less';
import config from 'config';
import handleError from './utils/handleError';
import printFiles from './utils/printFiles';

const { srcRoot, dstRoot } = config.get('build');

module.exports = () =>
  gulp.src(`${srcRoot}/less/*.less`)
    .pipe(less().on('error', handleError))
    .pipe(gulp.dest(`${dstRoot}/assets/css`))
    .pipe(printFiles('css'))
    .pipe(gulp.browserSync.stream({ once: true }))
    .on('error', handleError);