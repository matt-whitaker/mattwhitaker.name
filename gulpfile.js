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

const pkg = require('./package.json');

const renderSite = require('./tasks/render-site');

const port = process.env.PORT || 8080;
const serveRoot = 'lib';
const srcRoot = 'src';

const partialsPath = 'partials';
const layoutsPath = 'layouts';
const pagesPath = 'pages';


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


gulp.task('html', ['css'], () => {
  const bowerSources = gulp.src(bower(), { read: false });
  const cssSources = gulp.src(`./${serveRoot}/**/*.css`, { read: false });

  const context = pkg[pkg.name];

  return gulp.src(`${srcRoot}/**/*.mustache`)
    .pipe(renderSite(context, { paths: {
      partials: partialsPath,
      layouts: layoutsPath,
      pages: pagesPath } }))
    .pipe(inject(bowerSources, { name: 'bower' }))
    .pipe(inject(cssSources, { ignorePath: serveRoot }))
    .pipe(htmlmin({ removeComments: true }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(serveRoot))
    .pipe(browserSync.stream({ once: true }))
    .on('error', handleError);
});

gulp.task('default', ['serve']);
gulp.task('build', sequence('clean', 'html'));