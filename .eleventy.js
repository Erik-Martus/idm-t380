const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("svgContents", function (file) {
    let relativeFilePath = path.join(__dirname, `/src/images/${file}`);
    if (path.extname(file) != '.svg') {
      throw new Error("eleventy-plugin-svg-contents requires a filetype of svg");
    }
    let data = fs.readFileSync(relativeFilePath, 'utf8', function (err, contents) {
      if (err) {
        throw new Error(err)
      }

      return contents
    });
    return data.toString('utf8')
    // return data;
  });

  return {
    dir: {
      input: "src",
      includes: "templates/partials",
      layouts: "templates",
      output: "temp"
    }
  };

};
