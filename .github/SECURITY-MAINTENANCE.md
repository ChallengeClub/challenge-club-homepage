# Node.js / npm のセキュリティ更新

## 実行環境

- `.nvmrc` の Node.js 24.22.1 を開発と CI の共通基準にする。
- 開発端末では `nvm install`、`nvm use`、`npm ci` の順で実行する。
- Node.js の修正版が公開されたら `.nvmrc` と `package.json` の engines 下限を更新する。
- CI は `npm ci` の lockfile を使用し、ビルド時に依存を追加インストールしない。

## Markdown 処理の override

Eleventy 2.0.1 は markdown-it 13 系に依存し、既知の脆弱性が残るため、
`overrides` で Eleventy の markdown-it を修正版の 14.3.3 以降に差し替えている。
Eleventy のメジャー更新は行っていない。将来 Eleventy を更新するときは、
この override が必要か見直し、生成 HTML の互換性を再確認する。

## 2026-10-25 の検証

- Node.js 24.22.1（公式配布アーカイブの SHA-256 を確認）を使用。
- 一時コピーで `npm ci` と `TZ=Asia/Tokyo ELEVENTY_ENV=production npm run build` が成功。
- `npm audit` は既知の脆弱性 0 件。これは全ての安全性を保証するものではない。
- 更新前と更新後の一時コピーの `docs/` を比較し、全件一致を確認。
  既存のタグ一覧の順序には同じ依存構成での再ビルドでも揺れがあるため、
  初回の差分（タグ一覧と sitemap のタグ URL の順序）を再ビルドで確認した。
- connpass 取得処理は模擬応答で、期間の絞り込み・要約・URL の生成を確認。
  実 API、実 API キーは使用していない。
- リポジトリの `docs/`、記事、画像、テンプレートは変更していない。
- push、GitHub Actions の手動実行、公開環境へのデプロイは行っていない。

## 次回以降の検証

リポジトリ直下でビルドすると `docs/` が更新される。
公開内容を保護する検証では、ソースを一時ディレクトリにコピーし、そこで
`npm ci` とビルドを実行する。connpass データも固定した同一の入力で比較する。
日時・入力ファイルの更新日時に由来する差分は、依存更新の差分と分けて確認する。
実 API を使った取得確認と GitHub Actions 上の確認は、公開更新の有無を確認して行う。

既存のビルド・コミット・Pages 公開の構成とトリガーは維持している。
main へのマージ後は従来どおり自動ビルド・公開が動くため、マージは公開可能な時点で行う。
