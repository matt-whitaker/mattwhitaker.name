import gulp from 'gulp';
import config from 'config';
import handleError from './utils/handleError';

const port = process.env.PORT || 8080;

const dstRoot = config.get('build.dstRoot');

export default function({ dstRoot }, bs) {
  return () => {
    bs.init({
      port,
      injectChanges: true,
      files: `./${dstRoot}/**/*`,
      server: {
        baseDir: `./${dstRoot}`
      }
    });
    gulp.watch('src/**/*.less', ['css']).on('error', handleError);
    gulp.watch(['src/**/*.jsx', 'src/**/*.js'], ['html']).on('error', handleError);
  };
}