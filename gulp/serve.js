import gulp from 'gulp';
import handleError from './utils/handleError';

const port = process.env.PORT || 8080;

module.exports = () => {
  gulp.browserSync.init({
    port,
    injectChanges: true,
    files: './lib/**/*',
    server: {
      baseDir: './lib'
    }
  });
  gulp.watch('src/**/*.less', ['css']).on('error', handleError);
  gulp.watch('src/**/*.jsx', ['html']).on('error', handleError);
};