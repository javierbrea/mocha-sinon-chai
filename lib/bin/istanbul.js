'use strict'

const paths = require('./paths')
const binPath = paths.findBin('istanbul')

if (binPath) {
  require(binPath).runToCompletion(Array.prototype.slice.call(process.argv, 2))
}
