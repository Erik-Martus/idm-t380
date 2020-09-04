const path = require('path')
const { dest, src } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const argv = require('yargs').argv
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const stripCssComments = require('gulp-strip-css-comments')
const gulpif = require('gulp-if')

const dir = path.join(__dirname, '../../src/css')
const source = `${dir}/**/*.css`

function styles() {
  return src(source)
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        grid: true
      })
    )
    .pipe(concat('main.css'))
    .pipe(gulpif(argv.prod, stripCssComments()))
    .pipe(gulpif(argv.prod, cleanCSS()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.join(__dirname, '../../build/css')))
}

module.exports = styles