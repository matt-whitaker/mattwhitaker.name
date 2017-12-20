import gulp         from 'gulp';
import inject       from 'gulp-inject';
import htmlmin      from 'gulp-htmlmin';
import beautify     from 'gulp-html-beautify';
import rename       from 'gulp-rename';
import config       from 'config';
import R            from 'ramda';
import mergeStream  from 'merge-stream';
import renderPages  from './pipes/renderPages';
import handleError  from './utils/handleError';
import printFiles   from './utils/printFiles'
import css          from './css';
import bower        from './bower';
import pkg          from '../package';

module.exports = () => {
  const assetsStream = mergeStream(bower(), css());
  const context = R.merge(config.get('site'))({ version: pkg.version });

  return gulp.src([
    'src/pages/**/*.jsx',
    'src/pages/**/*.js',
    'src/blogs/**/*.jsx',
    'src/blogs/**/*.js'])
    .pipe(renderPages(context))
    .pipe(rename({ extname: '.html' }))
    .pipe(inject(assetsStream, { ignorePath: 'lib' }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(beautify())
    .pipe(gulp.dest('lib'))
    .pipe(printFiles('html'))
    .pipe(gulp.browserSync.stream({ once: true }))
    .on('error', handleError);
};