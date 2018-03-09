import gulp from 'gulp';
import inject from 'gulp-inject';
import config from 'config';

const { srcRoot, dstRoot } = config.get('build');

export default function(libStream) {
  return gulp.src(`${srcRoot}/templates/master.html`)
    .pipe(inject(libStream, { ignorePath: dstRoot }));
}