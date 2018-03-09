import config from 'config';
import gulp from 'gulp';
import less from 'gulp-less';
import handleError from './utils/handleError';
import printFiles from './utils/printFiles';

const { srcRoot, dstRoot } = config.get('build');

export default function(bs) {
  return () =>
    gulp.src(`${srcRoot}/less/*.less`)
      .pipe(less().on('error', handleError))
      .pipe(gulp.dest(`${dstRoot}/css`))
      .pipe(printFiles('css'))
      .pipe(bs.stream({ once: true }));
}