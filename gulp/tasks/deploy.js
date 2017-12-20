import fsPath from 'path';
import through2 from 'through2';
import uuid from 'uuid';
import util from 'gulp-util';
import AWS from 'aws-sdk';
import config from 'config';
import R from 'ramda';
import colors from 'colors';
import request from 'request-promise';
import handleError from '../utils/handleError';
import postSlack from '../utils/postSlack';
import getFileType from '../utils/getFileType';

export default function deploy() {
  const keys = [];
  let promise;

  const s3 = new AWS.S3();
  const cloudfront = new AWS.CloudFront();

  return through2.obj(function (chunk, enc, next) {
    const bucket = config.get('aws.s3.bucket');
    const srvRoot = config.get('build.srvRoot');
    const {cwd, base, path, history} = chunk;

    const key = fsPath.relative(fsPath.resolve(cwd, srvRoot), path);
    keys.push(key);

    return (promise || (promise = postSlack(`Deployment Started`, postSlack.colors.yellow)))
      .then(() => getFileType(chunk))
      .then((mime) => ({
        Bucket: bucket,
        Key: key,
        Body: chunk.contents,
        ACL: 'public-read',
        ContentType: mime
      }))
      .tap(({ContentType}) => util.log(`Uploading ${key} as ${ContentType}`))
      .then((params) => s3.putObject(params).promise())
      .tap(() => this.push(chunk))
      .tap(() => next())
      .tapCatch(console.error);
  }, function (next) {
    return postSlack(`Deployment Successful`, postSlack.colors.green)
      .then(R.tap(() => util.log('Invalidating CDN')))
      .then(() => postSlack(`Invalidation Started`, postSlack.colors.yellow))
      .then(
        R.when(() => process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID,
          () => cloudfront.createInvalidation({
            DistributionId: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID,
            InvalidationBatch: {
              CallerReference: uuid.v4(),
              Paths: {
                Quantity: 1,
                Items: [
                  '/*'
                ]
              }
            }
          }).promise()))
      .then(() => postSlack(`Invalidation Successful`, postSlack.colors.green))
      .then(() => next())
      .tapCatch(console.error);
  });
};