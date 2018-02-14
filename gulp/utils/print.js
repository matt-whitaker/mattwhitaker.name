import print from 'gulp-print';
import colors from 'chalk';
import config from 'config';

const color = colors.keyword(config.get('build.taskColorKeyword'));

export default (scope, message) => print((path) => `${color(scope)} ${message}`);