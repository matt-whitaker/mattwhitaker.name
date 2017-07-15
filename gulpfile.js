const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();

const port = process.env.PORT || 8080;
const serveRoot = './src';

// Static server
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    port,
    injectChanges: true,
    files: `${serveRoot}/**/*`,
    server: {
      baseDir: `${serveRoot}`
    }
  });

  gulp.watch("src/**/*.scss", ['sass']);
  gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);