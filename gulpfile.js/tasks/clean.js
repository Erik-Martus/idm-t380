const path = require('path')
const gulp = require('gulp')
const del = require('del')

// temp folder is used as a go between for eleventy to avoid conflicts with other gulp tasks
const dirTemp = path.join(__dirname, '../../temp')
const dirBuild = path.join(__dirname, '../../build')

const cleanTask = () => {
  return del([dirTemp, dirBuild], { force: true })
}

module.exports = cleanTask