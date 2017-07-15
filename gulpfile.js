const gulp = require('gulp');
const less = require('gulp-less');
const inject = require('gulp-inject');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

const port = process.env.PORT || 8080;
const serveRoot = 'lib';
const srcRoot = 'src';

// Static server
gulp.task('serve', ['index', 'less'], function() {
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
    `${srcRoot}/**/*.html`
  ], ['index']);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', () => {
  return gulp.src(`${srcRoot}/less/**/*.less`)
    .pipe(less())
    .pipe(gulp.dest(`${serveRoot}/css`));
});

gulp.task('index', ['less'], () => {

  const sources = gulp.src([`./${serveRoot}/**/*.css`], {read: false});

  return gulp.src(`${srcRoot}/index.html`)
    .pipe(inject(sources, { ignorePath: serveRoot }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(gulp.dest(serveRoot))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);