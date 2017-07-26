'use strict'

const Product = require('../models/product')

// Retrieve all products

function getProducts (req, res) {

    Product.find({}, function (err, products) {
        if (err) return res.status(500).send({message: 'Error when making request'})
        if (!products) return res.status(400).send({message: 'No products found'})

        res.status(200).send({products: products})
    })
}

// Upload products into the data base

function saveProduct (req, res) {
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
}

// Update product in the data base

function updateProduct (req, res) {
    let productId = req.params.productId
    let update = req.body.params

    Product.findByIdAndUpdate(productId, update,  function(err, productUpdated){
        if (err) return res.status(500).send({message: `Error when making changes in the product: ${err}`})

        res.status(200).send({product: productUpdated})

    })
}

// Retrieve specific product in the data base

function getProduct (req, res) {
    let productId = req.params.productId

    Product.findById(productId, function(err, product){
        if (err) return res.status(500).send({message: `Error when making request: ${err}`})
        if (!product) return res.status(400).send({message: 'Product does not exist'})

        res.status(200).send({product: product})
    })
}

// Remove a specific product in the data base

function removeProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, function (err, product) {
        if (err) return res.status(500).send({message: `Error when trying to delete product: ${err}`})

        product.remove(function (err){
            if (err) return res.status(500).send({message: `Error when trying to delete product: ${err}`})
            res.status(200).send({message: 'The product have been deleted succesfully'})
        })
    })
}

module.exports = {
    getProducts,
    saveProduct,
    updateProduct,
    getProduct,
    removeProduct
}