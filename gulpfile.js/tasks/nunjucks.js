const path = require('path')
// const { src, dest, watch } = require('gulp')
const { src, dest } = require('gulp')
const nunjucksRender = require('gulp-nunjucks-render')

function nunjucksTask() {
    // get .html|.njk files in 'pages'
    return src(path.join(__dirname, '../../src/pages/**/*.+(html|njk)'))
    // render template with nunjucks
    .pipe(nunjucksRender({
      path: [path.join(__dirname, '../../src/templates')]
    }))
    // output files to build folder
    .pipe(dest(path.join(__dirname, '../../build')))
};

module.exports = nunjucksTask