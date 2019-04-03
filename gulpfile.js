const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const styles = 'src/style/**/*.scss';

gulp.task('styles', () => {
	return gulp.src(styles)
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./built/style'))
		.pipe(browserSync.stream());
});

gulp.task('default', () => {
	gulp.watch(styles, gulp.series('styles'));
	browserSync.init({
		server: './built'
	});
});