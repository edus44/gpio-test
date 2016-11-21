'use strict'

const Gpio = require('onoff').Gpio

class Rele{
    constructor(port,name){
        this.debug = require('debug')('app:rele:'+name)
		this.gpio = new Gpio(port, 'high')
        this.savedStatus = true;
    }

    get(){
        return !this.gpio.readSync()
    }

    set(val){
        return this.gpio.readSync( val ? 0 : 1 )
    }

    on(){
        this.debug('on')
        return this.set(true)
    }

    off(){
        this.debug('off')
        return this.set(false)
    }

    toggle(){
        var to = !this.get();
        this.debug('toggle',to)
        return this.set( to )
    }

    save(){
        this.savedStatus = this.get()
    }
    restore(){
        this.set(this.savedStatus)
    }

	stop(){
		this.gpio.unexport()
		debug('stop')
	}
}

module.exports = new Rele()