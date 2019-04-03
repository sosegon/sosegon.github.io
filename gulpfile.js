const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

const stylesPath = 'src/style/**/*.scss';
const scriptsPath = 'src/js/**/*.js';

gulp.task('styles', () => {
  return gulp.src(stylesPath)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./built/style'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return (
    gulp
      .src([scriptsPath])
      // eslint() attaches the lint output to the eslint property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failOnError last.
      .pipe(eslint.failOnError())
      .pipe(babel({
        presets: ["@babel/preset-env", "@babel/preset-react"]
      }))
      .pipe(gulp.dest('./built/js'))
  );
});

gulp.task('default', () => {
  gulp.watch(stylesPath, gulp.series('styles'));
  gulp.watch(scriptsPath, gulp.series('scripts'));

  browserSync.init({
    server: './built'
  });
});