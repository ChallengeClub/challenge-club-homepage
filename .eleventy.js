const isProduction = process.env.ELEVENTY_ENV === "production";

module.exports = function(eleventyConfig) {
  eleventyConfig.ignores.add("README.md");

  // 入力ディレクトリと出力ディレクトリを設定
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");

  // グローバルデータを追加
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("./posts/*.md").reverse();
  });
  // pathPrefixをテンプレートから使えるようにする
  eleventyConfig.addGlobalData("pathPrefix", "/challenge-club-homepage");

  // 活動ページ用コレクションを追加
  eleventyConfig.addCollection("activities", function(collection) {
    return collection.getFilteredByGlob("./activities/*.md");
  });
  
  // 日付フォーマット用フィルターをNunjucksに追加
  eleventyConfig.addFilter("date", (dateObj, formatStr) => {
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
  });

  const slugify = require("slugify");

  // タグ別ページ生成のためのコレクション
  eleventyConfig.addCollection("tagList", function(collection) {
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
  });

  // タグ名でフィルターするカスタムフィルター
  eleventyConfig.addFilter("safeSlug", function(input) {
    if (!input) return "no-tag";
    return slugify(input, {
      replacement: "-",     // スペースなどを - に変換
      lower: true,          // 小文字に変換
      strict: true,         // 記号除去
      locale: "ja"          // 日本語対応（ただし基本はローマ字化されない）
    }) || "no-tag";
  });
  
  return {
    pathPrefix: "/challenge-club-homepage",
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