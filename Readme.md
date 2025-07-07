# 技術チャレンジ部 ホームページ

本リポジトリは、技術チャレンジ部の公式ホームページのソースコードです。

## 公開URL

GitHub Pagesで公開: https://challengeclub.github.io/challenge-club-homepage/

## ディレクトリ構成

```text
.
├── activities/        活動紹介ページ（自動運転・CTFなど）
├── posts/             記事（ニュース・お知らせなど）
├── images/            画像ファイルの集約場所（投稿・活動紹介用など）
│   ├── posts/
│   ├── activities/
│   └── common/
├── docs/              ビルド成果物（GitHub Pages 用）
├── _includes/         Eleventy テンプレート共通部品
├── styles/            CSSなどスタイル関連
├── .eleventy.js       Eleventy 設定ファイル
└── その他設定ファイル等
```

## 使用技術

- HTML / CSS（バニラ）
- Eleventy（11ty）を使用
- GitHub Pages によるホスティング
- モバイル対応（レスポンシブデザイン）
- 画像付きカードレイアウト & フォローリンク

## セットアップ

```bash
$ git clone https://github.com/ChallengeClub/challenge-club-homepage.git
$ cd challenge-club-homepage
```
### Eleventy 開発サーバーを起動

以下のコマンドでビルドして、ローカルサーバーが起動します。
ビルド成果物は docs/ に出力されます。
```bash
# 開発用（/posts/ などのリンクが / から始まる場合はこちら）
$ npx @11ty/eleventy --serve

# 本番と同じパス（GitHub Pages の /challenge-club-homepage/ を再現）
$ npx @11ty/eleventy --pathprefix=challenge-club-homepage
```

## 編集・投稿方法（コントリビューション）
新しい記事の投稿や、活動紹介の追加、デザイン修正などにご協力いただける方は、
[CONTRIBUTING.md](CONTRIBUTING.md) をご確認ください。

- 投稿ルール、画像パスのルール、Gitのブランチ運用などを記載しています。
- main ブランチへの直接コミットは禁止しています。ブランチを作成してPRを作成してください。

## お問い合わせ

疑問点や改善案があれば、GitHub の Issue にてご連絡ください。
もしくは、トップページの「お問い合わせ」セクションをご確認ください。

---