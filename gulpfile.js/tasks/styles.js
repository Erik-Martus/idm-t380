const path = require('path')
const { dest, src } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const argv = require('yargs').argv
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')

const dir = path.join(__dirname, '../../src/css')
const source = `${dir}/**/*.css`

function styles() {
  const outputStyle = argv.production ? 'compressed' : 'nested'
  return src(source)
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        grid: true
      })
    )
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.join(__dirname, '../../build/css')))
}

module.exports = styles