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


  aws s3 sync ./lib s3://$AWS_S3_BUCKET_QA/ \
    --delete \
    --acl public-read

  aws cloudfront create-invalidation \
    --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID_QA \
    --paths /*

  # echo "Deployed to static site from branch develop"
fi