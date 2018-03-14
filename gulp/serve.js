import gulp from 'gulp';
import handleError from './utils/handleError';

export default function(config, bs) {
  const { dstRoot, srcRoot } = config.get('build');
  const port = process.env.PORT || 8080;

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