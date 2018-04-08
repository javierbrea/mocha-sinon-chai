
const runner = require('../runner')
const libRunner = require('../lib/runner')

const test = require('../index')

test.describe('runner', () => {
  test.it('should return the "lib/runner" methods', () => {
    return test.expect(runner).to.deep.equal(libRunner)
  })
})
