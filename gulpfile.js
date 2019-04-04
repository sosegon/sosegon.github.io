const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browser_sync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const validator = require('gulp-html');
const concat = require('gulp-concat');

const paths = {
  styles: 'src/style/**/*.scss',
  scripts: 'src/js/**/*.jsx',
  pages: 'src/**/*.html'
};

const browserSync = (done) => {
  browser_sync.init({
    server: {
      baseDir: './built/'
    },
    port: 3000
  });
  done();
};

const styles = () => {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./built/style'))
    .pipe(browser_sync.stream());
};

const scripts = () => {
  return (
    gulp
      .src([paths.scripts])
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
      .pipe(concat('index.js'))
      .pipe(gulp.dest('./built/js'))
      .pipe(browser_sync.stream())
  );
};

const pages = () => {
  return gulp.src(paths.pages)
  .pipe(validator())
  .pipe(gulp.dest('built/'))
  .pipe(browser_sync.stream());
};

const watchFiles = () => {
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, scripts);
  gulp.watch(paths.pages, pages);
};

const build = gulp.parallel(styles, scripts, pages);
const watch = gulp.parallel(watchFiles, browserSync);

exports.build = build;
exports.watch = watch;
