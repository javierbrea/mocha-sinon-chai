
const test = require('../../../index')
const mocks = require('../../mocks')

const testBinRequire = function (binName, binPath, requireRegex) {
  test.describe(binName + ' binary', () => {
    const originalFileRegex = new RegExp(requireRegex)

    test.beforeEach(() => {
      mocks.require.enable({
        avoidLoad: [
          originalFileRegex
        ]
      })
    })

    test.afterEach(() => {
      mocks.require.disable()
    })

    test.it('should require the original ' + binName + ' javascript file', () => {
      require(binPath)
      return test.expect(mocks.require.test(originalFileRegex)).to.equal(true)
    })
  })
}

testBinRequire('_mocha', '../../../lib/bin/_mocha', 'mocha\\/bin\\/_mocha')
testBinRequire('mocha', '../../../lib/bin/mocha', 'mocha\\/bin\\/mocha')
