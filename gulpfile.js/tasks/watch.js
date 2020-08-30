const path = require("path");
const { watch } = require("gulp");
const stylesTask = require("./styles");
const scriptsTask = require("./scripts");
const eleventyTask = require("./eleventy");

const dirJS = path.join(__dirname, "../../src/scripts");
const srcJS = `${dirJS}/**/*.js`;

const dirCSS = path.join(__dirname, "../../src/css");
const srcCSS = `${dirCSS}/**/*.css`;

// Includes template and partial files
const dirTemplates = path.join(__dirname, "../../src/templates");
const srcTemplates = `${dirTemplates}/**/*.+(html|njk)`;

const dirPages = path.join(__dirname, "../../src/pages");
const srcPages = `${dirPages}/**/*.+(html|njk)`;

const dirData = path.join(__dirname, "../../src/_data");
const srcData = `${dirData}/**/*.json`

function watchTask(cb) {
  watch(srcJS, scriptsTask);
  watch(srcCSS, stylesTask);
  watch([srcTemplates, srcPages, srcData], eleventyTask);
  cb();
}

module.exports = watchTask;
