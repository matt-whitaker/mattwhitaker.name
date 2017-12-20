import gulp from 'gulp';
import deploy from './tasks/deploy';
import handleError from './utils/handleError';
import printFiles from './utils/printFiles';

module.exports = () => {
  return gulp.src('lib/**/*.*')
    .pipe(printFiles('deploy', 'Uploading'))
    .pipe(deploy())
    .on('error', handleError);
};