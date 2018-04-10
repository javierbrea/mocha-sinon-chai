'use strict'

const args = require('../args')

require('istanbul/lib/cli').runToCompletion(args.slice())
