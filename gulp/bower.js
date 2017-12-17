import config from 'config';
import bower from 'main-bower-files';
import gulp from 'gulp';

const { srvRoot } = config.get('build');

module.exports = () =>
  gulp.src(bower(), { base: 'bower_components' })
    .pipe(gulp.dest(srvRoot));