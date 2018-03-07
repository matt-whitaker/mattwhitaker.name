import gulp from 'gulp';
import less from 'gulp-less';
import handleError from './utils/handleError';
import printFiles from './utils/printFiles';

export default function({ srcRoot, dstRoot }, bs) {
  return () =>
    gulp.src(`${srcRoot}/less/*.less`)
      .pipe(less().on('error', handleError))
      .pipe(gulp.dest(`${dstRoot}/css`))
      .pipe(printFiles('css'))
      .pipe(bs.stream({ once: true }));
}