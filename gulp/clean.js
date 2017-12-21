import gulp from 'gulp';
import clean from 'gulp-clean';
import config from 'config';
import printFiles from './utils/printFiles';

const dstRoot = config.get('build.dstRoot');

module.exports = () => gulp.src(dstRoot).pipe(clean()).pipe(printFiles('clean', 'Removed'));