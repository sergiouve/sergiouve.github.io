const gulp        = require('gulp');
const gutil       = require('gulp-util');
const uglify      = require('gulp-uglify');
const browserify  = require('browserify');
const sass        = require('gulp-sass');
const source      = require('vinyl-source-stream');
const shell       = require('gulp-shell');

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

gulp.task('serve', shell.task([
  'php -S localhost:3000'
]));

gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['browserify']);
    gulp.watch('./src/js/startx/*.js', ['js']);
    gulp.watch('./src/js/*/*.js', ['browserify']);
    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/scss/startx/*.scss', ['sass']);
    gulp.watch('./src/scss/startx/*/*.scss', ['sass']);
});

gulp.task('default', ['browserify', 'sass', 'js', 'serve', 'watch']);
