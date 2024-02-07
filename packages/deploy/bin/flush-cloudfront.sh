#!/bin/bash

echo "temporarily disabled"
exit 0

# TODO Does Github have environments?
#if [ "${CIRCLE_BRANCH}" == "master" ]; then
#  AWS_CLOUDFRONT_DISTRIBUTION_ID=$AWS_CLOUDFRONT_DISTRIBUTION_ID_PROD
#elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
#  AWS_CLOUDFRONT_DISTRIBUTION_ID=$AWS_CLOUDFRONT_DISTRIBUTION_ID_QA
#else
#  echo "Not a deployment branch"
#  exit 0
#fi

# TODO Can this be installed at the environment level? (ie can we dockerize this process?)
#pip install awscli --upgrade --user && aws --version
#
#aws configure set preview.cloudfront true
#
#echo "Invalidating Cloudfront"
#
#aws cloudfront create-invalidation \
#--distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID \
#--paths "/" \
#>/dev/null

#echo "Invalidated Cloudfront"

# TODO Move to github job config
#echo "Deployed to static site from branch $CIRCLE_BRANCH"