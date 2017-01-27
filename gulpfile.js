var gulp        = require('gulp');
var gutil       = require('gulp-util');
var uglify      = require('gulp-uglify');
var browserify  = require('browserify');
var sass        = require('gulp-sass');
var source      = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('./src/js/app.source.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('sass', function() {
    gulp.src('./src/scss/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./assets/css'));
    gulp.src('./src/scss/startx/startx.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('js', function() {
    gulp.src('./src/js/startx/startx.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['browserify']);
    gulp.watch('./src/js/startx/*.js', ['js']);
    gulp.watch('./src/js/*/*.js', ['browserify']);
    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/scss/startx/*.scss', ['sass']);
    gulp.watch('./src/scss/startx/*/*.scss', ['sass']);
});

gulp.task('default', ['browserify', 'sass', 'js', 'watch']);
