const R             = require('ramda');
const through2      = require('through2');
const { render }    = require('mustache');
const fsPath        = require('path');
const htmlComments  = require('html-comments');
const config        = require('config');

module.exports = function renderSite (context) {
  const mergeContext = R.merge(context);

  const {
    partials: partialsPath,
    layouts: layoutsPath,
    pages: pagesPath
  } = config.get('build.paths');

  const partials = {};
  const layouts = {};
  const pages = {};

  return through2.obj(function (chunk, enc, next) {
    const { base, path } = chunk;

    const isPage = (filename) => filename.startsWith(fsPath.resolve(base, pagesPath));
    const isLayout = (filename) => filename.startsWith(fsPath.resolve(base, layoutsPath));
    const isPartial = (filename) => filename.startsWith(fsPath.resolve(base, partialsPath));

    if (isPage(path)) {
      pages[fsPath.relative(fsPath.resolve(base, pagesPath), path)
        .replace('.mustache', '')] = chunk;
    }

    if (isLayout(path)) {
      layouts[fsPath.relative(fsPath.resolve(base, layoutsPath), path)
        .replace('.mustache', '')] = chunk;
    }

    if (isPartial(path)) {
      partials[fsPath.relative(fsPath.resolve(base, partialsPath), path)
        .replace('.mustache', '')] = chunk.contents.toString();
    }

    next();
  }, function (next) {
    R.forEachObjIndexed((value) => {
      const pageTemplateBuffer = value.contents;
      const pageTemplate = pageTemplateBuffer.toString();

      const layout = htmlComments.load(pageTemplate, {
        keyword: 'useLayout: ',
        removeKeyword: true
      })[0] || null;

      const title = htmlComments.load(pageTemplate, {
          keyword: 'title: ',
          removeKeyword: true
        })[0] || null;

      const renderedPage = render(pageTemplate, context, partials);

      const data = { $page: renderedPage, $pageTitle: title };

      if (layout) {
        const layoutTemplateBuffer = layouts[layout].contents;
        const layoutTemplate = layoutTemplateBuffer.toString();

        const renderedLayout = render(
          layoutTemplate,
          mergeContext(data),
          partials);

        value.contents = new Buffer.from(renderedLayout);
      } else {
        value.contents = new Buffer.from(renderedPage);
      }

      value.path = value.path.replace(`/${pagesPath}`, '');

      this.push(value);
    }, pages);

    next();
  })
};