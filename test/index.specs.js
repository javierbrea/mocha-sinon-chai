/* global describe, it, before, beforeEach, after, afterEach */

const test = require('../index')

const sinon = require('sinon')
const chai = require('chai')

test.describe('index', () => {
  test.it('should return mocha "after" method', () => {
    test.expect(test.after).to.not.be.undefined()
    test.expect(test.after).to.deep.equal(after)
  })

  test.it('should return mocha "afterEach" method', () => {
    test.expect(test.afterEach).to.not.be.undefined()
    test.expect(test.afterEach).to.deep.equal(afterEach)
  })

  test.it('should return mocha "before" method', () => {
    test.expect(test.before).to.not.be.undefined()
    test.expect(test.before).to.deep.equal(before)
  })

  test.it('should return mocha "beforeEach" method', () => {
    test.expect(test.beforeEach).to.not.be.undefined()
    test.expect(test.beforeEach).to.deep.equal(beforeEach)
  })

  test.it('should return mocha "describe" method', () => {
    test.expect(test.describe).to.not.be.undefined()
    test.expect(test.describe).to.deep.equal(describe)
  })

  test.it('should return mocha "it" method', () => {
    test.expect(test.it).to.not.be.undefined()
    test.expect(test.it).to.deep.equal(it)
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
