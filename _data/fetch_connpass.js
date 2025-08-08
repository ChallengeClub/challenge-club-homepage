// scripts/fetch_connpass.js
/* eslint-disable no-console */
require("dotenv").config();

const fs = require("node:fs/promises");
// Node 18+ は globalThis.fetch、古い場合は node-fetch を使用
const fetch = globalThis.fetch || require("node-fetch");
const { JSDOM } = require("jsdom");

const API_KEY = process.env.CONNPASS_API_KEY;
const SUBDOMAIN = process.env.CONNPASS_SUBDOMAIN || "challenge-club";
const OUT = "_data/connpass.json";
const COUNT = 50;

if (!API_KEY) {
  console.error("ERROR: CONNPASS_API_KEY is not set.");
  process.exit(1);
}

// JSTの今日〜+30日
const now = new Date();
const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
const jst30 = new Date(jstNow);
jst30.setDate(jst30.getDate() + 30);

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
    const content = meta?.getAttribute("content") || null;
    return content; // 例: https://media.connpass.com/thumbs/...png
  } catch (e) {
    console.warn(`[thumbnail] Failed for ${pageUrl}: ${e.message}`);
    return null;
  }
}

async function main() {
  const url = new URL("https://connpass.com/api/v2/events/");
  url.searchParams.set("subdomain", SUBDOMAIN);
  url.searchParams.set("count", String(COUNT));
  url.searchParams.set("order", "2"); // 開催日時順

  const headers = {
    "X-API-Key": API_KEY,
    "User-Agent":
      "challenge-club-homepage/0.1 (+https://github.com/ChallengeClub/challenge-club-homepage)",
  };

  console.log(`[connpass] GET ${url.toString()}`);
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`connpass API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  const raw = Array.isArray(data.events) ? data.events : [];

  // 期間絞り込み＆ソート
  const list = raw
    .filter((ev) => {
      if (!ev.started_at) return false;
      const start = new Date(ev.started_at);
      return start >= jstNow && start <= jst30;
    })
    .sort((a, b) => new Date(a.started_at) - new Date(b.started_at));

  // サムネ取得（各イベントページの og:image を参照）
  const events = [];
  for (const ev of list) {
    const base = {
      id: ev.event_id,
      title: ev.title,
      url: ev.event_url,
      started_at: ev.started_at,
      ended_at: ev.ended_at,
      place: ev.place || ev.address || "",
      limit: ev.limit ?? null,
      accepted: ev.accepted ?? null,
      waiting: ev.waiting ?? null,
      thumbnail: null,
    };

    // 将来API側に画像が来たらまずそちらを優先
    const apiThumb = ev.image_url || ev.thumb || null;
    if (apiThumb) {
      base.thumbnail = apiThumb;
    } else if (base.url) {
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
