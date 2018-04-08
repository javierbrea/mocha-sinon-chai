
const path = require('path')

const test = require('../../index')

const paths = require('../../lib/paths')

test.describe('paths', () => {
  let resolveSpy
  test.beforeEach(() => {
    resolveSpy = test.sinon.spy(path, 'resolve')
  })

  test.afterEach(() => {
    resolveSpy.restore()
  })

  test.describe('findBin method', () => {
    test.it('should find and return the absolute path to the provided file name in "node_modules/.bin" self or parents folders', () => {
      const mochaPath = path.resolve(__dirname, '..', '..', 'node_modules', '.bin', 'mocha')
      return test.expect(paths.findBin('mocha')).to.equal(mochaPath)
    })

    test.it('should throw an error if does not find the file', () => {
      let error
      try {
        paths.findBin('fooMocha')
      } catch (err) {
        error = err
      }
      test.expect(error).to.be.an('error')
      test.expect(error.message).to.have.string('bin not found')
    })

    test.it('should search the file in a maximum of five parent node_modules folders', () => {
      try {
        paths.findBin('fooMocha2')
      } catch (err) {
        test.expect(resolveSpy.callCount).to.equal(5)
      }
    })
  })
})
