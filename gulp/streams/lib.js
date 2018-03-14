import gulp from 'gulp';

export default function(config) {
  const { dstRoot } = config.get('build');

  return gulp.src(`${dstRoot}/**/*.*`, { read: false });
}