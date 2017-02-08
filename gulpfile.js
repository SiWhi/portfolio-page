// npm init - enter details
// npm install --save-dev gulp
// npm install gulp-sass browser-sync gulp-imagemin gulp-cache gulp-autoprefixer run-sequence del --save-dev

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('sass', function() {
	gulp.src('app/scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('autoprefixer', function() {
	return gulp.src('app/css/styles.css')
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('app/css'))
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('default', function(callback) {
	runSequence('clean:dist',
		['sass', 'images', 'autoprefixer'],
		callback
	);
});

gulp.task('images', function (){
	return gulp.src('app/img/**/*.+(png|jpg|gif|svg')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});