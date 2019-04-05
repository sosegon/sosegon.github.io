const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browser_sync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const validator = require('gulp-html');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const glob = require('glob');

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

const scriptsLint = () => {
  return gulp
    .src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

const scripts = () => {
  const toJs = browserify({
    extensions: [".jsx"],
    entries: glob.sync(paths.scripts),
    debug: true
  })
  .transform(babelify, {
    presets: ["@babel/preset-env", "@babel/preset-react"]
  })
  .bundle();


  return toJs
      .pipe(source('index.js'))
      .pipe(gulp.dest('./built/js'))
      .pipe(browser_sync.stream());
};

const pages = () => {
  return gulp.src([...paths.pages, './gulpfile.js'])
  .pipe(validator())
  .pipe(gulp.dest('built/'))
  .pipe(browser_sync.stream());
};

const watchFiles = () => {
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, gulp.series(scriptsLint, scripts));
  gulp.watch(paths.pages, pages);
};

const js = gulp.series(scriptsLint, scripts);
const build = gulp.parallel(styles, js, pages);
const watch = gulp.parallel(watchFiles, browserSync);

exports.js = js;
exports.build = build;
exports.watch = watch;
