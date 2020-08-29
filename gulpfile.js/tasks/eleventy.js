const { src, dest, series, parallel, watch } = require('gulp');
const cp = require("child_process");

const eleventy = () => {
    return cp.spawn("npx", ["eleventy", "--quiet"], { stdio: "inherit" });
};

const copy = () => {
    return src('./temp/**/*')
        .pipe(dest("./build"));
}

module.exports = series(eleventy, copy);