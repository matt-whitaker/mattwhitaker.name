#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "master" ]; then
  NODE_ENV=production \
  AWS_CLOUDFRONT_DISTRIBUTION_ID=$AWS_CLOUDFRONT_DISTRIBUTION_ID_PROD \
  AWS_S3_BUCKET=$AWS_S3_BUCKET_PROD \
  npm run build

  echo "Deployed to static site from branch master"
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  # NODE_ENV=qa \
  # AWS_CLOUDFRONT_DISTRIBUTION_ID=$AWS_CLOUDFRONT_DISTRIBUTION_ID_QA \
  # AWS_S3_BUCKET=$AWS_S3_BUCKET_QA \
  # npm run deploy


  echo "deploy disabled"
  # echo "Deployed to static site from branch develop"
fi