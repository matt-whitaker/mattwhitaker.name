#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "master" ]; then
  AWS_S3_BUCKET=$AWS_S3_BUCKET_PROD
  AWS_CLOUDFRONT_DISTRIBUTION_ID=$AWS_CLOUDFRONT_DISTRIBUTION_ID_PROD
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  AWS_S3_BUCKET=$AWS_S3_BUCKET_QA
  AWS_CLOUDFRONT_DISTRIBUTION_ID=$AWS_CLOUDFRONT_DISTRIBUTION_ID_QA
else
  echo "Not a deployment branch"
  exit 0
fi

pip install awscli --upgrade --user && aws --version

echo "Syncing with S3"

aws s3 sync ./lib s3://$AWS_S3_BUCKET/ \
--delete \
--acl public-read \

echo "Synced with S3"

aws configure set preview.cloudfront true

echo "Invalidating Cloudfront"

aws cloudfront create-invalidation \
--distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID \
--paths "/" \
>/dev/null

echo "Invalidated Cloudfront"

echo "Deployed to static site from branch $CIRCLE_BRANCH"