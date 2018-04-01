import gulp from 'gulp';
import markdown from 'gulp-markdown';

export default function(config) {
    const { srcRoot } = config.get('build');

    const blogsSrc = [`${srcRoot}/blogs/**/*.md`, `!${srcRoot}/blogs/drafts/**/*.md`];

    return gulp.src(blogsSrc, { read: true })
        .pipe(markdown());
}