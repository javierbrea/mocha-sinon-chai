
const test = require('../../../index')
const mocks = require('../../mocks')

test.describe('_mocha binary', () => {
  const originalBinRegex = /\S*node_modules\/\.bin\/_mocha$/

  test.before(() => {
    mocks.require.enable({
      avoidLoad: [
        originalBinRegex
      ]
    })
  })

  test.after(() => {
    mocks.require.disable()
  })

  test.it('should find and require the original _mocha binary file ', () => {
    require('../../../lib/bin/_mocha')
    return test.expect(mocks.require.test(originalBinRegex)).to.equal(true)
  })
})
