const fs = require('fs');
const path = require('path');
const gm = require('gray-matter');

const searchDir = path.join(process.cwd(), 'articles');
const outputFile = path.join(searchDir, 'manifest.json');

module.exports = function generateManifest() {
  const articles = fs
    .readdirSync(searchDir)
    .map((f) => `${searchDir}/${f}`)
    .filter((p) => path.extname(p) === '.md')
    .map((p) => fs.readFileSync(p))
    .map((f) => gm(f.toString()).data)
    .sort((dA, dB) => new Date(dB.publishedAt) - new Date(dA.publishedAt));

  const manifest = { articles };

  try {
    fs.mkdirSync(searchDir, { recursive: true });
  } catch {}

  fs.writeFileSync(outputFile, Buffer.from(JSON.stringify(manifest, null, 4)));
};

if (require.main === module) {
  module.exports();
}