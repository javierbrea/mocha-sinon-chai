
const path = require('path')
const childProcess = require('child_process')

const test = require('../../index')
const mocks = require('../mocks')

const runner = require('../../lib/runner')

test.describe('runner', () => {
  let childProcessStub
  let childProcessMock

  const getChildProcessArgument = function (callIndex, argIndex) {
    return childProcessStub.getCall(callIndex || 0).args[argIndex || 0]
  }

  test.beforeEach(() => {
    childProcessMock = new mocks.ChildProcess()
    childProcessStub = test.sinon.stub(childProcess, 'fork').returns(childProcessMock)
  })

  test.afterEach(() => {
    childProcessStub.restore()
  })

  test.describe('run method', () => {
    test.it('should run an "istanbul cover _mocha" child process fork using absolute paths', () => {
      const istanbulPath = path.resolve(__dirname, '..', '..', 'node_modules', 'istanbul', 'lib', 'cli.js')
      const mochaPath = path.resolve(__dirname, '..', '..', 'node_modules', 'mocha', 'bin', '_mocha')

      return runner.run()
        .then(() => {
          return Promise.all([
            test.expect(getChildProcessArgument()).to.equal(istanbulPath),
            test.expect(getChildProcessArgument(0, 1)[1]).to.equal(mochaPath)
          ])
        })
    })

    test.it('should open the child process with the current cwd as an option', () => {
      return runner.run()
        .then(() => {
          return test.expect(getChildProcessArgument(0, 2).cwd).to.equal(process.cwd())
        })
    })

    test.it('should reject the promise with an error containing the code if the process ends with a code different of 0', () => {
      const errorCode = 3
      childProcessMock.returns(3)
      return runner.run()
        .then(() => {
          return Promise.reject(new Error())
        })
        .catch(err => {
          return Promise.all([
            test.expect(err.message).to.include('Error'),
            test.expect(err.code).to.equal(errorCode)
          ])
        })
    })

    test.it('should accept as argument an array with parameters, or an string with whitespaces as parameters separator', () => {
      const fooParams = [
        'param1',
        'param2'
      ]
      return runner.run(fooParams)
        .then(() => {
          return runner.run(fooParams.join(' '))
            .then(() => {
              return test.expect(childProcessStub.getCall(0).args).to.deep.equal(childProcessStub.getCall(1).args)
            })
        })
    })

    test.it('should pass to istanbul all parameters preceded by the "--istanbul" parameter', () => {
      let istanbulParameters = ['--fooParam2', '--fooParam3']
      return runner.run('--fooParam1 --istanbul ' + istanbulParameters.join(' ') + ' --mocha --fooParam4')
        .then(() => {
          let processArgs = getChildProcessArgument(0, 1)
          return Promise.all([
            test.expect(processArgs[0]).to.equal(istanbulParameters[0]),
            test.expect(processArgs[1]).to.equal(istanbulParameters[1]),
            test.expect(processArgs[2]).to.equal('cover')
          ])
        })
    })

    test.it('should not pass any parameter to istanbul if are not specified', () => {
      return runner.run('--mocha --fooParam4')
        .then(() => {
          return test.expect(getChildProcessArgument(0, 1)[0]).to.equal('cover')
        })
    })

    test.it('should add an extra "--" before mocha parameters', () => {
      let mochaParameters = ['--fooMochaParam1', '--fooMochaParam2']
      return runner.run('--mocha ' + mochaParameters.join(' '))
        .then(() => {
          let processArgs = getChildProcessArgument(0, 1)
          return Promise.all([
            test.expect(processArgs[0]).to.equal('cover'),
            test.expect(processArgs[2]).to.equal('--'),
            test.expect(processArgs[3]).to.equal(mochaParameters[0]),
            test.expect(processArgs[4]).to.equal(mochaParameters[1])
          ])
        })
    })

    test.it('should not pass any parameter to mocha if are not specified', () => {
      return runner.run('--istanbul --testing')
        .then(() => {
          return test.expect(/_mocha$/.test(getChildProcessArgument(0, 1).pop())).to.equal(true)
        })
    })

    test.it('should pass to mocha all parameters preceded by the "--mocha" parameter', () => {
      let mochaParameters = ['--fooMochaParam2', '--fooParam3']
      return runner.run('--istanbul --fooParam1 --mocha ' + mochaParameters.join(' '))
        .then(() => {
          let processArgs = getChildProcessArgument(0, 1)
          return Promise.all([
            test.expect(processArgs[3]).to.equal('--'),
            test.expect(processArgs[4]).to.equal(mochaParameters[0]),
            test.expect(processArgs[5]).to.equal(mochaParameters[1])
          ])
        })
    })

    test.it('should ignore parameters that are not preceded by "--mocha" or by "--istanbul"', () => {
      let strangeParameter = '--strangeParameter'
      return runner.run(strangeParameter)
        .then(() => {
          return test.expect(getChildProcessArgument(0, 1).join(' ')).to.not.have.string(strangeParameter)
        })
    })

    test.it('should find the istanbul and mocha parameters and pass it in the correct place, no matter the order they are provided', () => {
      let mochaParams = '--fooMochaParam --fooParam2'
      let istanbulParams = '--fooIstanbulParam --fake'
      return runner.run('strangeParam1 --mocha ' + mochaParams + ' --istanbul ' + istanbulParams)
        .then(() => {
          return runner.run('wrongParameter2 --istanbul ' + istanbulParams + ' --mocha ' + mochaParams)
            .then(() => {
              return test.expect(childProcessStub.getCall(0).args).to.deep.equal(childProcessStub.getCall(1).args)
            })
        })
    })
  })
})
