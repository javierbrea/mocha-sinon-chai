'use strict'

const childProcess = require('child_process')

const paths = require('./paths')

const mochaBinPath = paths.findBin('_mocha')
const istanbulBinPath = paths.findBin('istanbul')

childProcess.execSync(istanbulBinPath + ' cover ' + mochaBinPath + ' ' + Array.prototype.slice.call(process.argv, 2).join(' '), {
	cwd: process.cwd(),
	stdio:[0,1,2],
	shell: true,
	windowsHide: true
})
