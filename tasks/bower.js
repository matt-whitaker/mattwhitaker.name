const config  = require('config');
const bower   = require('main-bower-files');
const gulp    = require('gulp');

const { srvRoot } = config.get('options');

module.exports = () =>
  gulp.src(bower(), { base: 'bower_components' })
    .pipe(gulp.dest(srvRoot));