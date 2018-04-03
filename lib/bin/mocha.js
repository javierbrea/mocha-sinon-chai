'use strict'

const paths = require('./paths')
const binPath = paths.findBin('mocha')

if (binPath) {
  require(binPath)
}
