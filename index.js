'use strict';

const debug = require('debug')('app')
debug('init')

const Gpio = require('onoff').Gpio
const inquirer = require('inquirer')
const rele = require('./rele')
rele.start()

process.on('SIGINT',exit)

loop()

function exit(){
	debug('exit')
	rele.stop()
	process.exit(0)
}

function loop(){
	var choices = [];

	choices.push({
		name: 'Toggle K1 ('+rele.val(1)+')',
		value : 'K1'
	})

	choices.push({
		name : 'Toggle K2 ('+rele.val(2)+')',
		value : 'K2'
	})

	choices.push('exit')
	
	inquirer.prompt([{
			type: 'list',
			name: 'type',
			message: 'What to do?',
			choices:choices 
	}])
	.then(result=>{
		if (result.type == 'K1')
			rele.val(1, rele.val(1) ? 0 : 1 )
		if (result.type == 'K2')
			rele.val(2, rele.val(2) ? 0 : 1 )
		if (result.type == 'exit')
			exit()
	})
	.then(loop,loop)
}

