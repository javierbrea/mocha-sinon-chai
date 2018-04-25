'use strict'

const childProcess = require('child_process')

const paths = require('./paths')

const run = function (params, opts) {
  opts = opts || {}
  return new Promise((resolve, reject) => {
    const mochaBinPath = paths.findDependencyFile(['mocha', 'bin', '_mocha'])
    const istanbulBinPath = paths.findDependencyFile(['istanbul', 'lib', 'cli.js'])
    const optionsFor = ['mocha', 'istanbul']
    const optionsForSep = '--'
    let options = {
      mocha: [],
      istanbul: []
    }
    let currentOptionsFor
    let childProcessArgs
    let proc

    if (typeof params === 'undefined') {
      params = ''
    }
    if (typeof params === 'string') {
      params = params.split(' ')
    }

    for (let i = 0; i < params.length; i = i + 1) {
      let optionForKey = params[i].replace(optionsForSep, '')
      if (optionsFor.indexOf(optionForKey) > -1) {
        currentOptionsFor = optionForKey
      } else if (currentOptionsFor) {
        options[currentOptionsFor].push(params[i])
      }
    }

    if (options.mocha.length) {
      options.mocha.unshift('--')
    }

    childProcessArgs = options.istanbul.concat('cover').concat(mochaBinPath).concat(options.mocha)
    proc = childProcess.fork(istanbulBinPath, childProcessArgs, {
      cwd: process.cwd(),
      env: Object.assign({}, process.env, opts.env || {})
    })

    proc.on('close', (code) => {
      let error
      if (code !== 0) {
        error = new Error('Error running tests')
        error.code = code
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

module.exports = {
  run: run
}
