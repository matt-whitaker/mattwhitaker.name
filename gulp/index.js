import AWS from 'aws-sdk';
import Promise from 'bluebird';
import gulp from 'gulp';
import sequence from 'gulp-sequence';
import util from 'gulp-util';
import browserSync from 'browser-sync';

AWS.config.setPromisesDependency(Promise);

import deploy from './deploy';
import serve from './serve';
import clean from './clean';
import build from './build';
import assets from './assets';

export default function register() {
  util.log(`Using environment ${process.env.NODE_ENV || 'development'}`);

  gulp.browserSync = browserSync.create();
  gulp.task('_build', build);
  gulp.task('assets', assets);
  gulp.task('clean', clean);
  gulp.task('build', sequence('clean', 'assets', '_build'));

  gulp.task('deploy', deploy);

  gulp.task('serve', ['build'], serve);
  gulp.task('default', ['serve']);
}

module.exports = register;