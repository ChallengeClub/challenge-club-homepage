// scripts/fetch_connpass.js
/* eslint-disable no-console */
require("dotenv").config();

const fs = require("node:fs/promises");
// Node 18+ は globalThis.fetch がある。古い環境でも動くようにフォールバック。
const fetch = globalThis.fetch || require("node-fetch");

// === 環境変数 ===
const API_KEY   = process.env.CONNPASS_API_KEY;
const SUBDOMAIN = process.env.CONNPASS_SUBDOMAIN || "challenge-club";

// 出力先（Eleventy がビルド時に読み込む JSON）
const OUT   = "_data/connpass.json";
const COUNT = Number(process.env.CONNPASS_COUNT || 50);

// 取得ウィンドウ（デフォルト: 今〜+30日）
// 運用や検証で必要に応じて可変化
const DAYS_BACK  = Number(process.env.CONNPASS_RANGE_DAYS_BACK  || 0);
const DAYS_AHEAD = Number(process.env.CONNPASS_RANGE_DAYS_AHEAD || 30);

// === 事前チェック ===
if (!API_KEY) {
  console.error("ERROR: CONNPASS_API_KEY is not set.");
  process.exit(1);
}

// === 期間ウィンドウ ===
// JST だからといって +9h などの手動補正はしない。
// APIの ISO8601(+09:00 等) は Date() で適切に比較できる。
const now = new Date();
const windowStart = new Date(now); windowStart.setDate(windowStart.getDate() - DAYS_BACK);
const windowEnd   = new Date(now); windowEnd.setDate(windowEnd.getDate() + DAYS_AHEAD);

// HTMLタグを除去してプレーンテキストへ（APIの description から要約を作る用途）
function htmlToPlain(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// テキストを所定文字数で丸める（末尾に…）
function clampText(str, max = 140) {
  if (!str) return "";
  const s = String(str).replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

async function main() {
  // v2 イベント一覧エンドポイント（サブドメイン指定）
  const url = new URL("https://connpass.com/api/v2/events/");
  url.searchParams.set("subdomain", SUBDOMAIN);
  url.searchParams.set("count", String(COUNT));
  url.searchParams.set("order", "2"); // 開催日時順（昇順）

  const headers = {
    "X-API-Key": API_KEY,
    "User-Agent": "challenge-club-homepage/0.1 (+https://github.com/ChallengeClub/challenge-club-homepage)",
  };

  console.log(`[connpass] GET ${url.toString()}`);
  console.log(`[connpass] window ${windowStart.toISOString()} ~ ${windowEnd.toISOString()}`);

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`connpass API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const raw = Array.isArray(data.events) ? data.events : [];

  // 期間で絞り、開始時刻でソート
  const list = raw
    .filter(ev => {
      if (!ev?.started_at) return false;
      const start = new Date(ev.started_at);
      return start >= windowStart && start <= windowEnd;
    })
    .sort((a, b) => new Date(a.started_at) - new Date(b.started_at));

  const events = [];

  for (const ev of list) {
    // URL は API の候補を優先。無ければ event_id から推測。
    const id = ev.event_id;
    const guessedUrl = id ? `https://connpass.com/event/${id}/` : null;
    const urlFromApi = ev.event_url || ev.public_url || ev.url || null;
    const safeUrl = urlFromApi || guessedUrl;

    // 概要は catch を優先、無ければ description をHTML除去して丸める
    const summary =
      clampText(ev.catch, 140) ||
      clampText(htmlToPlain(ev.description || ""), 140) ||
      null;

    // サムネイルは API で来ないことが多い。規約上スクレイピングはしないため null のまま許容。
    const thumbnail = ev.image_url || ev.thumb || null;

    events.push({
      id,
      title: ev.title,
      url: safeUrl,
      started_at: ev.started_at,
      ended_at: ev.ended_at,
      place: ev.place || ev.address || "",
      limit: ev.limit ?? null,
      accepted: ev.accepted ?? null,
      waiting: ev.waiting ?? null,
      thumbnail, // 多くの場合 null。テンプレート側でデフォルト画像を表示する想定。
      summary,   // テンプレート側で説明文として利用
    });
  }

  await fs.mkdir("_data", { recursive: true });
  await fs.writeFile(
    OUT,
    JSON.stringify({ updatedAt: new Date().toISOString(), events }, null, 2)
  );
  console.log(`[connpass] Saved ${events.length} events to ${OUT}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
