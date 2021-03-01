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
また、gulp-autoprefixerによって自動でベンダープリフィックスを付与します。
ベンダープリフィックスについては、package.jsonのbrowserslistオプションで定義しています。  
ご自身のプロジェクトに合った設定に変更してやってください。  
<br>
2.gulp画像圧縮スクリプト起動
```
npx gulp imagemin
```  
