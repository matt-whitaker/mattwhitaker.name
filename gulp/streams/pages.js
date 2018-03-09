import gulp from 'gulp';
import config from 'config';

const { srcRoot } = config.get('build');


export default function() {
  const pagesSrc = [`${srcRoot}/pages/**/*.jsx`, `${srcRoot}/pages/**/*.js`];
  const blogsSrc = [`${srcRoot}/blogs/**/*.jsx`, `${srcRoot}/blogs/**/*.js`];
  const draftsSrc = process.env.NODE_ENV === 'production'
    ? [`!${srcRoot}/blogs/drafts/**/*.jsx`, `!${srcRoot}/blogs/drafts/**/*.js`]
    : [];

  return gulp.src([...pagesSrc, ...blogsSrc, ...draftsSrc], { read: false });
}