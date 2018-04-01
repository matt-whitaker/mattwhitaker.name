import gulp             from 'gulp';
import htmlmin          from 'gulp-htmlmin';
import beautify         from 'gulp-html-beautify';
import rename           from 'gulp-rename';
import libStream        from './streams/lib';
import templateStream   from './streams/template';
import pagesStream      from './streams/pages';
import blogsStream      from './streams/blogs';
import draftsStream     from './streams/drafts';
import partialsStream   from './streams/partials';
import helpersStream    from './streams/helpers';
import render           from './transforms/render';
import handleError      from './utils/handleError';
import printFiles       from './utils/printFiles';

export default function(config, bs) {
  const { dstRoot } = config.get('build');

  const renderStreams = {
    blogs: blogsStream(config),
    drafts: draftsStream(config),
    pages: pagesStream(config),
    partials: partialsStream(config),
    helpers: helpersStream(config)
  };

  return () => {
    return templateStream(config, libStream(config))
      .pipe(render(config, renderStreams))
      .pipe(htmlmin({ removeComments: true }))
      .pipe(beautify())
      .pipe(gulp.dest(dstRoot))
      .pipe(printFiles('html'))
      .pipe(bs.stream({ once: true }))
      .on('error', handleError);
  };
}