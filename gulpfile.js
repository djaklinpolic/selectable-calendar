var gulp = require('gulp');
var browserify = require('gulp-browserify');
var twig = require('gulp-twig');
var sass = require('gulp-sass');
var pkg = require('./package.json');
var opn = require('opn');

gulp.task('compile-twig', function() {
	return gulp.src('test/manual/templates/*.html') 
		.pipe(twig({
			data: {
				main: pkg.main
			}
		}))
		.pipe(gulp.dest('compiled/test/manual/')); 
});
 
gulp.task('compile-scss', function () {
	return gulp.src('test/manual/assets/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('compiled/test/manual/assets/css'));
});

gulp.task('compile-js', function () {
	return gulp.src('index.js')
        .pipe(browserify())
        .pipe(gulp.dest('compiled/lib'))
});
 
gulp.task('watch', function () {
	gulp.watch('test/manual/assets/*.scss', ['compile-scss']);
	gulp.watch('index.js', ['compile-js']);
});

gulp.task('open-test-page', function () {
	opn('compiled/test/manual/index.html');
});

gulp.task('build', ['compile-scss', 'compile-js', 'compile-twig']);
gulp.task('manual-test', ['build', 'open-test-page']);
gulp.task('build-watch', ['build', 'watch']);