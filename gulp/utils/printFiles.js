import print from 'gulp-print';
import strip from 'strip-color';
import colors from 'chalk';

const color = colors.keyword('darkkhaki');

export default (scope, command = 'Built') =>
  print((path) =>
    `${color(scope)} ${command} ${color(strip(path))}`);