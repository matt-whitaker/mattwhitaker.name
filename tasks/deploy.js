const config      = require('config');
const gulp        = require('gulp');
const deploy      = require('./helpers/deploy');
const handleError = require('./helpers/handleError');

const { srvRoot } = config.get('options');

module.exports = () => {
  return gulp.src(`${srvRoot}/**/*.*`)
    .pipe(deploy())
    .on('error', handleError);
};