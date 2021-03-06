'use strict'

const tv = require('./tv')
const app = require('express')()

app.listen(8000, () => {
  console.log('listening 8000')
})

app.get('/status', (req, res) => {
  res.send({
    status: tv.powerStatus,
  })
})
app.get('/standby', (req, res) => {
  tv.standby()
  res.send({
    done: true,
  })
})
app.get('/turn-on', (req, res) => {
  tv.turnOn()
  res.send({
    done: true,
  })
})
