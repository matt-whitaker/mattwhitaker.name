import gulp from 'gulp';
import printFiles from './utils/printFiles';

export default function(config) {
  const { assetsRoot, dstRoot } = config.get('build');

  return () => gulp.src(`${assetsRoot}/**/*.*`)
    .pipe(gulp.dest(`${dstRoot}`))
    .pipe(printFiles('assets'));
}