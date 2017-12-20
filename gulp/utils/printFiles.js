import print from 'gulp-print';
import strip from 'strip-color';
import colors from 'chalk';
import config from 'config';

const color = colors.keyword(config.get('gulp.taskColorKeyword'));

export default (scope) =>
  print((path) =>
    `${color(scope)} Built ${color(strip(path))}`);