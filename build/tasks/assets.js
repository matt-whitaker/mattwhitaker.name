const gulp    = require('gulp');
const config  = require('config');
const { srvRoot, assetsRoot } = config.get('build');

module.exports = () => gulp.src(`${assetsRoot}/**/*.*`)
  .pipe(gulp.dest(`${srvRoot}/${assetsRoot}`));