import gulp from 'gulp';
import deploy from './tasks/deploy';
import handleError from './utils/handleError';

module.exports = () => {
  return gulp.src('lib/**/*.*')
    .pipe(deploy())
    .on('error', handleError);
};