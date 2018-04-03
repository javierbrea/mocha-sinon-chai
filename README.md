# Mocha-Sinon-Chai

Wrapper for [Mocha][mocha-url], [Sinon][sinon-url], [Chai][chai-url], [sinon-chai][sinon-chai-url] and [dirty-chai][dirty-chai-url]

Use this package to implement test runner, assertions, spies, mocks and stubs importing an unique dependency, and avoid using global variables in your tests.

[![Build status][travisci-image]][travisci-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Quality Gate][quality-gate-image]][quality-gate-url] [![js-standard-style][standard-image]][standard-url]

[![Node version][node-version-image]][node-version-url] [![NPM version][npm-image]][npm-url] [![NPM dependencies][npm-dependencies-image]][npm-dependencies-url]

[![NPM downloads][npm-downloads-image]][npm-downloads-url] [![License][license-image]][license-url]

---

## Why

* Because Mocha works with globals.
* Because I used to import all these dependencies in all my test files.
* Because now, my tests are compliant with [standardjs][standardjs-url].

## Usage

```js
const test = require('mocha-sinon-chai')

test.describe('mocha-sinon-chai', () => {
  test.it('should return mocha globals', () => {
    test.expect(test.after).to.not.be.undefined()
    test.expect(test.afterEach).to.not.be.undefined()
    test.expect(test.before).to.not.be.undefined()
    test.expect(test.beforeEach).to.not.be.undefined()
    test.expect(test.describe).to.not.be.undefined()
    test.expect(test.it).to.not.be.undefined()
  })

  test.it('should return chai expect', () => {
    test.expect(test.expect).to.not.be.undefined()
  })

  test.it('should return sinon', () => {
    test.expect(test.sinon).to.not.be.undefined()
  })
})

```

## Runner

Add the next script to your `package.json` file:

```json
{
  "scripts": {
    "test": "mocha-sinon-chai -- --recursive test"
  }
}
```

Or use directly the provided proxies for istanbul and mocha:

```json
{
  "scripts": {`
    "test": "msc-istanbul cover msc-mocha -- --recursive test"
  }
}
```

> This "proxies" are provided because in `npm install`, binaries from dependencies of dependencies are not added to `.bin` folder as symlinks.

[mocha-url]: https://mochajs.org
[sinon-url]: http://sinonjs.org/
[chai-url]: http://www.chaijs.com
[sinon-chai-url]: https://www.npmjs.com/package/sinon-chai
[dirty-chai-url]: https://www.npmjs.com/package/dirty-chai
[standardjs-url]: https://standardjs.com/

[coveralls-image]: https://coveralls.io/repos/github/javierbrea/mocha-sinon-chai/badge.svg
[coveralls-url]: https://coveralls.io/github/javierbrea/mocha-sinon-chai
[license-image]: https://img.shields.io/npm/l/mocha-sinon-chai.svg
[license-url]: https://github.com/javierbrea/mocha-sinon-chai/blob/master/LICENSE
[node-version-image]: https://img.shields.io/node/v/mocha-sinon-chai.svg
[node-version-url]: https://github.com/javierbrea/mocha-sinon-chai/blob/master/package.json
[npm-image]: https://img.shields.io/npm/v/mocha-sinon-chai.svg
[npm-url]: https://www.npmjs.com/package/mocha-sinon-chai
[npm-downloads-image]: https://img.shields.io/npm/dm/mocha-sinon-chai.svg
[npm-downloads-url]: https://www.npmjs.com/package/mocha-sinon-chai
[npm-dependencies-image]: https://img.shields.io/david/javierbrea/mocha-sinon-chai.svg
[npm-dependencies-url]: https://david-dm.org/javierbrea/mocha-sinon-chai
[travisci-image]: https://travis-ci.org/javierbrea/mocha-sinon-chai.svg?branch=master
[travisci-url]: https://travis-ci.org/javierbrea/mocha-sinon-chai
[quality-gate-image]: https://sonarcloud.io/api/badges/gate?key=mocha-sinon-chai
[quality-gate-url]: https://sonarcloud.io/dashboard/index/mocha-sinon-chai
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/