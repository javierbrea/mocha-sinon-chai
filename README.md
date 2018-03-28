# Mocha-Sinon-Chai

Wrapper for [Mocha][mocha-url], [Sinon][sinon-url], [Chai][chai-url], [sinon-chai][sinon-chai-url] and [dirty-chai][dirty-chai-url]

Use this package to implement test runner, assertions, spies, mocks and stubs importing an unique dependency, and avoid using global variables in your tests.

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
    test.expect(test.expect).to.not.be.undefined()
    test.expect(test.it).to.not.be.undefined()
  })

  test.it('should return sinon object', () => {
    test.expect(test.sinon).to.not.be.undefined()
  })
})

```

[mocha-url]: https://mochajs.org
[sinon-url]: http://sinonjs.org/
[chai-url]: http://www.chaijs.com
[sinon-chai-url]: https://www.npmjs.com/package/sinon-chai
[dirty-chai-url]: https://www.npmjs.com/package/dirty-chai
[standardjs-url]: https://standardjs.com/
