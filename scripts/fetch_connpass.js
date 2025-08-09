// scripts/fetch_connpass.js
/* eslint-disable no-console */
require("dotenv").config();

const fs = require("node:fs/promises");
const fetch = globalThis.fetch || require("node-fetch"); // Node 18+ はグローバルfetch
const { JSDOM } = require("jsdom");

const API_KEY = process.env.CONNPASS_API_KEY;
const SUBDOMAIN = process.env.CONNPASS_SUBDOMAIN || "challenge-club";
const OUT = "_data/connpass.json";
const COUNT = Number(process.env.CONNPASS_COUNT || 50);

// 取得ウィンドウ（デフォルト: 今〜+30日）
// 過去も含めたい検証時は CONNPASS_RANGE_DAYS_BACK=1 などを指定
const DAYS_BACK  = Number(process.env.CONNPASS_RANGE_DAYS_BACK  || 0);
const DAYS_AHEAD = Number(process.env.CONNPASS_RANGE_DAYS_AHEAD || 30);

if (!API_KEY) {
  console.error("ERROR: CONNPASS_API_KEY is not set.");
  process.exit(1);
}

// 現在ローカル時刻を基準（JSTでも+9hしない）
const now = new Date();
const windowStart = new Date(now); windowStart.setDate(windowStart.getDate() - DAYS_BACK);
const windowEnd   = new Date(now); windowEnd.setDate(windowEnd.getDate() + DAYS_AHEAD);

async function fetchOgImage(pageUrl) {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent":
          "challenge-club-homepage/0.1 (+https://github.com/ChallengeClub/challenge-club-homepage)",
      },
    });
    if (!res.ok) {
      console.warn(`[thumbnail] GET ${pageUrl} => ${res.status}`);
      return null;
    }
    const html = await res.text();
    const dom = new JSDOM(html);
    const meta = dom.window.document.querySelector('meta[property="og:image"]');
    return meta?.getAttribute("content") || null; // 例: https://media.connpass.com/thumbs/...png
  } catch (e) {
    console.warn(`[thumbnail] Failed for ${pageUrl}: ${e.message}`);
    return null;
  }
}

async function main() {
  const url = new URL("https://connpass.com/api/v2/events/");
  url.searchParams.set("subdomain", SUBDOMAIN);
  url.searchParams.set("count", String(COUNT));
  url.searchParams.set("order", "2"); // 開催日時順（昇順）

  const headers = {
    "X-API-Key": API_KEY,
    "User-Agent":
      "challenge-club-homepage/0.1 (+https://github.com/ChallengeClub/challenge-club-homepage)",
  };

  console.log(`[connpass] GET ${url.toString()}`);
  console.log(`[connpass] window ${windowStart.toISOString()} ~ ${windowEnd.toISOString()}`);

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`connpass API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  const raw = Array.isArray(data.events) ? data.events : [];

  // 期間絞り込み＆ソート
  const list = raw
    .filter((ev) => {
      if (!ev?.started_at) return false;
      const start = new Date(ev.started_at); // "....+09:00" を含むISOなのでそのまま比較OK
      return start >= windowStart && start <= windowEnd;
    })
    .sort((a, b) => new Date(a.started_at) - new Date(b.started_at));

  // サムネ取得（API側の候補→なければイベントページの og:image）
  const events = [];
  for (const ev of list) {
    const id = ev.event_id;
    const guessedUrl = id ? `https://connpass.com/event/${id}/` : null;
    // v2 / v1 / その他の互換キーを順に試す
    const url = ev.event_url || ev.public_url || ev.url || guessedUrl;
    
    const base = {
      id: ev.event_id,
      title: ev.title,
      url, // ← ここで必ず何か入る想定に
      started_at: ev.started_at,
      ended_at: ev.ended_at,
      place: ev.place || ev.address || "",
      limit: ev.limit ?? null,
      accepted: ev.accepted ?? null,
      waiting: ev.waiting ?? null,
      thumbnail: ev.image_url || ev.thumb || null,
    };

    if (!base.thumbnail && base.url) {
      base.thumbnail = await fetchOgImage(base.url);
    }
    events.push(base);
  }

  await fs.mkdir("_data", { recursive: true });
  await fs.writeFile(
    OUT,
    JSON.stringify({ updatedAt: new Date().toISOString(), events }, null, 2)
  );
  console.log(`[connpass] Saved ${events.length} events to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
