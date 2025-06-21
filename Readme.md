# 技術チャレンジ部 ホームページ

本リポジトリは、技術チャレンジ部の公式ホームページのソースコードです。

## 公開URL

GitHub Pagesで公開。  
[https://challengeclub.github.io/challenge-club-homepage/](https://challengeclub.github.io/challenge-club-homepage/)

## ディレクトリ構成

```text
challenge-club-homepage/
├── index.html
├── README.md
├── images/
│   ├── challenge-club-pc.png
│   ├── challenge-club-backpanel.png
│   └── ...
├── styles/
│   └── style.css
├── activities/
│   └── ...
├── _includes/
│   └── base.njk, header.njk, footer.njk
├── .eleventy.js
├── .gitignore
├── package.json
└── tests/
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
$ npm install
$ npx @11ty/eleventy --serve
```

## ローカルで実行・編集
```bash
$ npm run build
$ npm run start
```

## 公開・運用・SEO対策

### デプロイ運用について（Deploy from a branch）

- メインブランチ `main` から GitHub Pages に直接公開  
- ルートディレクトリを指定  
- GitHub Actions は現在使用していません（必要に応じて今後導入可能）

### OGP画像を設定するには

- `images/ogp.png` に OGP 用画像を設置（推奨サイズ：1200×630）  
- `<head>` 内に以下を追加:  
  ```html
  <meta property="og:image" content="https://challengeclub.github.io/challenge-club-homepage/images/ogp.png">
  <meta property="og:url" content="https://challengeclub.github.io/challenge-club-homepage/">
  ```  
- SNSシェアプレビュー確認:  
  - Facebook Debugger: https://developers.facebook.com/tools/debug/  
  - Twitter Validator: https://cards-dev.twitter.com/validator  

## お問い合わせ

詳細はトップページの「お問い合わせ」セクションをご確認ください。