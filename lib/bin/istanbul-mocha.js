'use strict'

const args = require('../args')
const runner = require('../runner')

runner.run(args.slice())
  .catch(error => {
    process.exit(error.code)
  })
