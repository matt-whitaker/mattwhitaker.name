const bower         = require('main-bower-files');
const gulp          = require('gulp');
const sequence      = require('gulp-sequence');
const clean         = require('gulp-clean');
const less          = require('gulp-less');
const inject        = require('gulp-inject');
const htmlmin       = require('gulp-htmlmin');
const mustache      = require('gulp-mustache');
const rename        = require('gulp-rename');
const util          = require('gulp-util');
const browserSync   = require('browser-sync').create();
const R             = require('ramda');
const pkg           = require('./package.json');

const port = process.env.PORT || 8080;
const serveRoot = 'lib';
const srcRoot = 'src';

const handleError = function (err) {
  util.log(err);
  this.emit('end')
};

// Development server
gulp.task('serve', ['build'], () => {
  browserSync.init({
    port,
    injectChanges: true,
    files: `./${serveRoot}/**/*`,
    server: {
      baseDir: `./${serveRoot}`,
      routes: {
        '/bower_components': 'bower_components',
        '/assets': 'assets'
      }
    }
  });

  return gulp.watch([
    `${srcRoot}/**/*.less`,
    `${srcRoot}/**/*.mustache`
  ], ['html'])
    .on('error', handleError);
});

/**
 * Cleans the build
 */
gulp.task('clean', () => gulp.src(serveRoot).pipe(clean()));

/**
 * Compiles less
 */
gulp.task('css', () => gulp.src(`${srcRoot}/less/*.less`)
  .pipe(less().on('error', handleError))
  .pipe(gulp.dest(`${serveRoot}/css`)))
  .on('error', handleError);

/**
 * Build HTML. Depends on bower and css tasks.
 * Triggers browsersync
 */
gulp.task('html', ['css'], () => {
  const bowerSources = gulp.src(bower(), { read: false });
  const cssSources = gulp.src(`./${serveRoot}/**/*.css`, { read: false });

  return gulp.src(`${srcRoot}/*.mustache`)
    .pipe(inject(bowerSources, { name: 'bower' }))
    .pipe(inject(cssSources, { ignorePath: serveRoot }))
    .pipe(mustache(pkg[pkg.name]))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(serveRoot))
    .pipe(browserSync.stream({ once: true }))
    .on('error', handleError);

});

gulp.task('default', ['serve']);
gulp.task('build', sequence('clean', 'html'));