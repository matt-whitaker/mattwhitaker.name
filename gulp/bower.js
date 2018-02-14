import bower from 'main-bower-files';
import gulp from 'gulp';
import config from 'config';
import printFiles from './utils/printFiles';

const dstRoot = config.get('build.dstRoot');

module.exports = () =>
  gulp.src(bower(), { base: 'bower_components' })
    .pipe(gulp.dest(dstRoot))
    .pipe(printFiles('bower'));