'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    userName: String,
    postalCode: String,
    address: String
})

module.exports = mongoose.model('User', UserSchema)