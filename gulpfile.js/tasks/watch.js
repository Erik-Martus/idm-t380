const path = require("path");
const { watch } = require("gulp");
const stylesTask = require("./styles");
const scriptsTask = require("./scripts");

const dirJS = path.join(__dirname, "../../src/scripts");
const srcJS = `${dirJS}/**/*.js`;

const dirCSS = path.join(__dirname, "../../src/css");
const srcCSS = `${dirCSS}/**/*.css`;

function watchTask(cb) {
  watch(srcJS, scriptsTask);
  watch(srcCSS, stylesTask);
  cb();
}

module.exports = watchTask;
