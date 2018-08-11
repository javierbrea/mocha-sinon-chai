# Mocha-Sinon-Chai

Wrapper for [Mocha][mocha-url], [Sinon][sinon-url], [Chai][chai-url], [sinon-chai][sinon-chai-url] and [dirty-chai][dirty-chai-url]

It also includes [Istanbul][istanbul-url] as a dependency, and provides "proxy" `bin` files that allow to launch tests and generate coverages.

Use this package to implement test runner, assertions, spies, mocks and stubs importing an unique dependency, and avoid using global variables in your tests.


[![Build status][travisci-image]][travisci-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Quality Gate][quality-gate-image]][quality-gate-url] [![js-standard-style][standard-image]][standard-url]

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url] [![License][license-image]][license-url]

---

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

  test.it('should return chai assert', () => {
    test.expect(test.assert).to.not.be.undefined()
  })

  test.it('should return sinon', () => {
    test.expect(test.sinon).to.not.be.undefined()
  })
})

```

## Tests runner, and coverage

Binary "proxies" for "istanbul cover" and "mocha" are provided. This is because in `npm install`, binaries from dependencies of dependencies sometimes are not added to `.bin` folder as symlinks.

Add the next script to your `package.json` file:

```json
{
  "scripts": {
    "test": "mocha-sinon-chai"
  },
  "devDependencies" : {
    "mocha-sinon-chai": "3.0.0"
  }
}
```

```shell
npm test -- --mocha my-test-folder
```

All received parameters preceded by `--istanbul` will be passed to `istanbul cover` command, and all parameters preceded by `--mocha` will be passed to `_mocha` command:

```shell
npm test -- --istanbul --include-all-sources --print=detail --mocha --recursive my-test-folder
# same as "./node_modules/.bin/istanbul --include-all-sources --print=detail cover ./node_modules/.bin/_mocha -- --recursive my-test/folder"
```

You can read more about [istanbul](https://github.com/gotwarlost/istanbul#configuring) or [mocha](https://mochajs.org/#usage) configurations in their own documentation pages.

Add your test custom configuration to your `package.json` file:
```json
{
  "scripts": {
    "test": "mocha-sinon-chai --istanbul --include-all-sources --print=detail --verbose --mocha --recursive my-test-folder"
  }
}
```

### Configuration using files

Configuration file `.istanbul.yml` in your package root is supported as well.

### Custom execution

Proxies for "istanbul", "mocha" and "_mocha" original binaries are available too:

```json
{
  "scripts": {
    "test": "msc-mocha --recursive test",
    "coverage": "msc-istanbul --include-all-sources --print=detail cover msc_mocha -- --recursive test"
  }
}
```

> Note: In Windows environments, you can't pass a binary to istanbul. The "coverage" script in the previous example should be:

```json
{
  "scripts": {
    "coverage": "msc-istanbul --include-all-sources --print=detail cover node_modules/mocha-sinon-chai/bin/msc_mocha -- --recursive test"
  }
}
```

## Why

* Because Mocha works with globals.
* Because I used to import all these dependencies in all my test files.
* Because now, my tests are compliant with [standardjs][standardjs-url].

## Contributing

Contributions are welcome! Read the [contributing guide lines][contributing-url] and [code of conduct][code-of-conduct-url], check out the [issues][issues-url] or the [PRs][prs-url], and make your own if you want something that you don't see there.

[prs-url]: https://github.com/javierbrea/mocha-sinon-chai/pulls
[contributing-url]: https://github.com/javierbrea/mocha-sinon-chai/blob/master/.github/CONTRIBUTING.md
[code-of-conduct-url]: https://github.com/javierbrea/mocha-sinon-chai/blob/master/.github/CODE_OF_CONDUCT.md
[issues-url]: https://github.com/javierbrea/mocha-sinon-chai/issues

[istanbul-url]: https://istanbul.js.org/
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
[npm-downloads-image]: https://img.shields.io/npm/dm/mocha-sinon-chai.svg
[npm-downloads-url]: https://www.npmjs.com/package/mocha-sinon-chai
[npm-dependencies-image]: https://img.shields.io/david/javierbrea/mocha-sinon-chai.svg
[npm-dependencies-url]: https://david-dm.org/javierbrea/mocha-sinon-chai
[travisci-image]: https://travis-ci.org/javierbrea/mocha-sinon-chai.svg?branch=master
[travisci-url]: https://travis-ci.org/javierbrea/mocha-sinon-chai
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=mocha-sinon-chai&metric=alert_status
[quality-gate-url]: https://sonarcloud.io/dashboard?id=mocha-sinon-chai
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
