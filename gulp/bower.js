import bower from 'main-bower-files';
import gulp from 'gulp';
import printFiles from './utils/printFiles';

export default function({ dstRoot }) {
  return () =>
    gulp.src(bower(), { base: 'bower_components' })
      .pipe(gulp.dest(dstRoot))
      .pipe(printFiles('bower'));
}