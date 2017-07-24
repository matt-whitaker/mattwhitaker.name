const gulp    = require('gulp');
const config  = require('config');
const { srvRoot, assetsRoot } = config.get('options');

module.exports = () => gulp.src(`${assetsRoot}/**/*.*`)
  .pipe(gulp.dest(`${srvRoot}/${assetsRoot}`));