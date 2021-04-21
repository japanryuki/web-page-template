// gulpプラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const sassPrefix = require("gulp-autoprefixer");

const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
const keepfolder = require("imagemin-keep-folder");

const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

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

// style.scssタスクを作成する
gulp.task("scss", function () {
  return gulp.watch("scss/**/*.scss", function () {
    return gulp
      .src("scss/style.scss")
      .pipe(sassGlob())
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(sassPrefix())
      .on("error", sass.logError)
      .pipe(gulp.dest("css"));
  });
});

//画像圧縮
gulp.task("imagemin", function () {
  return gulp
    .src("./img/**/*.+(jpg|jpeg|png|gif|svg)")
    .pipe(changed("./img"))
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest("./img"));
});

gulp.task("js", function () {
  return gulp
    .src(["./lib/js/jquery.min.js"])
    .pipe(concat("vendor.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./js"));
});

gulp.task("css", function () {
  return gulp
    .src("./lib/css/*.css")
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest("./css"));
});
