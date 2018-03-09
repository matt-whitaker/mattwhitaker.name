import config from 'config';
import gulp from 'gulp';
import printFiles from './utils/printFiles';

const { assetsRoot, dstRoot } = config.get('build');

export default function() {
  return () => gulp.src(`${assetsRoot}/**/*.*`)
    .pipe(gulp.dest(`${dstRoot}`))
    .pipe(printFiles('assets'));
}