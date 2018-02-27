if [ "${CIRCLE_BRANCH}" == "master" ]; then
  export VERSION=$(node -pe "require('./package.json').version")
  docker tag $DOCKER_NAME $DOCKER_NAME:master
  docker tag $DOCKER_NAME $DOCKER_NAME:$VERSION
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  docker tag $DOCKER_NAME $DOCKER_NAME:develop
fi