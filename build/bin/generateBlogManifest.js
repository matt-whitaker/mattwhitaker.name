const fs = require('fs');
const path = require('path');

const searchDir = 'articles';

const paths = fs.readdirSync(path.join(process.cwd(), searchDir)).map((f) => `${process.cwd()}/${searchDir}/${f}`);

console.log(paths);

const files = paths.map((p) => fs.readFileSync(p));

console.log(files[0].toString());
