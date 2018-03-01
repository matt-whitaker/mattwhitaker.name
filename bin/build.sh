#!/bin/bash

if [ "${CIRCLE_BRANCH}" == "master" ]; then
  NODE_ENV=production npm run build
else
  NODE_ENV=qa npm run build
fi

echo "Built site on $CIRCLE_BRANCH"