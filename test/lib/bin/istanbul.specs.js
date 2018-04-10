
const test = require('../../../index')
const mocks = require('../../mocks')
const paths = require('../../../lib/paths')

test.describe('istanbul binary', () => {
  const originalBinRegex = /\S*node_modules\/\.bin\/istanbul$/
  const binPath = '../../../lib/bin/istanbul'
  let istanbul
  let istanbulStub

  test.beforeEach(() => {
    mocks.require.enable()
    istanbul = require('istanbul/lib/cli')
    istanbulStub = test.sinon.stub(istanbul, 'runToCompletion')
  })

  test.afterEach(() => {
    istanbul.runToCompletion.restore()
    mocks.require.disable()
  })

  test.it('should call to the istanbul runToCompletion function', () => {
    require(binPath)
    return test.expect(istanbulStub).to.have.been.called()
  })

  test.it('should call to the istanbul runToCompletion function passing to it the process parameters, except first and second', (done) => {
    const originalArgs = process.argv
    process.argv = ['fooParam', 'fooParam2', 'fooParam3']
    require(binPath)
    test.expect(istanbulStub).to.have.been.calledWith(['fooParam3'])
    process.argv = originalArgs
    done()
  })
})
