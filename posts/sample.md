---
title: サンプルニュース
layout: base.njk
date: 2025-06-26
tags: [ニュース]
permalink: "/posts/sample/"
thumbnail: /images/posts/2025-06-26-sample.png
description: "このページはニュース記事の書き方サンプルです。新しいお知らせや活動報告を投稿する際の参考にしてください。"
image: "/images/posts/2025-06-26-sample.png"
ogImage: "/images/posts/2025-06-26-sample.png"
ogAlt: "ニュース記事サンプルのOGP画像"
---

# サンプルページ

この記事は、**ニュース記事の書き方のサンプル**です。  
新しいお知らせや活動報告を投稿する際は、このページを参考にしてください。

---

## ニュースページの書き方（テンプレート）

ニュース記事を書く際は、ファイルを `posts/` フォルダに `.md` 形式で追加し、以下のような **YAMLフロントマター** をページ冒頭に記述してください：

```js
title: ニュースタイトル（例：「○○イベントに参加しました」）
description: "記事の要約文。検索結果やSNSで表示されます。120〜160文字程度が目安。"
date: 2025-06-26
permalink: "/posts/news2025-06-26/"
thumbnail: /images/posts/2025-06-26-sample.png
tags: [ニュース, 活動報告]
image: "/images/posts/news2025-06-26/hero.png"
ogImage: "/images/posts/news2025-06-26/og.png"
ogAlt: "SNSなどで表示されるOGP画像の代替テキスト"
```

- `title`: ページタイトル（一覧にも表示されます）
- `description`: 検索結果やSNSカードに表示される説明文。120〜160文字を目安に要点をまとめる
- `layout`: 基本的に `base.njk` で統一
- `date`: 投稿日。ニュース一覧はこの順で並びます
- `permalink`: 公開されるURL（`/posts/○○/`形式）
- `thumbnail`: 記事一覧やカード表示など、一覧ページで表示するための小サイズ画像。指定がない場合は `image` または本文中の最初の画像が使われます
- `tags`: タグ
- `image`: 記事冒頭のヒーロー画像として使用され、OGP画像にも適用
- `ogImage`: OGP用に `image` と別の画像を使いたい場合に指定。なければ `image` が使用されます
- `ogAlt`: OGP画像の代替テキスト（アクセシビリティとSEO補助）

### タグ付けルール

- `tags: [タグ1, タグ2, ...]` の形式で1〜3個のタグをつけてください。タグの上限はありません。
- 以下の推奨タグリストを参考にしつつ、内容に応じて柔軟に判断してください。

#### 推奨タグ一覧

- 活動の分類：ニュース, お知らせ, 活動報告
- テーマ：自動運転, ISUCON, CTF, メイカー, プログラミングコンテスト, VR
- 種別：LT会, 読書会, ハッカソン, 勉強会, プロジェクト, コンテスト

---

## 本文の書き方

Markdown形式で自由に記述可能です：

```markdown
---
title: 〇〇イベントに参加しました
description: "〇〇イベントに参加したレポート記事です。"
layout: base.njk
date: 2025-06-20
permalink: "/posts/event2025-06-20/"
thumbnail: /images/posts/2025-06-26-sample.png
image: "/images/posts/event2025-06-20/hero.png"
ogImage: "/images/posts/event2025-06-20/og.png"
ogAlt: "〇〇イベント会場の様子"
---

技術チャレンジ部は、2025年6月に開催された「〇〇イベント」に出展しました。  
多数の来場者と交流し、メンバーの作品も高く評価されました。
```

## 投稿ファイルの保存場所
全て posts/ フォルダに保存してください。
ファイル名の例：

```
posts/
├── news-2025-06-20.md
├── event-2025-07-01.md
├── sample.md  ← このガイドページ
```

## サムネイル画像の指定方法

ニュース記事の一覧ページなどで表示される **サムネイル画像**は、ページ冒頭の frontmatter に以下のように記述することで明示的に指定できます。

```yaml
thumbnail: /images/posts/2025-06-26-sample.png
```
サムネイル画像は以下の優先順位で表示されます：
1. thumbnail: に明示的に指定された画像（推奨）
1. 記事本文内の最初の画像
1. デフォルト画像 /images/common/default-thumbnail.png

備考： thumbnail: を記載しない場合でも、記事内に画像があれば自動で使用されます。ただし、意図しない画像が選ばれることもあるため、明示指定を推奨します。

## 注意点
- index.md（投稿一覧ページ）も同じ posts/ にありますが、eleventyExcludeFromCollections: true を指定して投稿一覧には含まれていません。

- ファイル名や日付の順序は自由ですが、date フィールドが並び順に使われます。

ご不明点があれば、他の運用者と共有するか、リポジトリのREADMEやWikiに追記してください。
