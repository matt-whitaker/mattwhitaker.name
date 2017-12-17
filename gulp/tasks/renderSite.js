import fsPath from 'path';
import R from 'ramda';
import moment from 'moment';
import util from 'gulp-util';
import through2 from 'through2';
import htmlComments from 'html-comments';
import config from 'config';
import React from 'react';
import generateDocument from './../utils/generateDocument';

const log = (msg) => util.log(`[renderSite] ${msg}`);

const isPage = (filename) => filename.startsWith(fsPath.resolve(base, pagesPath));

export default function renderSite (context) {
    const mergeContext = R.merge(context);
    const render = (ctx) => generateDocument(mergeContext(ctx));

    const pages = {};

    return through2.obj(function (file, enc, next) {
        const { base, path } = file;

        file.contents = render('<p>hello :)</p>');

        next();
    })
    //     , function (next) {
    //
    //     R.forEachObjIndexed((file, path) => {
    //         // file.path - the path of the file
    //         // file.contents - the buffer of the file
    //
    //         file.contents = render('<p>hello :)</p>');
    //
    //         this.push(file); // don't forget to put the file back into the pipe
    //     }, [1]);
    //
    //     next();
    // }
};

// const { base, path } = chunk;
//
// const isPage = (filename) => filename.startsWith(fsPath.resolve(base, pagesPath));
// const isBlog = (filename) => filename.startsWith(fsPath.resolve(base, blogPath));
// const isLayout = (filename) => filename.startsWith(fsPath.resolve(base, layoutsPath));
// const isPartial = (filename) => filename.startsWith(fsPath.resolve(base, partialsPath));
//
// if (isPage(path)) {
//     pages[fsPath.relative(fsPath.resolve(base, pagesPath), path)
//         .replace('.mustache', '')] = chunk;
// }
//
// if (isLayout(path)) {
//     layouts[fsPath.relative(fsPath.resolve(base, layoutsPath), path)
//         .replace('.mustache', '')] = chunk;
// }
//
// if (isPartial(path)) {
//     partials[fsPath.relative(fsPath.resolve(base, partialsPath), path)
//         .replace('.mustache', '')] = chunk.contents.toString();
// }
//
// if (isBlog(path)) {
//     blog[fsPath.relative(fsPath.resolve(base, blogPath), path)
//         .replace('.mustache', '')] = chunk.contents.toString();
// }