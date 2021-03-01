// gulpプラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const sassPrefix = require("gulp-autoprefixer");

const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');

// style.scssタスクを作成する
gulp.task("scss", function () {
  return gulp.watch("scss/**/*.scss", function () {
    return (
      gulp
        .src("scss/style.scss")
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(sassPrefix())
        .on("error", sass.logError)
        .pipe(gulp.dest("css"))
    );
  });
});

//画像圧縮
gulp.task("imagemin", function () {
  return gulp
    .src('./img/**')
    .pipe(changed('./img'))
    .pipe(
      imagemin([
        pngquant({
          quality: [.60, .70], // 画質
          speed: 1 // スピード
        }),
        mozjpeg({ quality: 65 }), // 画質
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle({ optimizationLevel: 3 }) // 圧縮率
      ])
    )
    .pipe(gulp.dest('./img'));
});
