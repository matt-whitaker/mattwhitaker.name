import gulp from 'gulp';
import clean from 'gulp-clean';
import printFiles from './utils/printFiles';

module.exports = () => gulp.src('lib').pipe(clean()).pipe(printFiles('clean', 'Removed'));