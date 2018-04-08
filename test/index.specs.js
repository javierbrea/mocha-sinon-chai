
const sinon = require('sinon')
const chai = require('chai')

const test = require('../index')

test.describe('index', () => {
  test.it('should return mocha "after" method', () => {
    test.expect(test.after).to.not.be.undefined()
  })

  test.it('should return mocha "afterEach" method', () => {
    test.expect(test.afterEach).to.not.be.undefined()
  })

  test.it('should return mocha "before" method', () => {
    test.expect(test.before).to.not.be.undefined()
  })

  test.it('should return mocha "beforeEach" method', () => {
    test.expect(test.beforeEach).to.not.be.undefined()
  })

  test.it('should return mocha "describe" method', () => {
    test.expect(test.describe).to.not.be.undefined()
  })

  test.it('should return mocha "it" method', () => {
    test.expect(test.it).to.not.be.undefined()
  })

  test.it('should return chai "expect" method', () => {
    test.expect(test.expect).to.not.be.undefined()
    test.expect(test.expect).to.deep.equal(chai.expect)
  })

  test.it('should return sinon', () => {
    test.expect(test.sinon).to.not.be.undefined()
    test.expect(test.sinon).to.deep.equal(sinon)
  })
})
