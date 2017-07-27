const through2      = require('through2');
const util          = require('gulp-util');
const fsPath        = require('path');
const request       = require('request-promise');
const comments      = require('html-comments');
const AWS           = require('aws-sdk');
const Promise       = require('bluebird');
const config        = require('config');
const colors        = require('colors');
const handleError   = require('../../utils/handleError');
const postSlack     = require('../../utils/postSlack');
const getFileType   = require('../../utils/getFileType');

AWS.config.setPromisesDependency(Promise);

module.exports = function deploy () {
  const keys = [];
  let promise;

  return through2.obj(function (chunk, enc, next) {
    const bucket = config.get('aws.s3.bucket');
    const srvRoot = config.get('build.srvRoot');
    const { cwd, base, path, history } = chunk;
    const s3 = new AWS.S3();

    const key = fsPath.relative(fsPath.resolve(cwd, srvRoot), path);
    keys.push(key);

    // next();
    (promise || (promise = postSlack(`Deployment Started`, postSlack.colors.yellow)))
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
    postSlack(`Deployment Successful`, postSlack.colors.green)
      .then(() => next());
  });
};