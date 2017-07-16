const gulp          = require('gulp');
const less          = require('gulp-less');
const inject        = require('gulp-inject');
const htmlmin       = require('gulp-htmlmin');
const mustache      = require('gulp-mustache');
const rename        = require('gulp-rename');
const browserSync   = require('browser-sync').create();
const pkg           = require('./package.json');

const port = process.env.PORT || 8080;
const serveRoot = 'lib';
const srcRoot = 'src';

// Static server
gulp.task('serve', ['html'], function() {
  browserSync.init({
    port,
    injectChanges: true,
    files: `./${serveRoot}/**/*`,
    server: {
      baseDir: `./${serveRoot}`
    }
  });

  gulp.watch([
    `${srcRoot}/**/*.less`,
    `${srcRoot}/**/*.mustache`
  ], ['html']);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('css', () => {
  return gulp.src(`${srcRoot}/less/**/*.less`)
    .pipe(less())
    .pipe(gulp.dest(`${serveRoot}/css`));
});

gulp.task('html', ['css'], () => {
  const sources = gulp.src(`./${serveRoot}/**/*.css`, {read: false});

  return gulp.src(`${srcRoot}/**/*.mustache`)
    .pipe(inject(sources, { ignorePath: serveRoot }))
    .pipe(mustache(pkg[pkg.name]))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(serveRoot))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);