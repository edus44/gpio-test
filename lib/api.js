'use strict';

const tv = require('./lib/tv')
const app = require('express')()

app.listen(8000,()=>{
    console.log('listening 8000')
})

app.get('/status',(req,res)=>{
    res.send({
        status: tv.powerStatus
    })
})