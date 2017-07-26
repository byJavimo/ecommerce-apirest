'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, function(err) {
    if (err) {
        console.log('Data base connection error');
    } else {
        console.log("Data base connection working");
    }
    console.log("Data base connection working")

    app.listen( config.port , function () {
        console.log(`API REST running on http://localhost:${config.port}`)
    })
})
