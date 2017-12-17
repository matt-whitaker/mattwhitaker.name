import gulp from 'gulp';

module.exports = () => gulp.src('assets/**/*.*')
  .pipe(gulp.dest('lib/assets'));