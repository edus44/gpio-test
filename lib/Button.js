const Gpio = require('onoff').Gpio
const { EventEmitter } = require('events')

module.exports = class Button extends EventEmitter {
  constructor(pin) {
    super()
    const debug = require('debug')('app:button:' + pin)
    debug('init')
    const gpio = new Gpio(pin, 'in', 'both')
    gpio.watch((err, value) => {
      if (err) {
        debug(err)
        return
      }

      //Pushed
      if (value === 0) {
          debug('pushed')
          this.emit('pushed')
      }
    })
  }
}
