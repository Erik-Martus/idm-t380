// Copy images from src dir to build meant to compliment clean task. Assumes images have already been optimized.
const path = require('path')
const { dest, src } = require('gulp')

const imgTask = () => {
    return src(path.join(__dirname, '../../src/images/**/*'))
        .pipe(dest(path.join(__dirname, '../../build/images')))
}

module.exports = imgTask