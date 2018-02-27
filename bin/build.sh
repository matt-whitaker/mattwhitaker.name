if [ "${CIRCLE_BRANCH}" == "master" ]; then
  NODE_ENV=production npm run build
elif [ "${CIRCLE_BRANCH}" == "develop" ]; then
  NODE_ENV=qa npm run build
fi