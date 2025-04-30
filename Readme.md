# 技術チャレンジ部 ホームページ

本リポジトリは、技術チャレンジ部の公式ホームページのソースコードです。  


## 公開URL

GitHub Pagesで公開。
[https://challengeclub.github.io/challenge-club-homepage/](https://challengeclub.github.io/challenge-club-homepage/)

## ディレクトリ構成
```
challenge-club-homepage/
├── index.html                    # メインのHTMLファイル
├── README.md                     # プロジェクト概要
├── images/                       # 各種画像リソース
│   ├── challenge-club-pc.png            # ロゴ
│   ├── challenge-club-backpanel.png     # ヘッダー・フッター背景
```

## 使用技術

- HTML / CSS（バニラ）
- GitHub Pages によるホスティング
- モバイル対応（レスポンシブデザイン）
- 画像付きカードレイアウト & フォローリンク

## セットアップ

```bash
git clone https://github.com/ChallengeClub/challenge-club-homepage.git
cd challenge-club-homepage
# index.html をブラウザで開くだけ
```
## 公開・運用・SEO対策

### デプロイ運用について（Deploy from a branch）

本リポジトリでは、GitHub Pages の「Deploy from a branch」機能を使って静的HTMLサイトを公開しています。

- メインブランチ `main` に `index.html` を配置
- ルートディレクトリから直接デプロイされます
- GitHub Actions は現在使用していません（必要に応じて今後再導入予定）

### OGP画像を設定するには

専用ドメインを取得した後、SNSシェア時に表示されるカード画像を以下の手順で設定できます。

- images/ogp.png にOGP用画像を設置（推奨サイズ：1200×630）
- HTMLの<head>に以下のようにOGPタグを記述：
```html
<meta property="og:image" content="https://yourdomain.com/images/ogp.png">
<meta property="og:url" content="https://yourdomain.com">
```
- SNSシェアの見え方を以下で確認：
    - Facebook: https://developers.facebook.com/tools/debug/
    - Twitter: https://cards-dev.twitter.com/validator

## お問い合わせ
詳細は「お問い合わせ」セクションをご確認ください。

