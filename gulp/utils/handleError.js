import util from 'gulp-util';

export default function handleError(err) {
  util.log(err);
  this.emit('end');
};