'use strict'

const Gpio = require('onoff').Gpio

module.exports = class Rele{
    constructor(port,name){
        this.debug = require('debug')('app:rele:'+name,port)
                this.gpio = new Gpio(port, 'high')
        this.debug('init')
        this.savedStatus = true;
        this.status = false;
    }

    get(){
        return !!this.gpio.readSync()
    }

    set(val){
        val = !!val;
        this.debug('set',val)
        this.status = val;
        return this.gpio.writeSync( val ? 1 : 0 )
    }

    on(){
        return this.set(true)
    }

    off(){
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
                this.debug('stop')
        }
}