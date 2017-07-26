'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app  = express()
const port = process.env.PORT || 3001

const Product = require('./models/product')

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

// Retrieve all the products

app.get('/api/products', function (req, res) {

    Product.find({}, function (err, products) {
        if (err) return res.status(500).send({message: 'Error when making request'})
        if (!products) return res.status(400).send({message: 'No products found'})

        res.status(200).send({products: products})
    })

})

// Upload products into the data base

app.post('/api/products', function (req, res) {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()

    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save(function (err, productStored) {
        if (err) res.status(500).send({message: `Error saving product in data base: ${err}`})

        res.status(200).send({product: productStored})
    })
})

// Retrieve a specif products

app.get('/api/products/:productId', function (req, res) {
    let productId = req.params.productId

    Product.findById(productId, function(err, product){
        if (err) return res.status(500).send({message: 'Error when making request'})
        if (!product) return res.status(400).send({message: 'Product does not exist'})

        res.status(200).send({product: product})
    })

})

// Update information of a specific product

app.put('/api/products/:productId', function (req, res) {
    let productId = req.params.productId
    let update = req.params

    Product.findByIdAndUpdate(productId, update,  function(err, productUpdated){
        if (err) return res.status(500).send({message: 'Error when making changes in the product'})

        res.status(200).send({product: productUpdated})

    })

})



// Remove an specific product from the data base

app.delete('/api/products/:productId', function (req,res) {
    let productId = req.params.productId

    Product.findById(productId, function (err, product) {
        if (err) return res.status(500).send({message: 'Error when trying to delete product'})

        product.remove(function (err){
            if (err) return res.status(500).send({message: 'Error when trying to delete product'})
            res.status(200).send({message: 'The product have been deleted succesfully'})
        })
    })

})

mongoose.connect('mongodb://localhost:27017/ecommerce', function(err, res) {
    if (err) {
        console.log('Data base connection error');
    } else {
        console.log("Data base connection working");
    }
    console.log("Data base connection working")

    app.listen( port , function () {
        console.log(`API REST running on http://localhost:${port}`)
    })
})
