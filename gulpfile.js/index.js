const gulp = require("gulp");
const { parallel } = require("gulp");

const stylesTask = require("./tasks/styles");
const scriptsTask = require("./tasks/javascripts");
const nunjucksTask = require("./tasks/nunjucks");
const watchTast = require("./tasks/watch");

exports.nunjucks = nunjucksTask;
exports.scripts = scriptsTask;
exports.styles = stylesTask;
exports.watch = watchTast;

exports.default = parallel(nunjucksTask, scriptsTask, stylesTask);
