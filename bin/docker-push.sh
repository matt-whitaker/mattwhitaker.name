#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "master" ]; then
  export VERSION=$(node -pe "require('./package.json').version")

  docker push $DOCKER_NAME:master
  echo "Pushed docker master"

  docker push $DOCKER_NAME:$VERSION
  echo "Pushed docker $VERSION"
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  docker push $DOCKER_NAME:develop
  echo "Pushed docker develop"
else
  echo "Not a deployment branch"
fi