import gulp from 'gulp';
import printFiles from './utils/printFiles';

export default function({ assetsRoot, dstRoot }) {
  return () => gulp.src(`${assetsRoot}/**/*.*`)
    .pipe(gulp.dest(`${dstRoot}`))
    .pipe(printFiles('assets'));
}