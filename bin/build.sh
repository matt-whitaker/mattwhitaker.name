#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "master" ]; then
  NODE_ENV=production npm run build

  echo "Built site on master"
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  NODE_ENV=qa npm run build

  echo "Built site on develop"
fi