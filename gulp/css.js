import gulp from 'gulp';
import less from 'gulp-less';
import config from 'config';
import handleError from './utils/handleError';

const { srvRoot, srcRoot } = config.get('build');

module.exports = () =>
  gulp.src(`${srcRoot}/less/*.less`)
    .pipe(less().on('error', handleError))
    .pipe(gulp.dest(`${srvRoot}/assets/css`))
    .pipe(gulp.browserSync.stream({ once: true }))
    .on('error', handleError);