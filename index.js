'use strict';

const tv = require('./lib/tv')
const Rele = require('./lib/Rele')

const amp = new Rele(18,'amp')
const light = new Rele(24,'light')
let manual = false;

tv.start()

tv.on('power-on',()=>{
    manual = false;
    amp.on()
    light.set( isNight() )
})
tv.on('power-off',()=>{
    manual = false;
    amp.off()

    light.off()
    light.off()
})
tv.on('key',(code,name)=>{
    manual = true;
    light.toggle()
})


function isNight(){
    var hour = (new Date()).getHours()|0
    return hour > 17 || hour < 7
}

setInterval(function(){
    if (tv.powerStatus===false) 
        return;

    if (isNight() && light.status===false && !manual){
        console.log('Forced light on')
        light.on()
    }
    if (!isNight() && light.status===true){
        console.log('Forced light off')
        light.off()
    }
},30000)


process.on( 'SIGINT', function() {
    tv.stop();
    amp.stop();
    light.stop();
    process.exit();
});
