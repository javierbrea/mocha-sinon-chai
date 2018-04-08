'use strict'

const childProcess = require('child_process')

const paths = require('./paths')

const run = function (params) {
  const mochaBinPath = paths.findBin('_mocha')
  const istanbulBinPath = paths.findBin('istanbul')
  const optionsFor = ['mocha', 'istanbul']
  const optionsForSep = '--'
  let options = {
    mocha: [],
    istanbul: []
  }
  let istanbulParams = ''
  let mochaParams = ''
  let currentOptionsFor

  if (typeof params === 'string') {
    params = params.split(' ')
  }

  for (let i = 0; i < params.length; i = i + 1) {
    let optionForKey = params[i].replace(optionsForSep, '')
    if (optionsFor.indexOf(optionForKey) > -1) {
      options[optionForKey] = options[optionForKey] || []
      currentOptionsFor = optionForKey
    } else if (currentOptionsFor) {
      options[currentOptionsFor].push(params[i])
    }
  }

  if (options.istanbul.length) {
    istanbulParams = ' ' + options.istanbul.join(' ')
  }

  if (options.mocha.length) {
    mochaParams = ' ' + optionsForSep + ' ' + options.mocha.join(' ')
  }

  childProcess.execSync(istanbulBinPath + istanbulParams + ' cover ' + mochaBinPath + mochaParams, {
    cwd: process.cwd(),
    stdio: [0, 1, 2],
    shell: true,
    windowsHide: true
  })
}

module.exports = {
  run: run
}
