/**
 * Created by VanGogh on 2017/8/3.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    cleancss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('watchLess', function () {
    gulp.watch('less/**/*.less', function () {
        gulp.src('less/**/*.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css'))
            .pipe(cleancss())
            .pipe(rename(function (path) {
                path.basename += '.min';
            }))
            .pipe(gulp.dest('css'));
    });
});

gulp.task('liveReload', function () {
    livereload.listen();
    gulp.watch(['index.html', 'less/**/*.less'], function (file) {
        livereload.changed(file.path);
    });
});

gulp.task('default', ['watchLess', 'liveReload']);