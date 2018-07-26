'use strict'

const Gpio = require('onoff').Gpio
const { EventEmitter } = require('events')

module.exports = class Button extends EventEmitter {
  constructor(pin, timeout) {
    super()
    const debug = require('debug')('app:button:' + pin)
    debug('init')
    const gpio = new Gpio(pin, 'in', 'both')
    let timer
    gpio.watch((err, value) => {
      if (err) {
        console.log(err)
        return
      }
      clearTimeout(timer)

      //Pushed
      if (value === 0) {
        timer = setTimeout(() => {
          debug('pushed')
          this.emit('pushed')
        }, timeout || 600)
      }
    })
  }
}
