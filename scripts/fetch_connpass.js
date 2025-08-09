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
const DAYS_BACK  = Number(process.env.CONNPASS_RANGE_DAYS_BACK  || 0);
const DAYS_AHEAD = Number(process.env.CONNPASS_RANGE_DAYS_AHEAD || 30);

if (!API_KEY) {
  console.error("ERROR: CONNPASS_API_KEY is not set.");
  process.exit(1);
}

// いまのローカル時刻
const now = new Date();
const windowStart = new Date(now); windowStart.setDate(windowStart.getDate() - DAYS_BACK);
const windowEnd   = new Date(now); windowEnd.setDate(windowEnd.getDate() + DAYS_AHEAD);

// ---- helpers ----
function clampText(str, max = 140) {
  if (!str) return "";
  const s = String(str).replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function htmlToPlain(html) {
  if (!html) return "";
  try {
    const dom = new JSDOM(`<body>${html}</body>`);
    const text = dom.window.document.body.textContent || "";
    return text.replace(/\s+/g, " ").trim();
  } catch {
    return String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
}

async function fetchPageMeta(pageUrl) {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent": "challenge-club-homepage/0.1 (+https://github.com/ChallengeClub/challenge-club-homepage)",
      },
    });
    if (!res.ok) {
      console.warn(`[meta] GET ${pageUrl} => ${res.status}`);
      return { image: null, description: null };
    }
    const html = await res.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute("content") || null;
    const ogDesc  = doc.querySelector('meta[property="og:description"], meta[name="description"]')?.getAttribute("content") || null;

    // 本文先頭段落のフォールバック
    let firstPara = null;
    const descNode = doc.querySelector("#event_description, .event_description, article, .entry, #main");
    if (descNode) {
      const p = descNode.querySelector("p");
      if (p && p.textContent) firstPara = p.textContent;
    }

    return {
      image: ogImage || null,
      description: (ogDesc && clampText(ogDesc, 140)) || (firstPara && clampText(firstPara, 140)) || null,
    };
  } catch (e) {
    console.warn(`[meta] Failed for ${pageUrl}: ${e.message}`);
    return { image: null, description: null };
  }
}

// ---- main ----
async function main() {
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
  if (!res.ok) throw new Error(`connpass API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  const raw = Array.isArray(data.events) ? data.events : [];

  // 期間絞り込み＆ソート
  const list = raw
    .filter(ev => {
      if (!ev?.started_at) return false;
      const start = new Date(ev.started_at);
      return start >= windowStart && start <= windowEnd;
    })
    .sort((a, b) => new Date(a.started_at) - new Date(b.started_at));

  const events = [];
  // 表示は最大3件なので、ページスクレイプは先頭6件くらいまでに抑えて軽量化
  const SCRAPE_LIMIT = 6;

  for (let i = 0; i < list.length; i++) {
    const ev = list[i];

    const id = ev.event_id;
    const guessedUrl = id ? `https://connpass.com/event/${id}/` : null;
    const url = ev.event_url || ev.public_url || ev.url || guessedUrl;

    // API側で拾えるサムネと説明（catch/description）
    const apiThumb = ev.image_url || ev.thumb || null;
    const apiSummary = clampText(ev.catch || htmlToPlain(ev.description || ""), 140) || null;

    let thumbnail = apiThumb;
    let summary = apiSummary;

    // 必要な分だけページから補完（先頭数件のみ）
    if ((!thumbnail || !summary) && url && i < SCRAPE_LIMIT) {
      const meta = await fetchPageMeta(url);
      if (!thumbnail) thumbnail = meta.image || null;
      if (!summary)   summary   = meta.description || null;
    }

    events.push({
      id,
      title: ev.title,
      url,
      started_at: ev.started_at,
      ended_at: ev.ended_at,
      place: ev.place || ev.address || "",
      limit: ev.limit ?? null,
      accepted: ev.accepted ?? null,
      waiting: ev.waiting ?? null,
      thumbnail,
      summary, // ← これをテンプレで使う
    });
  }

  await fs.mkdir("_data", { recursive: true });
  await fs.writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), events }, null, 2));
  console.log(`[connpass] Saved ${events.length} events to ${OUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
