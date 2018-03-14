import fsPath from 'path';
import toArray from 'stream-to-array';
import Promise from 'bluebird';
import requireUncached from 'require-uncached';
import R from 'ramda';
import mustache from 'mustache';
import moment from 'moment';
import through2 from 'through2';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Shell from './../../src/components/shell';

const isBlog = ({ path, base }) => base.indexOf('blogs') > -1;
const sortBlog = (a, b) => a.date < b.date;
const setBlogPath = R.tap((file) => file.path = `${file.base}/blog/${fsPath.basename(file.path)}`);
const fixPath = R.when(isBlog, setBlogPath);

const getProps = (config, file, { date, ...meta }) => ({
  $site: config.get('site'),
  $page: {
    blog: isBlog(file) ? {
      date: moment.utc(date).format('YYYY-MM-DD'),
    } : null,
    ...meta
  }
});

export default function render(config, pagesStream) {
  return through2.obj(function(templateFile, enc, next) {
    const renderPage = R.pipe(
      ReactDOMServer.renderToString,
      (content) => ({ ...config.get('site'), content }),
      (context) => mustache.render(templateFile.contents.toString(), context)
    );

    let blogs;

    return Promise.resolve(toArray(pagesStream))
      .tap((pages) => {
        blogs = pages.filter(isBlog);
      })
      .map((page) => {
        const { default: PageComponent, meta } = requireUncached(page.path);
        const props = getProps(config, page, meta);
        const rendered = renderPage(<Shell {...props} Page={PageComponent} blogs={blogs} />);

        fixPath(page);
        page.contents = Buffer.from(rendered);
        this.push(page);
      })
      .then(() => next());
  });
};