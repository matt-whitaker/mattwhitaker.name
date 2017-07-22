const R             = require('ramda');
const through2      = require('through2');
const { render }      = require('mustache');
const fsPath        = require('path');
const comments      = require('html-comments');

module.exports = function renderSite (context, config) {
  const { paths: {
    partials: partialsPath,
    layouts: layoutsPath,
    pages: pagesPath
  } = {}} = config;

  const partials = {};
  const layouts = {};
  const pages = {};

  return through2.obj(function (chunk, enc, next) {

    const { cwd, base, path, history } = chunk;

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
    R.forEachObjIndexed((value, key) => {
      const pageTemplateBuffer = value.contents;
      const pageTemplate = pageTemplateBuffer.toString();

      const commands = comments.load(pageTemplate, {
        keyword: 'useLayout: ',
        removeKeyword: true
      });

      const renderedPage = render(pageTemplate, context, partials);

      const fullContext = R.merge(context)({
        $page: renderedPage
      });

      if (commands.length) {
        const layoutTemplateBuffer = layouts[`${commands[0]}`].contents;
        const layoutTemplate = layoutTemplateBuffer.toString();
        console.log(partials);
        const renderedLayout = render(
          layoutTemplate,
          fullContext,
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