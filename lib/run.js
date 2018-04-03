'use strict'

const childProcess = require('child_process')

const paths = require('./paths')

const run = function (mochaOptions) {
  const mochaBinPath = paths.findBin('_mocha')
  const istanbulBinPath = paths.findBin('istanbul')

  childProcess.execSync(istanbulBinPath + ' cover ' + mochaBinPath + ' ' + mochaOptions.join(' '), {
    cwd: process.cwd(),
    stdio: [0, 1, 2],
    shell: true,
    windowsHide: true
  })
}


module.exports = {
  run: run
}
