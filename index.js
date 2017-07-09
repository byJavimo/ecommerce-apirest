'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app  = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

// Retrieve all the products

app.get('/api/products', function (req, res) {
    res.send(200, {products: []})
})

// Upload products into the data base

app.post('/api/products', function (req, res) {
    console.log(req.body)
    res.send(200,{message: "Everything was fine.Product uploaded correctly"})
})

// Retrieve a specif products

app.get('/api/products/:productId', function (req, res) {

})

// Update information of a specific product

app.put('/api/products/:productId', function (req, res) {


})



// Remove an specific product from the data base

app.delete('/api/products/:productId', function (req,res) {

})

app.listen( port , function () {
    console.log(`API REST running on http://localhost:${port}`)
})