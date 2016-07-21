var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');


// Compile Sass
gulp.task('sass', function() {
    return gulp.src('lib/styles/main.scss')
        .pipe(sass())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename('main.min.css'));
});

// Compile, concatenate, & Minify JS
gulp.task('js', function() {
    return gulp.src('lib/**/*.js')
        .pipe(babel({
          plugins: ['babel-plugin-transform-object-assign'],
          presets: ['es2015', 'react']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Copy the font files
gulp.task('fonts', function() {
    return gulp.src(['lib/styles/fonts/icomoon/fonts/**/*'])
        .pipe(gulp.dest('dist/styles/fonts/icomoon/fonts'));
});

// Clean the /dist directory
gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

// Default Task
gulp.task('default', ['sass', 'js', 'fonts']);
