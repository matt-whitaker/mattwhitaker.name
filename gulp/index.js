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

export function config(cfg) {
  util.log(`Using environment ${process.env.NODE_ENV || 'development'}`);

  const bs = browserSync.create();

  gulp.task('html', html(cfg, bs));
  gulp.task('assets', assets(cfg));
  gulp.task('bower', bower(cfg));
  gulp.task('css', css(cfg, bs));
  gulp.task('clean', clean(cfg));
  gulp.task('build', sequence('clean', 'bower', 'assets', 'css', 'html'));

  gulp.task('serve', ['build'], serve(cfg, bs));
  gulp.task('default', ['serve']);
}