import gulp from 'gulp';
import sequence from 'gulp-sequence';
import util from 'gulp-util';
import browserSync from 'browser-sync';
import serve from './serve';
import clean from './clean';
import html from './html';
import css from './css';
import assets from './assets';
import bower from './bower';

util.log(`Using environment ${process.env.NODE_ENV || 'development'}`);

const bs = browserSync.create();

gulp.task('html', html(bs));
gulp.task('assets', assets());
gulp.task('bower', bower());
gulp.task('css', css(bs));
gulp.task('clean', clean());
gulp.task('build', sequence('clean', 'bower', 'assets', 'css', 'html'));

gulp.task('serve', ['build'], serve(bs));
gulp.task('default', ['serve']);