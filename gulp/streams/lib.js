import gulp from 'gulp';
import config from 'config';

const { dstRoot } = config.get('build');

export default function() {
  return gulp.src(`${dstRoot}/**/*.*`, { read: false });
}