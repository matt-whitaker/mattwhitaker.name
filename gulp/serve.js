import gulp from 'gulp';
import config from 'config';
import handleError from './utils/handleError';

const port = process.env.PORT || 8080;

const { dstRoot, srcRoot } = config.get('build');

export default function(bs) {
  return () => {
    bs.init({
      port,
      injectChanges: true,
      files: `./${dstRoot}/**/*`,
      server: {
        baseDir: `./${dstRoot}`
      }
    });

    gulp.watch(`${srcRoot}/**/*.less`, ['css']).on('error', handleError);
    gulp.watch([`${srcRoot}/**/*.jsx`, `${srcRoot}/**/*.js`], ['html']).on('error', handleError);
  };
}