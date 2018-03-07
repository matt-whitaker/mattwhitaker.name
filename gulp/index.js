import gulp from 'gulp';
import sequence from 'gulp-sequence';
import util from 'gulp-util';
import browserSync from 'browser-sync';
import config from 'config';
import serve from './serve';
import clean from './clean';
import html from './html';
import css from './css';
import assets from './assets';
import bower from './bower';

util.log(`Using environment ${process.env.NODE_ENV || 'development'}`);

const options = config.get('build');
const bs = browserSync.create();

gulp.task('html', html(options, bs));
gulp.task('assets', assets(options));
gulp.task('bower', bower(options));
gulp.task('css', css(options, bs));
gulp.task('clean', clean(options));
gulp.task('build', sequence('clean', 'bower', 'assets', 'css', 'html'));

gulp.task('serve', ['build'], serve(options, bs));
gulp.task('default', ['serve']);