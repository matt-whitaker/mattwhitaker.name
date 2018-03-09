import config from 'config';
import bower from 'main-bower-files';
import gulp from 'gulp';
import printFiles from './utils/printFiles';

const { dstRoot } = config.get('build');

export default function() {
  return () =>
    gulp.src(bower(), { base: 'bower_components' })
      .pipe(gulp.dest(dstRoot))
      .pipe(printFiles('bower'));
}