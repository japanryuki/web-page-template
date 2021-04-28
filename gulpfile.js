// gulpプラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const packageImporter = require("node-sass-package-importer");
const sassGlob = require("gulp-sass-glob");
const sassPrefix = require("gulp-autoprefixer");

const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

const cleancss = require("gulp-clean-css");
const uglify = require("gulp-uglify");

const browserify = require("browserify");
const source = require("vinyl-source-stream");

const imageminOption = [
  pngquant({ quality: [0.65, 0.8] }),
  mozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 3,
    colors: 256,
  }),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo(),
];

function scss() {
  return gulp.watch("scss/**/*.scss", function () {
    return gulp
      .src("scss/bundle.scss")
      .pipe(sassGlob())
      .pipe(
        sass({
          outputStyle: "expanded",
          importer: packageImporter({
            extensions: [".scss", ".css"],
          }),
        })
      )
      .pipe(sassPrefix())
      .on("error", sass.logError)
      .pipe(gulp.dest("css"));
  });
}

exports.scss = scss;

function js() {
  return gulp.watch("js/common.js", function () {
    return browserify({ entries: "./js/common.js", debug: true })
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("./js"));
  });
}

exports.js = js;

function imgmin() {
  return gulp
    .src("./img/**/*.+(jpg|jpeg|png|gif|svg)")
    .pipe(changed("./img"))
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest("./dist/img"));
}

function htmlcopy() {
  return gulp.src("./index.html").pipe(gulp.dest("./dist"));
}

function jsbuild() {
  return gulp.src("./js/bundle.js").pipe(uglify()).pipe(gulp.dest("./dist/js"));
}

function cssbuild() {
  return gulp
    .src("./css/bundle.css")
    .pipe(cleancss())
    .pipe(gulp.dest("./dist/css"));
}

exports.build = gulp.series(jsbuild, cssbuild, htmlcopy, imgmin);
