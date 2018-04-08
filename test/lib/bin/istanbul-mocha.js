
const test = require('../../../index')
const mocks = require('../../mocks')

test.describe('istanbul-mocha binary', () => {
  let runner
  let runnerStub

  test.before(() => {
    mocks.require.enable()
    runner = require('../../../lib/runner')
    runnerStub = test.sinon.stub(runner, 'run')
  })

  test.after(() => {
    mocks.require.disable()
    runner.run.restore()
  })

  test.it('should call to the runner.run function passing to it the process parameters, except first and second', (done) => {
    const originalArgs = process.argv
    process.argv = ['fooParam', 'fooParam2', 'fooParam3']
    require('../../../lib/bin/istanbul-mocha')
    test.expect(runnerStub).to.have.been.calledWith(['fooParam3'])
    process.argv = originalArgs
    done()
  })
})
