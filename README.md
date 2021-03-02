# web-page-template
LPなどの簡単なwebページを作成する際に使用するテンプレートプロジェクトです。

# background  
「めんどくさい」と「悩み・迷い」を消すことが、プログラミングスピードを上げる最高の手段であると僕は考える。特段、開発環境作成においては、その時間の浪費はとても無駄だし、やり方を忘れがちだ。ならgit cloneなる偉大な呪文で一瞬で構築してしまえばいいではないか？そんな自堕落な思いからこのリポジトリは作られたのである。余談ですが、このREADMEを記すことも些か面倒だと感じてしまうレベルで僕は自堕落です。

# Installation  
インストール
```
git clone https://github.com/japanryuki/web-page-template.git
```
必要なパッケージなどの導入
```
npm install
```

# Usage  
1.gulpコンパイルスクリプト起動
```
npx gulp sass
```
常時scssファイルの変更をwatchし、変更を保存したタイミングでコンパイルしてくれます。  
gulp-sass-globにより、globパターンを使用したコンパイルが可能です。  
また、gulp-autoprefixerによって自動でベンダープリフィックスを付与します。
ベンダープリフィックスについては、package.jsonのbrowserslistオプションで定義しています。  
ご自身のプロジェクトに合った設定に変更してやってください。  
<br>
2.gulp画像圧縮スクリプト起動
```
npx gulp imagemin
```  
変更されている画像のみ、圧縮します。  
デフォルトで./imgフォルダを参照するようにしています。
フォルダ名を変更したい場合や、圧縮前と圧縮後でフォルダを分割したい場合は、gulpfile.jsの以下を変更してください。  

```javascript
gulp.task("imagemin", function () {
  return gulp
    .src('./img/**') //1.圧縮
    .pipe(changed('./img')) //2.変更チェック
    .pipe(
      imagemin([
        pngquant({
          quality: [.60, .70], 
          speed: 1 
        }),
        mozjpeg({ quality: 65 }), 
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle({ optimizationLevel: 3 })
      ])
    )
    .pipe(gulp.dest('./img'));//3.出力先
});
```
3.scssディレクトリの構成  
- base  
ベースとなるスタイルを定義するscssファイルを格納します。デフォルトの_reset.scssファイルは [A Modern CSS Reset](https://github.com/hankchizljaw/modern-css-reset)を独自に改良したものとなっています。  
- module  
各セクションごとのスタイルを定義するファイルを格納します。例えば_header.scss、_footer.scssなどを格納する想定です。  
- setting  
ページ共通で使用される値などを定義したファイル、mixinを定義するファイルを格納します。  
- style.scss  
以上の全てのファイルをimportします。  

プロジェクトの規模が違ったり、構成が気に入らなかったりした場合は、その理由に合わせてディレクトリをいじっちゃってください。
