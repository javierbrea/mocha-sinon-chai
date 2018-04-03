
const Module = require('module')

const Require = function () {
  let orig = Module._load
  let loaded = []

  const regexsTest = function (regexs, strings) {
    let i
    let z
    let found = false
    for (i = 0; i < strings.length; i++) {
      for (z = 0; z < regexs.length; z++) {
        if (regexs[z].test(strings[i])) {
          found = true
        }
      }
    }
    return found
  }

  const test = function (regex) {
    return regexsTest([regex], loaded)
  }

  const disable = function () {
    reset()
    Module._load = orig
  }

  const enable = function (options) {
    options = options || {}
    disable()
    Module._load = function (name) {
      loaded.push(name)
      if (!regexsTest(options.avoidLoad || [], [name])) {
        return orig.apply(this, arguments)
      }
    }
  }

  const reset = function () {
    loaded = []
  }

  const check = function (name) {
    return loaded.indexOf(name) !== -1
  }

  return {
    enable: enable,
    disable: disable,
    reset: reset,
    check: check,
    test: test
  }
}

module.exports = {
  require: new Require()
}
