const path = require("path");
const { watch } = require("gulp");
// const stylesTask = require('./styles')
// const scriptsTask = require('./javascripts')
const nunjucksTask = require("./nunjucks");

// const dirJS = path.join(__dirname, "../../src/js");
// const srcJS = `${dirJS}/**/*.js`;

// const dirSCSS = path.join(__dirname, "../../src/scss");
// const srcSCSS = `${dirSCSS}/**/*.scss`;

const dirNJKtemp = path.join(__dirname, "../../src/templates");
const srcNJKtemp = `${dirNJKtemp}/**/*.+(html|njk)`;

const dirNJKpage = path.join(__dirname, "../../src/pages");
const srcNJKpage = `${dirNJKpage}/**/*.+(html|njk)`;

function watchTask(cb) {
  //   watch(srcJS, scriptsTask);
  //   watch(srcSCSS, stylesTask);
  watch([srcNJKtemp, srcNJKpage], nunjucksTask);
  cb();
}

module.exports = watchTask;
