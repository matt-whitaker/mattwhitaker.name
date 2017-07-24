require('dotenv').config({ });
const bower         = require('main-bower-files');
const gulp          = require('gulp');
const sequence      = require('gulp-sequence');
const clean         = require('gulp-clean');
const less          = require('gulp-less');
const inject        = require('gulp-inject');
const htmlmin       = require('gulp-htmlmin');
const rename        = require('gulp-rename');
const util          = require('gulp-util');
const mustache      = require('gulp-mustache');
const merge         = require('gulp-merge');
const browserSync   = require('browser-sync').create();
const through2      = require('through2');
const fsPath        = require('path');
const config        = require('config');

const { srvRoot, srcRoot, assetsRoot } = config.get('options');

const renderSite = require('./tasks/render-site');
const deploy = require('./tasks/deploy');

util.log(`Using environment ${process.env.NODE_ENV || 'development'}`);

const port = process.env.PORT || 8080;

const handleError = function (err) {
  util.log(err);
  this.emit('end');
};

gulp.task('deploy', ['build'], () => {
  return gulp.src(`${srvRoot}/**/*.*`)
    .pipe(deploy())
    .on('error', handleError)
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    port,
    injectChanges: true,
    files: `./${srvRoot}/**/*`,
    server: {
      baseDir: `./${srvRoot}`
    }
  });

  gulp.watch(`${srcRoot}/**/*.less`, ['_css']).on('error', handleError);
  gulp.watch(`${srcRoot}/**/*.mustache`, ['_html']).on('error', handleError);
  // gulp.watch(`${srvRoot}/**/*.html`, browserSync.reload).on('error', handleError)
});

gulp.task('clean', () => gulp.src(srvRoot).pipe(clean()));

gulp.task('_bower', () => gulp.src(bower(), { base: 'bower_components' })
  .pipe(gulp.dest(srvRoot)));

gulp.task('_assets', () => gulp.src(`${assetsRoot}/**/*.*`)
  .pipe(gulp.dest(`${srvRoot}/${assetsRoot}`)));

gulp.task('_css', () => gulp.src(`${srcRoot}/less/*.less`)
  .pipe(less().on('error', handleError))
  .pipe(gulp.dest(`${srvRoot}/assets/css`))
  .pipe(browserSync.stream({ once: true }))
  .on('error', handleError));

gulp.task('_html', () => {
  const cssSources = gulp.src(`./${srvRoot}/**/*.css`, { read: false });

  return gulp.src(`${srcRoot}/**/*.mustache`)
    .pipe(renderSite(config.get('context')))
    .pipe(inject(cssSources, { ignorePath: srvRoot }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(srvRoot))
    .pipe(browserSync.stream({ once: true }))
    .on('error', handleError);
});

gulp.task('default', ['serve']);
gulp.task('build', sequence('clean', '_assets', '_bower', '_css', '_html'));