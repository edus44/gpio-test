'use strict'

const debug = require('debug')('app:rele')
const Gpio = require('onoff').Gpio

class Rele{
	constructor(){
	}
	start(){
		debug('start')
		this.k1 = new Gpio(24, 'high')
		this.k2 = new Gpio(18, 'high')
		debug('started')
	}
	val(i,data){
		var k = this['k'+i]
		if (!k) return;
		if (typeof data !== 'undefined'){
			debug('set',i,data)
			return k.writeSync(data)
		}
		var val = k.readSync()
		debug('get',i,val)
		return val;
			
	}
	stop(){
		debug('stop')
		this.k1.unexport()
		this.k2.unexport()
		debug('stopped')
	}
}

module.exports = new Rele()