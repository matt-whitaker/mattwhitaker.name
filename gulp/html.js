import gulp from 'gulp';
import inject from 'gulp-inject';
import htmlmin from 'gulp-htmlmin';
import beautify from 'gulp-html-beautify';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import config from 'config';
import R from 'ramda';
import renderPages from './tasks/renderPages';
import handleError from './utils/handleError';
import pkg from '../package';

module.exports = () => {
  const cssSources = gulp.src('./lib/**/*.css', { read: false });

  const { version } = pkg;

  const context = R.merge(config.get('site'))({
    version
  });

  return gulp.src([
    'src/pages/**/*.jsx',
    'src/pages/**/*.js',
    'src/blogs/**/*.jsx',
    'src/blogs/**/*.js'])
    .pipe(renderPages(context))
    .pipe(rename({ extname: '.html' }))
    .pipe(inject(cssSources, { ignorePath: 'lib' }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(beautify())
    .pipe(gulp.dest('lib'))
    .pipe(browserSync.stream({ once: true }))
    .on('error', handleError);
};