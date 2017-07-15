const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();

const port = process.env.PORT || 8080;
const serveRoot = './lib';

// Static server
gulp.task('serve', ['html', 'sass'], function() {
  browserSync.init({
    port,
    injectChanges: true,
    files: `${serveRoot}/**/*`,
    server: {
      baseDir: `${serveRoot}`
    }
  });

  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
  // gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('lib/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('lib'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);