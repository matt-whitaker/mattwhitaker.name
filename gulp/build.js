import gulp         from 'gulp';
import inject       from 'gulp-inject';
import htmlmin      from 'gulp-htmlmin';
import beautify     from 'gulp-html-beautify';
import rename       from 'gulp-rename';
import config       from 'config';
import R            from 'ramda';
import mergeStream  from 'merge-stream';
import renderPages  from './streams/renderPages';
import handleError  from './utils/handleError';
import printFiles   from './utils/printFiles'
import css          from './css';
import bower        from './bower';
import pkg          from '../package';

const { srcRoot, dstRoot } = config.get('build');

module.exports = () => {
  const assetsStream = mergeStream(bower(), css());
  const context = R.merge(config.get('site'))({ version: pkg.version });

  const pagesSrc = [`${srcRoot}/pages/**/*.jsx`, `${srcRoot}/pages/**/*.js`];
  const blogsSrc = [`${srcRoot}/blogs/**/*.jsx`, `${srcRoot}/blogs/**/*.js`];
  const draftsSrc = process.env.NODE_ENV === 'production'
    ? []
    : [`${srcRoot}/drafts/**/*.jsx`, `${srcRoot}/drafts/**/*.js`];

  return gulp.src([...pagesSrc, ...blogsSrc, ...draftsSrc])
    .pipe(renderPages(context))
    .pipe(rename({ extname: '.html' }))
    .pipe(inject(assetsStream, { ignorePath: dstRoot }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(beautify())
    .pipe(gulp.dest(dstRoot))
    .pipe(printFiles('html'))
    .pipe(gulp.browserSync.stream({ once: true }))
    .on('error', handleError);
};