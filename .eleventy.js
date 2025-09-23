const slugify = require("slugify");
const { JSDOM } = require("jsdom");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.ignores.add("README.md");

  // 入力ディレクトリと出力ディレクトリを設定
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");

  // グローバルデータを追加
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  // pathPrefixをテンプレートから使えるようにする
  eleventyConfig.addGlobalData("pathPrefix", "/challenge-club-homepage");

  // posts コレクション
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("./posts/*.md").reverse();
  });
  // activities コレクション
  eleventyConfig.addCollection("activities", function(collection) {
    return collection.getFilteredByGlob("./activities/*.md").reverse();
  });
  // posts + activities をまとめたコレクション
  eleventyConfig.addCollection("allArticles", function (collection) {
    return [
      ...collection.getFilteredByGlob("./posts/*.md"),
      ...collection.getFilteredByGlob("./activities/*.md"),
    ]; // 新しいものを先頭にしたい場合
  });

  // 日付フォーマット用フィルター
  function formatDate(dateObj, formatStr) {
    const dt = new Date(dateObj);
    const map = {
      yyyy: dt.getFullYear(),
      MM: String(dt.getMonth() + 1).padStart(2, "0"),
      dd: String(dt.getDate()).padStart(2, "0"),
      HH: String(dt.getHours()).padStart(2, "0"),
      mm: String(dt.getMinutes()).padStart(2, "0")
    };
    let result = formatStr;
    for (const token in map) {
      result = result.replace(token, map[token]);
    }
    return result;
  }

  // ISO文字列(+09:00付き)をJSTで整形するフィルター
  function formatJST(iso, fmt = "yyyy/MM/dd HH:mm") {
    if (!iso) return "";
    return DateTime.fromISO(iso, { setZone: true })
      .setZone("Asia/Tokyo")
      .toFormat(fmt);
  }

  // HTMLコンテンツから最初の画像srcを取得するフィルター
  function getFirstImageSrc(content) {
    if (!content) return null;
    const dom = new JSDOM(content);
    const img = dom.window.document.querySelector("img");
    return img ? img.getAttribute("src") : null;
  }

  // タグリストコレクション
  function getTagList(collection) {
    const tagsSet = new Set();
    collection.getAll().forEach((item) => {
      const tags = item.data.tags;
      if (Array.isArray(tags)) {
        tags.forEach(tag => {
          if (tag && tag.trim()) {
            tagsSet.add(tag);
          }
        });
      }
    });
    return [...tagsSet];
  }

  // タグ名を安全なスラッグに変換するフィルター
  function safeSlug(input) {
    if (!input) return "no-tag";
    return slugify(input, {
      replacement: "-",     // スペースなどを - に変換
      lower: true,          // 小文字に変換
      strict: true,         // 記号除去
      locale: "ja"          // 日本語対応（ただし基本はローマ字化されない）
    }) || "no-tag";
  }

  // 絶対URLを生成するフィルター
  function absoluteUrl(path, base) {
    try { return new URL(path, base).toString(); }
    catch { return path; }
  }

  // フィルターとコレクションの登録
  eleventyConfig.addFilter("date", formatDate);
  eleventyConfig.addNunjucksFilter("fmtJST", formatJST);
  eleventyConfig.addFilter("getFirstImageSrc", getFirstImageSrc);
  eleventyConfig.addCollection("tagList", getTagList);
  eleventyConfig.addFilter("safeSlug", safeSlug);
  eleventyConfig.addFilter("absoluteUrl", absoluteUrl);


  // Editor機能
  eleventyConfig.addPassthroughCopy({ "admin/styles": "admin/styles" });
  eleventyConfig.addPassthroughCopy({ "admin/scripts": "admin/scripts" });
  eleventyConfig.addWatchTarget("admin/styles/");
  eleventyConfig.addWatchTarget("admin/scripts/");

  return {
    pathPrefix: "",
    dir: {
      input: ".", // プロジェクトルートを入力ディレクトリとする
      includes: "_includes", // includeファイルは_includesディレクトリに置く
      data: "_data", // dataファイルは_dataディレクトリに置く (今回は使用しないが慣例として設定)
      output: "docs" // ビルド成果物はoutディレクトリに出力する // _site
      // output: "_site" // ビルド成果物は_siteディレクトリに出力する
    },
    markdownTemplateEngine: "njk", // MarkdownファイルでNunjucksテンプレートエンジンを使用
    htmlTemplateEngine: "njk", // HTMLファイルでNunjucksテンプレートエンジンを使用
    dataTemplateEngine: "njk" // DataファイルでNunjucksテンプレートエンジンを使用
  };
};