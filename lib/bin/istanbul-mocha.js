'use strict'

const childProcess = require('child_process')

childProcess.execSync('msc-istanbul cover msc-mocha ' + Array.prototype.slice.call(process.argv, 2).join(' '), {
  cwd: process.cwd(),
  stdio: [0, 1, 2],
  shell: true,
  windowsHide: true
})
