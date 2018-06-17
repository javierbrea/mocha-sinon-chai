/* global describe, it, before, beforeEach, after, afterEach */

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const dirtyChai = require('dirty-chai')

chai.use(sinonChai)
chai.use(dirtyChai)

module.exports = {
  before: before,
  beforeEach: beforeEach,
  after: after,
  afterEach: afterEach,
  describe: describe,
  it: it,
  expect: chai.expect,
  assert: chai.assert,
  sinon: sinon
}
