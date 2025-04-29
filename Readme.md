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

## 自動デプロイ運用について（GitHub Actions）

本リポジトリでは、以下の運用方針で GitHub Pages による自動公開を行っています：

- 開発は develop ブランチ上で実施
- 機能追加・修正は Pull Request を通じて main にマージ
- main への push をトリガーに、GitHub Actions によって GitHub Pages に自動デプロイ

使用しているワークフロー
`.github/workflows/deploy.yml` にて定義：

## お問い合わせ
詳細は「お問い合わせ」セクションをご確認ください。

