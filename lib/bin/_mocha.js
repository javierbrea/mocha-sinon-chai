'use strict'

const paths = require('./paths')
const binPath = paths.findBin('_mocha')

if (binPath) {
  require(binPath)
}
