# 技術チャレンジ部 ホームページ

本リポジトリは、技術チャレンジ部の公式ホームページのソースコードです。

## 公開URL

GitHub Pagesで公開: https://challengeclub.github.io/challenge-club-homepage/

## ディレクトリ構成

```text
challenge-club-homepage/
├── .eleventy.js
├── .gitignore
├── activities/
│   ├── automotive_ai_challenge.md
│   ├── automotive_uxchallenge.md
│   ├── ctf.md
│   ├── isucon.md
│   ├── makerfaire.md
│   ├── programming_contest.md
│   ├── ux.md
│   └── vr.md
├── docs/            ← Eleventy 出力フォルダ
├── images/
│   └── ...
├── _includes/
│   ├── base.njk
│   ├── header.njk
│   └── footer.njk
├── styles/
│   └── style.css
├── package.json
├── package-lock.json
└── README.md
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
$ npm run build      # ビルド成果物は docs/ に出力されます
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
  <meta property="og:image" content="{{ '/images/ogp.png' | url }}">
  <meta property="og:url" content="{{ '/' | url }}">
  ```  
- SNSシェアプレビュー確認:  
  - Facebook Debugger: https://developers.facebook.com/tools/debug/  
  - Twitter Validator: https://cards-dev.twitter.com/validator  

## お問い合わせ

詳細はトップページの「お問い合わせ」セクションをご確認ください。