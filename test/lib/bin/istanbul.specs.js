
const test = require('../../../index')
const mocks = require('../../mocks')
const paths = require('../../../lib/paths')

const istanbulBinPath = paths.findBin('istanbul')

test.describe('istanbul binary', () => {
  const originalBinRegex = /\S*node_modules\/\.bin\/istanbul$/
  const binPath = '../../../lib/bin/istanbul'
  let istanbulBin
  let istanbulStub

  test.beforeEach(() => {
    mocks.require.enable()
    istanbulBin = require(istanbulBinPath)
    istanbulStub = test.sinon.stub(istanbulBin, 'runToCompletion')
  })

  test.afterEach(() => {
    istanbulBin.runToCompletion.restore()
    mocks.require.disable()
  })

  test.it('should find and require the original istanbul binary file from "node_modules/.bin" folder', () => {
    require(binPath)
    return test.expect(mocks.require.test(originalBinRegex)).to.equal(true)
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
