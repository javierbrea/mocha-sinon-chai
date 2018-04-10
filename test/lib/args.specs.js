
const test = require('../../index')

const args = require('../../lib/args')

test.describe('args', () => {
  test.describe('slice method', () => {
    test.it('should return the process arguments, except first and second', () => {
      const originalArgs = process.argv
      process.argv = ['fooParam', 'fooParam2', 'fooParam3']
      test.expect(args.slice()).to.deep.equal(['fooParam3'])
      process.argv = originalArgs
    })
  })
})
