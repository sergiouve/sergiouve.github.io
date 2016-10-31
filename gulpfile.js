var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var browserify = require('browserify');

//uglify: minificacion js
gulp.task('uglify', function() {

    gulp.src('js/app.source.js');
    .pipe(uglify())
    .pipe(gulp.dest('js/app.js'));
});

gulp.task('browserify', function() {

    return browserify('./includes/templates/js-source/assets.js')
        .bundle()
        .pipe(source('assets.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./includes/templates/assets/js/'));
});

//whatch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('includes/templates/js-source/**/*.js', ['browserify-main', 'uglify']).on('change', livereload.changed);
});

//default
gulp.task('default', ['browserify-assets', 'assets-css', 'browserify-main', 'uglify', 'sass', 'watch']);