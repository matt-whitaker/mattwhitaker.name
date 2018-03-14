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

export default function(config, bs) {
  const { dstRoot } = config.get('build');

  return () => {
    return templateStream(config, libStream(config))
      .pipe(render(config, pagesStream(config)))
      .pipe(rename({ extname: '.html' }))
      .pipe(htmlmin({ removeComments: true }))
      .pipe(beautify())
      .pipe(gulp.dest(dstRoot))
      .pipe(printFiles('html'))
      .pipe(bs.stream({ once: true }))
      .on('error', handleError);
  };
}