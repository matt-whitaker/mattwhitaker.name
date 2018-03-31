import gulp from 'gulp';
import inject from 'gulp-inject';

export default function(config, libStream) {
  const { srcRoot, dstRoot } = config.get('build');

  return gulp.src(`${srcRoot}/templates/master.hbs`)
    .pipe(inject(libStream, { ignorePath: dstRoot }));
}