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

  return {
    pathPrefix: isProduction ? "/challenge-club-homepage" : "",
    // pathPrefix: "/challenge-club-homepage", // ← GitHub Pages のサブパスに合わせて
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