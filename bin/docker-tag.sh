#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "master" ]; then
  export VERSION=$(node -pe "require('./package.json').version")

  docker tag $DOCKER_NAME $DOCKER_NAME:master
  echo "Tagged docker with master"

  docker tag $DOCKER_NAME $DOCKER_NAME:$VERSION
  echo "Tagged docker with $VERSION"

elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  docker tag $DOCKER_NAME $DOCKER_NAME:develop
  echo "Tagged docker with develop"
else
  echo "Not a deployment branch"
fi