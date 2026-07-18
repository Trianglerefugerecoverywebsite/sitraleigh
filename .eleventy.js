const path = require("path");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Robustly parse a date whether it arrives as a Date object (YAML front matter)
  // or a plain "YYYY-MM-DD" string (JSON data). Anchor plain dates at UTC to
  // avoid the day shifting by one in the build's timezone.
  function parseDate(v) {
    if (v instanceof Date) return v;
    if (v == null) return new Date(NaN);
    const s = String(v);
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return new Date(s);
  }

  eleventyConfig.addFilter("dateDisplay", (v) => {
    const d = parseDate(v);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  });
  eleventyConfig.addFilter("monthDay", (v) => {
    const d = parseDate(v);
    if (isNaN(d)) return { month: "", day: "" };
    return { month: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase(), day: d.getUTCDate() };
  });
  eleventyConfig.addFilter("shortDate", (v) => {
    const d = parseDate(v);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  });
  eleventyConfig.addFilter("sortByOrder", (items) => {
    return [...items].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });
  eleventyConfig.addFilter("sortByDate", (items) => {
    return [...items].sort((a, b) => parseDate(a.data.date) - parseDate(b.data.date));
  });
  eleventyConfig.addFilter("futureOnly", (items) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return items.filter(item => parseDate(item.data.date) >= today);
  });
  eleventyConfig.addFilter("pastOnly", (items) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return items.filter(item => parseDate(item.data.date) < today);
  });
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("whereType", (items, type) => {
    return items.filter(i => (i.data.type || "Event") === type);
  });
  eleventyConfig.addFilter("unique", (arr) => [...new Set(arr)]);
  eleventyConfig.addFilter("reverse", (arr) => [...arr].reverse());
  eleventyConfig.addFilter("nl2br", (str) => str ? str.replace(/\n/g, "<br>") : "");
  eleventyConfig.addFilter("jsonify", (obj) => JSON.stringify(obj));
  eleventyConfig.addFilter("yearCounts", (posts) => {
    const map = {};
    posts.forEach((p) => {
      const d = parseDate(p.data.date);
      if (!isNaN(d)) {
        const y = d.getUTCFullYear();
        map[y] = (map[y] || 0) + 1;
      }
    });
    return Object.keys(map)
      .map((y) => ({ year: +y, count: map[y] }))
      .sort((a, b) => b.year - a.year);
  });
  eleventyConfig.addFilter("yearOnly", (v) => {
    const d = parseDate(v);
    return isNaN(d) ? "" : d.getUTCFullYear();
  });
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const map = {};
    posts.forEach((p) => {
      const d = parseDate(p.data.date);
      if (!isNaN(d)) {
        const y = d.getUTCFullYear();
        if (!map[y]) map[y] = [];
        map[y].push(p);
      }
    });
    return Object.keys(map)
      .sort((a, b) => b - a)
      .map((y) => ({ year: +y, posts: map[y] }));
  });
  eleventyConfig.addFilter("inlineThumbs", (html) => {
    if (!html) return html;
    return html.replace(/<img\s+([^>]*?)\/?>/g, (match, attrs) => {
      if (/\bclass\s*=\s*"([^"]*)"/.test(attrs)) {
        return `<img ${attrs.replace(/\bclass\s*=\s*"([^"]*)"/, 'class="$1 inline-thumb"')} tabindex="0" role="button">`;
      }
      return `<img ${attrs} class="inline-thumb" tabindex="0" role="button">`;
    });
  });

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
