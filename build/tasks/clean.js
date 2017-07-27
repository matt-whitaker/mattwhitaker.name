const config  = require('config');
const gulp    = require('gulp');
const clean   = require('gulp-clean');
const { srvRoot } = config.get('build');

module.exports = () => gulp.src(srvRoot).pipe(clean());