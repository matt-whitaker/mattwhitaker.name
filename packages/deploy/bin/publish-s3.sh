#!/bin/bash

echo "temporarily disabled"
exit 0


# TODO Does Github have environments?
if [ "${CIRCLE_BRANCH}" == "master" ]; then
  AWS_S3_BUCKET=$AWS_S3_BUCKET_PROD
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  AWS_S3_BUCKET=$AWS_S3_BUCKET_QA
else
  echo "Not a deployment branch"
  exit 0
fi

# TODO Can this be installed at the environment level? (ie can we dockerize this process?)
pip install awscli --upgrade --user && aws --version

echo "Syncing with S3"

aws s3 sync ./lib s3://$AWS_S3_BUCKET/ \
--delete \
--acl public-read \

echo "Synced with S3"

# TODO Move to github job config
echo "Deployed to static site from branch $CIRCLE_BRANCH"