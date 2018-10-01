const debug = require('debug')('app:main')
debug('init')
const Button = require('./lib/Button')
const resetButton = new Button(20)
const ejectButton = new Button(21)

resetButton.on('pushed', () => {
  debug('reset')
})

ejectButton.on('pushed', () => {
  debug('eject')
})
