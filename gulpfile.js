const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const styles = 'src/style/**/*.scss';

gulp.task('styles', () => {
	return gulp.src(styles)
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./built/style'));
});

gulp.task('watch', () => {
	gulp.watch(styles, ['styles']);
});