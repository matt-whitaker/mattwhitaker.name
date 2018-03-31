import fsPath from 'path';
import replaceExt from 'replace-ext';
import toArray from 'stream-to-array';
import Promise from 'bluebird';
import R from 'ramda';
import through2 from 'through2';
import React from 'react';
import { JSDOM } from 'jsdom';
import createHandlebars from './../utils/handlebars';


const getDate = (path) => fsPath.basename(path).split('-').slice(0, 3).join('-');
const stripDate = (path) => path.replace(`${getDate(path)}-`, '');
const sortBlogs = (a, b) => getDate(b.path) > getDate(a.path);
const fixBlogPath = (file) => file.path = `${file.base}/blog/${fsPath.basename(file.path)}`;

export default function render(config, streams) {
  return through2.obj(function(templateFile, enc, next) {
    const template = templateFile.contents.toString();
    const addFile = (file) => this.push(file);

    createHandlebars({
      partials: Promise.resolve(toArray(streams.partials)),
      helpers: Promise.resolve(toArray(streams.helpers))
    })
      .then((handlebars) => {
        return Promise.props({
          pages: Promise.resolve(toArray(streams.pages)),
          blogs: Promise.resolve(toArray(streams.blogs)),
          drafts: Promise.resolve(toArray(streams.drafts))
        })
          .then(({ pages, blogs, drafts }) => {
            const recentBlogs = [...blogs, ...drafts].sort(sortBlogs);

            const blogList = [];

            recentBlogs.forEach((blog) => {
              const date = getDate(blog.path);
              const path = replaceExt(stripDate(fixBlogPath(blog)), '.html');
              const $site = config.get('site');
              const $page = {
                contents: blog.contents.toString(),
                blog: { date }
              };
              const rendered = handlebars.compile(template)({ $page, $site });

              const dom = new JSDOM($page.contents);
              const h1 = dom.window.document.getElementsByTagName('h1')[0];

              blog.contents = Buffer.from(rendered);
              blog.path = path;

              blogList.push({
                url: path.replace(blog.base, ''),
                title: h1.innerHTML
              });

              this.push(blog);
            });

            pages.forEach((page) => {
              const path = replaceExt(page.path, '.html');
              const $site = config.get('site');
              const pageTemplate = page.contents.toString();

              const pageRendered = handlebars.compile(pageTemplate)({ $site, blogs: blogList });

              const $page = {
                contents: pageRendered
              };

              const rendered = handlebars.compile(template)({ $page, $site });

              page.contents = Buffer.from(rendered);
              page.path = path;
              this.push(page);
            })
          })
          .then(() => next());
      })

  });
};
