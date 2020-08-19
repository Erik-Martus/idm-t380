const path = require('path')
const { watch } = require('gulp')
const stylesTask = require('./styles')
const scriptsTask = require('./javascripts')

const dirJS = path.join(__dirname, '../../common/scripts')
const srcJS = `${dirJS}/**/*.js`

const dirSCSS = path.join(__dirname, '../../common/css')
const srcSCSS = `${dirSCSS}/**/*.css`

function watchTask(cb) {
  watch(srcJS, scriptsTask)
  watch(srcSCSS, stylesTask)
  cb()
}

module.exports = watchTask

