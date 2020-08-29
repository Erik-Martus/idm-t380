const gulp = require('gulp');
function defaultTask(cb) {
    console.log("hello")
    cb()
  }
  
  exports.default = defaultTask
  
  const { series, parallel } = require('gulp')

  function clean(cb) {
    console.log('clean task')
    cb()
  }
  
  function css(cb) {
    console.log('css task')
    cb()
  }
  
  function javascript(cb) {
    console.log('javascript task')
    cb()
  }
  
  exports.build = series(clean, parallel(css, javascript))
  
  