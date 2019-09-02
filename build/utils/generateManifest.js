const fs = require('fs');
const path = require('path');
const gm = require('gray-matter');

const searchDir = path.join(process.cwd(), 'articles');
const outputFile = path.join(searchDir, 'manifest.json');

/**
 * Generates a list of published articles based on the metadata ("front-matter")
 * in the files.
 *
 * @returns {object} Manifest with articles, paths, and an index
 */
module.exports = function generateManifest() {
  const articles = fs
    .readdirSync(searchDir)
    .map((f) => `${searchDir}/${f}`)
    .filter((p) => path.extname(p) === '.md')
    .map((p) => ({ p, f: fs.readFileSync(p) }))
    .map(({ p, f }) => ({ f, s: path.basename(p, '.md') }))
    .map(({ f, s: slug }) => ({ slug, ...gm(f.toString()).data }))
    .filter((d) => !!d.publishedAt)
    .sort((dA, dB) => new Date(dB.publishedAt) - new Date(dA.publishedAt));

  // TODO fix data formatting issue or make sure it renders correctly

  return { articles };
};

/**
 * Allow to be run as a script
 */
if (require.main === module) {
  const manifest = module.exports();

  try {
    fs.mkdirSync(searchDir, { recursive: true });
  } catch {}

  fs.writeFileSync(outputFile, Buffer.from(JSON.stringify(manifest, null, 4)));
}
