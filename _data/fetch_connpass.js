// scripts/fetch_connpass.js
/* eslint-disable no-console */
require("dotenv").config();

const fs = require("node:fs/promises");

const API_KEY = process.env.CONNPASS_API_KEY;
const OUT = "_data/connpass.json";
const SUBDOMAIN = "challenge-club"; // 固定でOK。別グループに流用するならenv化しても可。
const COUNT = 50; // 多めに取得してローカルで絞る

if (!API_KEY) {
  console.error("ERROR: CONNPASS_API_KEY is not set.");
  process.exit(1);
}

// JSTの今日〜+30日
const now = new Date();
const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
const jst30 = new Date(jstNow); jst30.setDate(jst30.getDate() + 30);

async function main() {
  const url = new URL("https://connpass.com/api/v2/events/");
  url.searchParams.set("subdomain", SUBDOMAIN);
  url.searchParams.set("count", String(COUNT));
  url.searchParams.set("order", "2"); // 開催日時順

  const headers = {
    "X-API-Key": API_KEY,
    "User-Agent": "challenge-club-homepage/0.1 (+https://github.com/ChallengeClub/challenge-club-homepage)"
  };

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`connpass API error: ${res.status} ${res.statusText}`);

  // v2はトップレベルが { "events": [...] } 想定（ユーザーのPython実装に合わせる）
  const data = await res.json();
  const raw = Array.isArray(data.events) ? data.events : [];

  // 期間絞り込み（JSTで今日〜+30日）
  const events = raw
    .filter(ev => {
      if (!ev.started_at) return false;
      const start = new Date(ev.started_at);
      return start >= jstNow && start <= jst30;
    })
    .sort((a, b) => new Date(a.started_at) - new Date(b.started_at))
    .map(ev => ({
      id: ev.event_id,
      title: ev.title,
      url: ev.event_url,
      started_at: ev.started_at,
      ended_at: ev.ended_at,
      place: ev.place || ev.address || "",
      limit: ev.limit ?? null,
      accepted: ev.accepted ?? null,
      waiting: ev.waiting ?? null,
    }));

  await fs.mkdir("_data", { recursive: true });
  await fs.writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), events }, null, 2));
  console.log(`Saved ${events.length} events to ${OUT}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
