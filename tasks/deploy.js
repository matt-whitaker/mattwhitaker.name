const R             = require('ramda');
const through2      = require('through2');
const { render }    = require('mustache');
const gulpUtil      = require('gulp-util');
const fsPath        = require('path');
const comments      = require('html-comments');
const fileType      = require('file-type');
const AWS           = require('aws-sdk');
const Promise       = require('bluebird');
const config        = require('config');

AWS.config.setPromisesDependency(Promise);

const getFileType = (file) => new Promise((res, rej) => {
  const mimeType = fileType(file.contents);

  if (!mimeType || !mimeType.mime) {
    if(fsPath.extname(file.path) === '.html') {
      return res('text/html');
    }

    if(fsPath.extname(file.path) === '.css') {
      return res('text/css');
    }

    console.log(file.path);
    return rej(new Error('MIME could not be parsed'));
  }

  return res(mimeType.mime);
});

module.exports = function renderSite () {
  const options = config.get('options');
  return through2.obj(function (chunk, enc, next) {
    const { bucket, srvRoot } = options;
    const { cwd, base, path, history } = chunk;
    const s3 = new AWS.S3();

    const key = fsPath.relative(fsPath.resolve(cwd, srvRoot), path);

    // next();
    getFileType(chunk)
      .then((mime) => ({
        Bucket: bucket,
        Key: key,
        Body: chunk.contents,
        ACL: 'public-read',
        ContentType: mime
      }))
      .tap(({ ContentType }) => gulpUtil.log(`Uploading ${key} as ${ContentType}`))
      .then((params) => s3.putObject(params).promise())
      .then(() => {
        this.push(chunk);
        next()
      })
      .catch(next);
  });
};