'use strict';

const moment = require('moment');
const tv = require('./lib/tv')
const Rele = require('./lib/Rele')

const amp = new Rele(18,'amp')
const light = new Rele(24,'light')
tv.start()

tv.on('power-on',()=>{
    console.log('on');
    amp.on()
    light.restore()
})
tv.on('power-off',()=>{
    console.log('off');
    amp.off()

    light.save()
    light.off()
})
tv.on('key',(code,name)=>{
    console.log('key',code,name);
    light.toggle()
})


function isNight(){
    return moment('19:00','HH:mm').isAfter()
}

process.on( 'SIGINT', function() {
    tv.stop();
    amp.stop();
    light.stop();
    process.exit();
});
