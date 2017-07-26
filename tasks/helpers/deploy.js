const through2      = require('through2');
const util          = require('gulp-util');
const fsPath        = require('path');
const request       = require('request-promise');
const comments      = require('html-comments');
const fileType      = require('file-type');
const AWS           = require('aws-sdk');
const Promise       = require('bluebird');
const config        = require('config');
const handleError   = require('./handleError');

AWS.config.setPromisesDependency(Promise);

const yellow = '#aaaaaa';
const green = '#aaaaaa';
const red = '#333333';
const black = '#000000';
const env = process.env.NODE_ENV || 'development';
const { channel, username } = config.get('slack');

const makeSlack = (message, color = black) => ({
  attachments:[
    {
      fallback: message,
      text: message,
      channel,
      username,
      color,
      fields: [
        {
          title: 'Environment',
          value: env
        }
      ]
    }
  ]
});

const postSlack = (message) => request.post({
  uri: process.env.SLACK_WEBHOOK_URL,
  body: JSON.stringify(makeSlack(message))
});

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

module.exports = function deploy () {
  const options = config.get('options');

  const keys = [];
  let promise;

  return through2.obj(function (chunk, enc, next) {
    const { bucket, srvRoot } = options;
    const { cwd, base, path, history } = chunk;
    const s3 = new AWS.S3();

    const key = fsPath.relative(fsPath.resolve(cwd, srvRoot), path);
    keys.push(key);

    // next();
    (promise || (promise = postSlack(`Deployment Started`, yellow)))
      .then(() => getFileType(chunk))
      .then((mime) => ({
        Bucket: bucket,
        Key: key,
        Body: chunk.contents,
        ACL: 'public-read',
        ContentType: mime
      }))
      .tap(({ ContentType }) => util.log(`Uploading ${key} as ${ContentType}`))
      .then((params) => s3.putObject(params).promise())
      .then(() => {
        this.push(chunk);
        next()
      })
      .catch(util.error);
  }, function (next) {
    // const listText = keys.reduce((text, key) => text + `[Uploaded] ${key}\n`, '');
    postSlack(`Deployment Successful`, green)
      .then(() => next());
  });
};