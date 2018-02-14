import fsPath from 'path';
import Promise from 'bluebird';
import through2 from 'through2';
import uuid from 'uuid';
import AWS from 'aws-sdk';
import config from 'config';
import R from 'ramda';
import postSlack from '../utils/postSlack';
import getFileType from '../utils/getFileType';

const bucket = config.get('aws.s3.bucket');

const ifObjectsToDelete = R.ifElse(
  ({ Delete: { Objects } }) => !Objects.length,
  () => Promise.resolve());

function invalidateCDN () {
  return (new AWS.CloudFront()).createInvalidation({
    DistributionId: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: uuid.v4(),
      Paths: {
        Quantity: 1,
        Items: [ '/*' ]
      }
    }
  }).promise();
}

export default function deploy() {
  const keys = [];
  let promise;

  const s3 = new AWS.S3();

  return through2.obj(function (chunk, enc, next) {
    const {cwd, base, path, history} = chunk;

    const key = fsPath.relative(fsPath.resolve(cwd, 'lib'), path);
    keys.push(key);

    if (!promise) {
      promise = postSlack(`Deployment Started`, postSlack.colors.yellow)
    }

    return promise
      .then(() => getFileType(chunk))
      .then((mime) => ({
        Bucket: bucket,
        Key: key,
        Body: chunk.contents,
        ACL: 'public-read',
        ContentType: mime
      }))
      .then((params) => s3.putObject(params).promise())
      .tap(() => this.push(chunk))
      .tap(() => next())
      .tapCatch(console.error);
  }, function (next) {
    return s3.listObjectsV2({ Bucket: bucket }).promise()
      .then(({ Contents }) => Contents)
      .map(({ Key }) => Key)
      .then(R.difference(R.__, keys))
      .map((Key) => ({ Key }))
      .then((Objects) => ({ Bucket: bucket, Delete: { Objects } }))
      .then(ifObjectsToDelete((params) => s3.deleteObjects(params).promise()))
      .tap(() => postSlack(`Invalidation Started`, postSlack.colors.yellow))
      .tap(invalidateCDN)
      .tap(() => postSlack(`Invalidation Successful`, postSlack.colors.green))
      .tap(() => postSlack(`Deployment Successful`, postSlack.colors.green))
      .tap(() => next())
      .tapCatch(console.error);
  });
};