import config from 'config';
import gulp from 'gulp';
import deploy from './tasks/deploy';
import handleError from './utils/handleError';

const { srvRoot } = config.get('build');

module.exports = () => {
  return gulp.src(`${srvRoot}/**/*.*`)
    .pipe(deploy())
    .on('error', handleError);
};