import gulp from 'gulp';
import clean from 'gulp-clean';
import printFiles from './utils/printFiles';

export default function({ dstRoot }) {
  return () => gulp.src(dstRoot)
    .pipe(clean())
    .pipe(printFiles('clean', 'Removed'));
}