# SEO設定ガイド

このフォルダ（`seo/`）には、サイト全体の検索エンジン最適化（SEO）に関わるファイルをまとめています。  
Eleventyのテンプレートとして管理し、ビルド後はサイトルート（`/`）に配置されるように設定されています。

---

## 管理しているファイル

### 1. robots.txt.njk
- **目的**：検索エンジンのクローラーに、クロール可能なページやサイトマップの場所を知らせる。
- **出力先**：`/robots.txt`
- **内容例**：
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://challenge-club.org/sitemap.xml
  ```
- **注意点**：
  - 必ずサイトルートに配置される必要があります（検索エンジンは `https://example.com/robots.txt` のみ参照）。
  - 特定ページをクロールさせたくない場合は、`Disallow` を追加します。

---

### 2. sitemap.xml.njk
- **目的**：サイト内の全ページURLと更新日時を一覧化し、検索エンジンにインデックスを促す。
- **出力先**：`/sitemap.xml`
- **生成内容**：
  - 各ページのURL
  - 最終更新日（`updated` または `dateModified`、なければ `date`）
  - 更新頻度（トップページは `weekly`、その他は `monthly`）
  - 優先度（トップページは `1.0`、その他は `0.5`）
- **自動除外**：
  - front matter に `robots: "noindex"` が設定されたページは除外されます。
- **利点**：
  - 新規ページや更新を検索エンジンが素早く検知
  - インデックス漏れ防止

---

## 運用ルール

1. **SEO関連ファイルは `seo/` フォルダで一元管理**
   - テンプレートはここに置き、`permalink` で出力先をルートに設定する。

2. **ページのSEOメタ情報は front matter で管理**
   - 各記事や活動ページに以下を追加するのが推奨です：
     ```yaml
     description: "検索結果やSNSで表示される説明文（120〜160文字）"
     image: "/images/posts/example-hero.png"
     ogImage: "/images/posts/example-og.png"
     ogAlt: "OGP画像の説明文"
     ```
   - `description` は特に重要。未設定だとデフォルト値が使われます。

3. **noindex の指定**
   - インデックスさせたくないページは front matter に次を追加：
     ```yaml
     robots: "noindex, nofollow"
     ```
   - sitemap.xml にも含まれなくなります。

4. **更新日管理**
   - 記事更新時は `updated` または `dateModified` を追加すると sitemap.xml の `lastmod` に反映されます。

---

## 関連ファイル
- `_includes/base.njk`：SEOメタタグ、OGP/Twitterカード、構造化データを出力
- `_data/site.json`：サイト名・URL・デフォルトdescription・OGP画像などの一元管理

---