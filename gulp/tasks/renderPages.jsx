import fsPath from 'path';
import config from 'config';
import colors from 'colors';
import requireUncached from 'require-uncached';
import R from 'ramda';
import moment from 'moment';
import util from 'gulp-util';
import through2 from 'through2';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import generateDocument from './../utils/generateDocument';
import Shell from './../../src/components/Shell';

const logPrefix = colors.cyan('renderSite')
const log = (msg) => util.log(`${logPrefix} ${msg}`);

const isBlog = ({ path, base }) => base.indexOf('blogs') > -1;
const setBlogPath = (file) => file.path = `${file.base}/blog/${fsPath.basename(file.path)}`;
const fixPath = R.when(isBlog, setBlogPath);

const getProps = (file, { date, ...meta }) => ({
  $site: config.get('site'),
  $page: {
    blog: isBlog(file) ? {
      date: moment.utc(date).format('YYYY-MM-DD'),
    } : null,
    ...meta
  }
});

export default function renderPages(context) {
  const render = R.pipe(ReactDOMServer.renderToStaticMarkup, generateDocument(context));

  return through2.obj(function (file, enc, next) {
    log(`rendering ${colors.cyan(fsPath.relative(`${process.cwd()}/src`, file.path))}`);

    const { default: PageComponent, meta } = requireUncached(file.path);
    const props = getProps(file, meta);

    file.contents = new Buffer.from(render(<Shell {...props} Page={PageComponent} />));

    fixPath(file);
    this.push(file);
    next();
  });
};