import gulp from 'gulp';
import config from 'config'
import deploy from './pipes/deploy';
import handleError from './utils/handleError';
import printFiles from './utils/printFiles';

const dstRoot = config.get('build.dstRoot');

module.exports = () => {
  return gulp.src(`${dstRoot}/**/*.*`)
    .pipe(printFiles('deploy', 'Uploading'))
    .pipe(deploy())
    .on('error', handleError);
};