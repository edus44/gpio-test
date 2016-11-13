'use strict';

const tv = require('./lib/tv')
const rele = require('./lib/rele')

tv.start()
rele.start()

tv.on('power-on',()=>{
    console.log('ON');
    rele.val(1,0)
    rele.val(2,0)
})
tv.on('power-off',()=>{
    console.log('OFF');
    rele.val(1,1)
    rele.val(2,1)
})
tv.on('key',(code,name)=>{
    console.log('key',code,name);
	rele.val(1, rele.val(1) ? 0 : 1 )
    
})

process.on( 'SIGINT', function() {
    tv.stop();
    rele.stop();
    process.exit();
});
