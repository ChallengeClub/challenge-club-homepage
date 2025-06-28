const fetch = require("node-fetch");

module.exports = async function () {
  const apiUrl = "https://connpass.com/api/v2/event/?series_id=75618&count=1&order=1";
  try {
    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent": "ChallengeClub-EleventyBot/1.0 (+https://challengeclub.github.io)"
      }
    });

    if (!res.ok) {
      // 404 はイベント未登録を意味するだけなのでログ出力せず無視
      if (res.status === 404) {
        return [];
      }
      console.error("Connpass API returned status", res.status);
      return [];
    }

    const data = await res.json();
    return data.events || [];

  } catch (e) {
    console.error("Connpass fetch error:", e);
    return [];
  }
};
