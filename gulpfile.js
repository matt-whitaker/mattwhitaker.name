require('dotenv').config({});
require('babel-register');
require('babel-polyfill');

const gulp          = require('gulp');
const sequence      = require('gulp-sequence');
const util          = require('gulp-util');
const browserSync   = require('browser-sync').create();
const tasks         = require('./gulp/index');

util.log(`Using environment ${process.env.NODE_ENV || 'development'}`);

gulp.browserSync = browserSync;
gulp.task('_build', tasks.build);
gulp.task('assets', tasks.assets);
gulp.task('clean', tasks.clean);
gulp.task('build', sequence('clean', 'assets', '_build'));
gulp.task('deploy', ['build'], tasks.deploy);
gulp.task('serve', ['build'], tasks.serve);
gulp.task('default', ['serve']);