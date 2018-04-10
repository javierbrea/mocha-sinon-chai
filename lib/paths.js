'use strict'

const fs = require('fs')
const path = require('path')

const FIND_LIMIT = 5

const findDependencyFile = function (filePath) {
  let i
  let absoluteFilePath = null

  filePath = filePath || []
  if (typeof filePath === 'string') {
    filePath = [filePath]
  }

  filePath.unshift('node_modules')

  for (i = 0; i < FIND_LIMIT; i++) {
    if (!absoluteFilePath) {
      let tryPath = path.resolve.apply(this, [__dirname].concat(Array(1 + i).fill('..')).concat(filePath))
      if (fs.existsSync(tryPath)) {
        absoluteFilePath = tryPath
      }
    }
  }

  if (!absoluteFilePath) {
    throw new Error('"' + filePath.join(path.sep) + '" not found in dependencies')
  }
  return absoluteFilePath
}

module.exports = {
  findDependencyFile: findDependencyFile
}
