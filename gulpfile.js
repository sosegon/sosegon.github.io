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
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const paths = {
  styles: 'src/style/**/*.scss',
  scripts: 'src/js/**/*.jsx',
  pages: 'src/*.html',
  fonts: 'src/fonts/*',
  images: 'src/images/*'
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
    .pipe(concat('main.css'))
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
    entries: glob.sync(paths.scripts, {
      "allowEmpty": true
    }),
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
  return gulp.src(paths.pages)
  .pipe(validator())
  .pipe(gulp.dest('./built'))
  .pipe(browser_sync.stream());
};

const fonts = () => {
  return gulp
    .src(paths.fonts)
    .pipe(gulp.dest('./built/fonts'))
    .pipe(browser_sync.stream());
};

const images = () => {
  return gulp
    .src(paths.images)
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./built/images'))
    .pipe(browser_sync.stream());
};

const watchFiles = () => {
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, gulp.series(scriptsLint, scripts));
  gulp.watch(paths.pages, pages);
  gulp.watch(paths.fonts, fonts);
  gulp.watch(paths.images, images);
};

const js = gulp.series(scriptsLint, scripts);
const build = gulp.parallel(styles, js, pages, fonts, images);
const watch = gulp.parallel(watchFiles, browserSync);

exports.js = js;
exports.build = build;
exports.watch = watch;
