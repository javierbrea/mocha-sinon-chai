'use strict'

const args = require('../args')
const runner = require('../runner')

runner.run(args.slice())
  .catch(error => {
    console.log(error.message)
    process.exit(error.code || 1)
  })
