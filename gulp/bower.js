import bower from 'main-bower-files';
import gulp from 'gulp';

module.exports = () =>
  gulp.src(bower(), { base: 'bower_components' })
    .pipe(gulp.dest('lib'));