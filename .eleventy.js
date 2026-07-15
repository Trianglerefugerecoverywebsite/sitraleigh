const path = require("path");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addFilter("dateDisplay", (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  });
  eleventyConfig.addFilter("monthDay", (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return { month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(), day: d.getDate() };
  });
  eleventyConfig.addFilter("shortDate", (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
  eleventyConfig.addFilter("sortByOrder", (items) => {
    return [...items].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });
  eleventyConfig.addFilter("sortByDate", (items) => {
    return [...items].sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  });
  eleventyConfig.addFilter("futureOnly", (items) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return items.filter(item => new Date(item.data.date + "T00:00:00") >= today);
  });
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("unique", (arr) => [...new Set(arr)]);
  eleventyConfig.addFilter("reverse", (arr) => [...arr].reverse());
  eleventyConfig.addFilter("nl2br", (str) => str ? str.replace(/\n/g, "<br>") : "");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
