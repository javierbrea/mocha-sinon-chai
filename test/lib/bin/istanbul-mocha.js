
const test = require('../../../index')
const mocks = require('../../mocks')

test.describe('istanbul-mocha binary', () => {
  const fileToTest = '../../../lib/bin/istanbul-mocha'
  let runner
  let promiseMock
  let runnerStub

  test.beforeEach(() => {
    mocks.require.enable()
    promiseMock = new mocks.Promise()
    runner = require('../../../lib/runner')
    runnerStub = test.sinon.stub(runner, 'run').returns(promiseMock)
    test.sinon.stub(process, 'exit')
    test.sinon.spy(console, 'log')
  })

  test.afterEach(() => {
    mocks.require.disable()
    runner.run.restore()
    console.log.restore()
    process.exit.restore()
  })

  test.it('should call to the runner.run function passing to it the process parameters, except first and second', () => {
    const originalArgs = process.argv
    process.argv = ['fooParam', 'fooParam2', 'fooParam3']
    promiseMock.resolves()
    require(fileToTest)
    test.expect(runnerStub).to.have.been.calledWith(['fooParam3'])
    process.argv = originalArgs
  })

  test.it('should log error and exit process with the received error code if the test runner fails', () => {
    const errorCode = 3
    const errorMessage = 'Foo error message'
    const error = new Error(errorMessage)
    error.code = errorCode
    promiseMock.rejects(error)
    require(fileToTest)
    return Promise.all([
      test.expect(console.log).to.have.been.calledWith(errorMessage),
      test.expect(process.exit).to.have.been.calledWith(errorCode)
    ])
  })
})
