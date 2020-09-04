const { src, dest, series, parallel, watch } = require('gulp');
const cp = require("child_process");
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const argv = require('yargs').argv

const eleventy = () => {
    return cp.spawn("npx", ["eleventy", "--quiet"], { stdio: "inherit" });
};

const htmlMinify = () => {
    return src('./temp/**/*')
        .pipe(gulpif(argv.prod, htmlmin({ collapseWhitespace: true, removeComments: true, html5: true })))
        .pipe(dest("./build"));
}

module.exports = series(eleventy, htmlMinify);