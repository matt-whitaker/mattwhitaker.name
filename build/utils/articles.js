const gm = require('gray-matter');

module.exports.transform = function transform(content) {
  return Promise.resolve(gm(content.toString()).content.trimLeft());
};

module.exports.transformPath = function transformPath(targetPath) {
  return targetPath.replace('.md', '.html');
};
