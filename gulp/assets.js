import gulp from 'gulp';
import config from 'config';
import printFiles from './utils/printFiles';

const { assetsRoot, dstRoot } = config.get('build');

module.exports = () => gulp.src(`${assetsRoot}/**/*.*`)
  .pipe(gulp.dest(`${dstRoot}/assets`))
  .pipe(printFiles('assets'));