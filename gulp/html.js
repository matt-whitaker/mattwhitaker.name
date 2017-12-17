import gulp from 'gulp';
import inject from 'gulp-inject';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import merge from 'gulp-merge';
import browserSync from 'browser-sync';
import config from 'config';
import R from 'ramda';
import renderSite from './tasks/renderSite';
import handleError from './utils/handleError';
import pkg from '../package';

const { srvRoot, srcRoot } = config.get('build');

module.exports = () => {
  const cssSources = gulp.src(`./${srvRoot}/**/*.css`, { read: false });

  const { version } = pkg;

  const context = R.merge(config.get('site'))({
    version
  });

  return gulp.src(`${srcRoot}/**/*.mustache`)
    .pipe(renderSite(context))
    .pipe(inject(cssSources, { ignorePath: srvRoot }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(srvRoot))
    .pipe(browserSync.stream({ once: true }))
    .on('error', handleError);
};