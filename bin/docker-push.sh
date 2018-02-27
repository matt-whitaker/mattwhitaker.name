#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "master" ]; then
  export VERSION=$(node -pe "require('./package.json').version")
  docker push $DOCKER_NAME:master
  docker push $DOCKER_NAME:$VERSION
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  docker push $DOCKER_NAME:develop
fi