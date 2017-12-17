import gulp from 'gulp';
import config  from 'config';

const { srvRoot, assetsRoot } = config.get('build');

module.exports = () => gulp.src(`${assetsRoot}/**/*.*`)
  .pipe(gulp.dest(`${srvRoot}/${assetsRoot}`));