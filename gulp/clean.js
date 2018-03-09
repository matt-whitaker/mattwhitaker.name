import config from 'config';
import gulp from 'gulp';
import clean from 'gulp-clean';
import printFiles from './utils/printFiles';

const { dstRoot } = config.get('build');

export default function() {
  return () => gulp.src(dstRoot)
    .pipe(clean())
    .pipe(printFiles('clean', 'Removed'));
}