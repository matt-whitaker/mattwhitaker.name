import config from 'config';
import gulp from 'gulp';
import clean from 'gulp-clean';

const { srvRoot } = config.get('build');

module.exports = () => gulp.src(srvRoot).pipe(clean());