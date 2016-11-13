var NodeCec = require( 'node-cec' ).NodeCec;
var CEC     = require( 'node-cec' ).CEC;

var keyCodes = {}
for (let i in CEC.UserControlCode){
    keyCodes[CEC.UserControlCode[i]] = i
}

const EventEmitter = require('events').EventEmitter
class Tv extends EventEmitter{
    start(){
        this.started = true;
        this.powerStatus = null;


        this.cec = new NodeCec( 'pi' );
        this.cec.start( 'cec-client','-d','8');

        
        this.cec.once( 'ready', (client)=>{
            setInterval(()=>{
                client.sendCommand( 0xf0, CEC.Opcode.GIVE_DEVICE_POWER_STATUS );
            },15000)
        });


        this.cec.on( 'STANDBY',  (packet, status)=>{
            if (this.powerStatus || this.powerStatus == null){
                this.powerStatus = false;
                this.emit('power-off')                
            }
        })

        this.cec.on( 'REPORT_POWER_STATUS',  (packet, status)=>{
            switch(status){
                case CEC.PowerStatus.ON:
                    if (!this.powerStatus || this.powerStatus == null){
                        this.powerStatus = true;
                        this.emit('power-on')                
                    }
                break
                case CEC.PowerStatus.STANDBY:
                    if (this.powerStatus || this.powerStatus == null){
                        this.powerStatus = false;
                        this.emit('power-off')                
                    }
                break;
            }

        });

        this.cec.on( 'USER_CONTROL_PRESSED', (packet, opcode)=>{
            this.emit('key',opcode,keyCodes[opcode])
        });


    }
    stop(){
        if (this.started)
            this.cec.stop()
        this.started = false;
    }
}

module.exports = new Tv()