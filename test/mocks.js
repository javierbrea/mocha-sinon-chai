
const Module = require('module')

const Require = function () {
  let orig = Module._load
  let loaded = []

  const cleanRequireCache = function () {
    Object.keys(require.cache).forEach((key) => {
      delete require.cache[key]
    })
  }

  const reset = function () {
    loaded = []
  }

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
    cleanRequireCache()
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

const ChildProcessMock = function () {
  let codeToReturn = 0
  const on = function (eventName, callBack) {
    callBack(codeToReturn)
  }
  const returns = function (code) {
    codeToReturn = code
  }
  return {
    on: on,
    returns: returns
  }
}

const PromiseMock = function () {
  let errorToReject
  const catcher = function (callBack) {
    if (errorToReject) {
      callBack(errorToReject)
    }
  }
  const rejects = function (error) {
    errorToReject = error
  }
  const resolves = function () {
    errorToReject = null
  }
  return {
    catch: catcher,
    rejects: rejects,
    resolves: resolves
  }
}

module.exports = {
  require: new Require(),
  ChildProcess: ChildProcessMock,
  Promise: PromiseMock
}
