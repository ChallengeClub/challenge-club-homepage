module.exports = function(eleventyConfig) {
  // 入力ディレクトリと出力ディレクトリを設定
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");

  // グローバルデータを追加
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  return {
    dir: {
      input: ".", // プロジェクトルートを入力ディレクトリとする
      includes: "_includes", // includeファイルは_includesディレクトリに置く
      data: "_data", // dataファイルは_dataディレクトリに置く (今回は使用しないが慣例として設定)
      output: "docs" // ビルド成果物はoutディレクトリに出力する // _site
    },
    markdownTemplateEngine: "njk", // MarkdownファイルでNunjucksテンプレートエンジンを使用
    htmlTemplateEngine: "njk", // HTMLファイルでNunjucksテンプレートエンジンを使用
    dataTemplateEngine: "njk" // DataファイルでNunjucksテンプレートエンジンを使用
  };
};