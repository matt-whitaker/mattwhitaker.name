import gulp from 'gulp';

export default function(config) {
  const { srcRoot } = config.get('build');

  const helpersSrc = [`${srcRoot}/helpers/*.js`];

  return gulp.src(helpersSrc, { read: false }); // will `require('...')` these files
}