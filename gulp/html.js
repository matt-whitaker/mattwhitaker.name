import config           from 'config';
import gulp             from 'gulp';
import htmlmin          from 'gulp-htmlmin';
import beautify         from 'gulp-html-beautify';
import rename           from 'gulp-rename';
import libStream        from './streams/lib';
import templateStream   from './streams/template';
import pagesStream      from './streams/pages';
import render           from './transforms/render';
import handleError      from './utils/handleError';
import printFiles       from './utils/printFiles';

const { dstRoot } = config.get('build');

export default function(bs) {
  return () => {
    return templateStream(libStream())
      .pipe(render(pagesStream()))
      .pipe(rename({ extname: '.html' }))
      .pipe(htmlmin({ removeComments: true }))
      .pipe(beautify())
      .pipe(gulp.dest(dstRoot))
      .pipe(printFiles('html'))
      .pipe(bs.stream({ once: true }))
      .on('error', handleError);
  };
}