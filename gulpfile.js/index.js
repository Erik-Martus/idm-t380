const gulp = require("gulp");
const { parallel, series } = require("gulp");

const cleanTask = require("./tasks/clean");
const stylesTask = require("./tasks/styles");
const scriptsTask = require("./tasks/scripts");
const eleventyTask = require("./tasks/eleventy");
const watchTast = require("./tasks/watch");

exports.clean = cleanTask;
exports.eleventy = eleventyTask;
exports.scripts = scriptsTask;
exports.styles = stylesTask;
exports.watch = watchTast;

exports.default = series(cleanTask, eleventyTask, parallel(scriptsTask, stylesTask));
