import gulp from 'gulp';
import clean from 'gulp-clean';
import printFiles from './utils/printFiles';

export default function(config) {
  const { dstRoot } = config.get('build');

  return () => gulp.src(dstRoot)
    .pipe(clean())
    .pipe(printFiles('clean', 'Removed'));
}