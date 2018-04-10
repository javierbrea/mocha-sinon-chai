'use strict'

const slice = function () {
  return Array.prototype.slice.call(process.argv, 2)
}

module.exports = {
  slice: slice
}
