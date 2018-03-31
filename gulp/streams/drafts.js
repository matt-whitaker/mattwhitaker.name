import gulp from 'gulp';
import markdown from 'gulp-markdown';

export default function(config) {
    const { srcRoot } = config.get('build');

    const draftsSrc = process.env.NODE_ENV === 'production'
        ? []
        : [`${srcRoot}/blogs/drafts/**/*.md`];

    return gulp.src(draftsSrc, { read: true })
        .pipe(markdown());
}