import gulp from 'gulp';
import clean from 'gulp-clean';

module.exports = () => gulp.src('lib').pipe(clean());