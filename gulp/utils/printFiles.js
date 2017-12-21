import print from 'gulp-print';
import strip from 'strip-color';
import colors from 'chalk';
import config from 'config';

const color = colors.keyword(config.get('build.taskColorKeyword'));

export default (scope, command = 'Built') =>
  print((path) =>
    `${color(scope)} ${command} ${color(strip(path))}`);