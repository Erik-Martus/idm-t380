module.exports = function (eleventyConfig) {
  eleventyConfig.setDynamicPermalinks(false);

  return {
    dir: {
      input: "src",
      includes: "templates/partials",
      layouts: "templates",
      output: "temp"
    }
  };

};
