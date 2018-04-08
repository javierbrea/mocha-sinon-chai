
const fs = require('fs')

const test = require('../../../index')
const mocks = require('../../mocks')

const testBinRequire = function (binName, binPath) {
  test.describe(binName + ' binary', () => {
    const originalBinRegex = new RegExp('\\S*node_modules\\/\\.bin\\/' + binName + '$')
    let fsExistsStub

    test.beforeEach(() => {
      mocks.require.enable({
        avoidLoad: [
          originalBinRegex
        ]
      })
      fsExistsStub = test.sinon.stub(fs, 'existsSync').returns(true)
    })

    test.afterEach(() => {
      mocks.require.disable()
      fs.existsSync.restore()
    })

    test.it('should find and require the original ' + binName + ' binary file from "node_modules/.bin" folder', () => {
      require(binPath)
      return test.expect(mocks.require.test(originalBinRegex)).to.equal(true)
    })

    test.it('should throw an error if the ' + binName + ' binary file is not found', (done) => {
      fsExistsStub.returns(false)
      let error
      try {
        require(binPath)
      } catch (err) {
        error = err
      }
      test.expect(error).to.be.an('error')
      test.expect(error.message).to.have.string('bin not found')
      done()
    })
  })
}

testBinRequire('_mocha', '../../../lib/bin/_mocha')
testBinRequire('mocha', '../../../lib/bin/mocha')
