import gulp from 'gulp';

export default function(config) {
  const { srcRoot } = config.get('build');

  const partialsSrc = [`${srcRoot}/partials/*.hbs`];

  return gulp.src(partialsSrc, { read: true });
}