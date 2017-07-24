const gulp        = require('gulp');
const config      = require('config');
const handleError = require('./helpers/handleError');

const { srvRoot, srcRoot } = config.get('options');

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
  gulp.watch(`${srcRoot}/**/*.less`, ['_css']).on('error', handleError);
  gulp.watch(`${srcRoot}/**/*.mustache`, ['_html']).on('error', handleError);
};