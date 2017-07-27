const config      = require('config');
const gulp        = require('gulp');
const deploy      = require('./helpers/deploy');
const handleError = require('../utils/handleError');

const { srvRoot } = config.get('build');

module.exports = () => {
  return gulp.src(`${srvRoot}/**/*.*`)
    .pipe(deploy())
    .on('error', handleError);
};