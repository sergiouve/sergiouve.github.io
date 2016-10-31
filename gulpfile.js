var gulp        = require('gulp');
var gutil       = require('gulp-util');
var uglify      = require('gulp-uglify');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');

//uglify: minificacion js
gulp.task('uglify', function() {
    // gulp.src('js/app.source.js')
    // .pipe(uglify())
    // .pipe(gulp.dest('js/'));
});

gulp.task('browserify', function() {
    return browserify('js/app.source.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('js/'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['browserify']);
});

// default
gulp.task('default', ['browserify', 'watch']);
