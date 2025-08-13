# CONTRIBUTING.md

技術チャレンジ部 ホームページの編集ガイドです。

このドキュメントでは、開発・運用ルール、投稿方法、画像管理、ローカル環境構築の手順などをまとめています。

---

## 1. ディレクトリ構成

```
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

- 画像は `images/` 以下に整理してください。
- `docs/` はビルド成果物です。直接編集しないでください。

---
## 2. ローカル開発環境の構築

### セットアップ
```bash
git clone https://github.com/ChallengeClub/challenge-club-homepage.git
cd challenge-club-homepage
npm install
```
### 開発サーバー起動
```bash
npx @11ty/eleventy --serve
```

---

## 3. リポジトリ運用ルール（Git の作業フロー）

### 基本ルール

- **`main` ブランチを直接編集せず、必ずブランチを切って Pull Request（PR）を作成してください。**
- 作成したブランチは、作業完了後に不要であれば削除してください（方法は後述）。

### デプロイ運用について（Deploy from a branch）
- メインブランチ `main` から GitHub Pages に直接公開しています。
- `docs/` フォルダを公開対象として指定
- **GitHub Actions により、mainブランチへのpushまたはPRに応じて自動ビルド＆docs/を更新するCI/CDを構築済み**

---

### ブランチ命名ルール（例）

用途に応じて、以下のように接頭辞をつけてください。あくまでも一例なので、厳密に守らなくても大丈夫です。

| 作業内容     | ブランチ名の例             |
|--------------|----------------------------|
| 機能追加     | `feature/add-activity-page` |
| バグ修正     | `fix/incorrect-path`        |
| ドキュメント | `doc/update-contributing`   |

---

### 作業手順の例

```bash
# メインブランチを最新化
git pull origin main

# ブランチを作成して移動
git checkout -b feature/add-activity-ctf

# 編集・追加・移動などの作業

# 変更の確認とステージング
git status
git add 
git commit -m "feat:CTF活動紹介ページと画像を追加"

# GitHub にプッシュ
git push origin feature/add-activity-ctf
```
`main`ブランチが更新されたら、変更分を都度マージしてください。
```bash
git checkout main
git pull origin main
git checkout feature/add-activity-cft
git merge main
```

---

### プルリクエスト作成

- GitHub 上で PR を作成し、**変更内容の要約・背景・目的** を記載してください。
- レビュー後に `main` ブランチへマージされます。
- マージ後、関連するローカル・リモートの作業ブランチは削除してください。

---

### ブランチの削除方法
作成したブランチは、作業完了後に不要であれば削除してください
- ローカルブランチの削除
```bash
git branch -d feature/add-activity-ctf
```
※ 強制的に削除する場合は `-D` オプションを使用（未マージの変更があるとき）

- リモートブランチの削除（GitHub 上）
```bash
git push origin --delete feature/add-activity-ctf
```
もしくは、GitHub の PR 画面やブランチ一覧から手動で削除可能です。

---

## 4. 投稿方法（`posts/` ディレクトリ）

### 投稿ファイルの作成
- `posts/news-YYYY-MM-DD-title.md` のようなファイル名で作成します。

### Frontmatter 記述例
```markdown
---
title: "記事タイトル"
date: 2025-07-05
tags: [ニュース, CTF]
layout: base.njk
---
```

### タグ付けルール

- `tags: [タグ1, タグ2, ...]` の形式で1〜3個のタグをつけてください。タグの上限はありません。
- 以下の推奨タグリストを参考にしつつ、内容に応じて柔軟に判断してください。

#### 推奨タグ一覧

- 活動の分類：ニュース, お知らせ, 活動報告
- テーマ：自動運転, ISUCON, CTF, メイカー, プログラミングコンテスト, VR
- 種別：LT会, 読書会, ハッカソン, 勉強会, プロジェクト, コンテスト

### 画像の追加方法

- `images/posts/` に画像ファイルを配置
- Markdown 内で以下のように参照

```markdown
![説明文]({{ '/images/[画像パス.png]' | url }})
```

- キャプションを表示する場合は以下のように記載してください。
```markdown
<figure>
  <img src="{{ '/images/activities/automotive_uxchallenge.png' | url }}"
       alt="決勝大会の様子"
       title="2025/2/15(土)に開催された決勝大会でのプレゼンの様子"
       width="600">
  <figcaption>2025/2/15(土)に開催された決勝大会でのプレゼンの様子</figcaption>
</figure>
```

サンプル記事は [`posts/sample.md`](posts/sample.md) を参考にしてください。

---

## 5. 活動紹介ページの編集（`activities/` ディレクトリ）

- Markdown ファイルを編集し、上記と同様に `title`, `date`, `tags`, `layout` を含めてください。
- 画像は `images/activities/` に配置して使用します。

---

## 6. 画像ファイルの管理ルール

- `images/` 以下に全画像を集約します。
- サブフォルダ構成の例：

```
images/
├── posts/       # post投稿の画像
├── activities/  # 各活動報告に紐づく画像
└── common/      # ホームページ全体共通の画像
```

- 命名規則の例：`2025-07-05-title-keyword.png`
※ あくまで原則です。厳密に守らなくてOKです。

---

## 7. レビュー時のチェックポイント

- Frontmatter の記述に不備がないか
- 画像の配置と参照パスが正しいか
- Markdown の構文エラーがないか
- 見た目が崩れていないか（開発サーバーで確認）

---

## 8. SEO対策

### OGP画像を設定するには

- `images/common/ogp.png` に OGP 用画像を設置（推奨サイズ：1200×630）  
- `<head>` 内に以下を追加:  
  ```html
  <meta property="og:image" content="{{ '/images/common/ogp.png' | url }}">
  <meta property="og:url" content="{{ '/' | url }}">
  ```  
- SNSシェアプレビュー確認:  
  - Facebook Debugger: https://developers.facebook.com/tools/debug/  
  - Twitter Validator: https://cards-dev.twitter.com/validator  
---

## その他

- 運用ルールは随時更新するかもしれません。

---

## お問い合わせ・Issue

疑問点や改善案があれば、GitHub の Issue にてご連絡ください。

ホームページ作成チャレンジに貢献いただきありがとうございます！