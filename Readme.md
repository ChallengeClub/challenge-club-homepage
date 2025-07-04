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
├── posts/
│   ├── index.md
│   ├── news-YYYY-MM-DD.md
│   └── ...
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

## 公開・運用

### デプロイ運用について（Deploy from a branch）

- メインブランチ `main` から GitHub Pages に直接公開  
- `docs/` フォルダを公開対象として指定  
- **GitHub Actions により、mainブランチへのpushまたはPRに応じて自動ビルド＆docs/を更新するCI/CDを構築済み**

GitHub Actions により、`main`ブランチへの push または PR 時に自動で以下を実行し、`docs/`を更新・公開しています。
そのため、通常はローカルで以下を実行する必要はありません。

### タグ付けルール

- `tags: [タグ1, タグ2, ...]` の形式で1〜3個のタグをつけてください。タグの上限はありません。
- 以下の推奨タグリストを参考にしつつ、内容に応じて柔軟に判断してください。

#### 推奨タグ一覧

- 活動の分類：ニュース, お知らせ, 活動報告
- テーマ：自動運転, ISUCON, CTF, メイカー, プログラミングコンテスト, VR
- 種別：LT会, 読書会, ハッカソン, 勉強会, プロジェクト, コンテスト

## SEO対策

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
---