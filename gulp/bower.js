import bower from 'main-bower-files';
import gulp from 'gulp';
import printFiles from './utils/printFiles';

export default function(config) {
  const { dstRoot } = config.get('build');

  return () =>
    gulp.src(bower(), { base: 'bower_components' })
      .pipe(gulp.dest(dstRoot))
      .pipe(printFiles('bower'));
}