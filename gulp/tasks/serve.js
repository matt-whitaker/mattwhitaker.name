const gulp        = require('gulp');
const config      = require('config');
const handleError = require('../utils/handleError');

const { srvRoot, srcRoot } = config.get('build');

const port = process.env.PORT || 8080;

module.exports = () => {
  gulp.browserSync.init({
    port,
    injectChanges: true,
    files: `./${srvRoot}/**/*`,
    server: {
      baseDir: `./${srvRoot}`
    }
  });
  gulp.watch(`${srcRoot}/**/*.less`, ['css']).on('error', handleError);
  gulp.watch(`${srcRoot}/**/*.mustache`, ['html']).on('error', handleError);
};