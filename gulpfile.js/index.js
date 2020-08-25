const gulp = require("gulp");

const nunjucksTask = require("./tasks/nunjucks");
const watchTast = require("./tasks/watch");

exports.nunjucks = nunjucksTask;
exports.watch = watchTast;
