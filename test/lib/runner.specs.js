
const path = require('path')
const childProcess = require('child_process')

const test = require('../../index')

const runner = require('../../lib/runner')

const absoluteBinPath = function (fileName) {
  return path.resolve(__dirname, '..', '..', 'node_modules', '.bin', fileName)
}

test.describe('runner', () => {
  let childProcessStub

  const getChildProcessArgument = function (callIndex) {
    callIndex = callIndex || 0
    return childProcessStub.getCall(0).args[0]
  }

  const expectChildProcessCallToHaveString = function (str) {
    test.expect(getChildProcessArgument()).to.have.string(str)
  }

  test.beforeEach(() => {
    childProcessStub = test.sinon.stub(childProcess, 'execSync')
  })

  test.afterEach(() => {
    childProcessStub.restore()
  })

  test.describe('run method', () => {
    test.it('should open an "istanbul cover mocha" child process with they binary absolute paths', () => {
      const mochaPath = absoluteBinPath('_mocha')
      const istanbulPath = absoluteBinPath('istanbul')
      let stubArgument

      runner.run()
      stubArgument = getChildProcessArgument()
      test.expect(stubArgument).to.have.string(mochaPath)
      test.expect(stubArgument).to.have.string(istanbulPath)
    })

    test.it('should open the child process with the current cwd as an option', () => {
      runner.run()
      test.expect(childProcessStub.getCall(0).args[1].cwd).to.equal(process.cwd())
    })

    test.it('should accept as argument an array with parameters, or an string with whitespaces as parameters separator', () => {
      const fooParams = [
        'param1',
        'param2'
      ]
      runner.run(fooParams)
      runner.run(fooParams.join(' '))
      test.expect(childProcessStub.getCall(0).args).to.deep.equal(childProcessStub.getCall(1).args)
    })

    test.it('should pass to istanbul all parameters preceded by the "--istanbul" parameter', () => {
      let istanbulParameters = '--fooParam2 --fooParam3'
      runner.run('--fooParam1 --istanbul ' + istanbulParameters + ' --mocha --fooParam4')
      expectChildProcessCallToHaveString('/istanbul ' + istanbulParameters + ' cover')
    })

    test.it('should not pass any parameter to istanbul if are not specified', () => {
      runner.run('--mocha --fooParam4')
      expectChildProcessCallToHaveString('/istanbul cover')
    })

    test.it('should add an extra "--" before mocha parameters', () => {
      let mochaParameters = '--fooMochaParam1 --foo2'
      runner.run('--mocha ' + mochaParameters)
      expectChildProcessCallToHaveString('-- ' + mochaParameters)
    })

    test.it('should not pass any parameter to mocha if are not specified', () => {
      runner.run('--istanbul --testing --')
      test.expect(/_mocha$/.test(getChildProcessArgument())).to.equal(true)
    })

    test.it('should pass to mocha all parameters preceded by the "--mocha" parameter', () => {
      let mochaParameters = '--fooMochaParam1 testing'
      runner.run('--fooParam1 --mocha ' + mochaParameters + ' --istanbul --fooParam4')
      expectChildProcessCallToHaveString('/_mocha -- ' + mochaParameters)
    })

    test.it('should not pass any parameter to istanbul if are not specified', () => {
      runner.run('--mocha --fooParam4')
      expectChildProcessCallToHaveString('/istanbul cover')
    })

    test.it('should ignore parameters that are not preceded by "--mocha" or by "--istanbul"', () => {
      let strangeParameter = '--strangeParameter'
      runner.run(strangeParameter)
      test.expect(getChildProcessArgument()).to.not.have.string(strangeParameter)
    })

    test.it('should find the istanbul and mocha parameters and pass it in the correct place, no matter the order they are provided', () => {
      let mochaParams = '--fooMochaParam --fooParam2'
      let istanbulParams = '--fooIstanbulParam --fake'
      runner.run('strangeParam1 --mocha ' + mochaParams + ' --istanbul ' + istanbulParams)
      runner.run('wrongParameter2 --istanbul ' + istanbulParams + ' --mocha ' + mochaParams)
      test.expect(childProcessStub.getCall(0).args).to.deep.equal(childProcessStub.getCall(1).args)
    })
  })
})
