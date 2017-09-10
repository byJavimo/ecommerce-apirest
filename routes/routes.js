'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const api = express.Router()

// ##########################
// ##### PRODUCTS ROUTES ####
// ##########################

// Retrieve all the products

api.get('/products', productCtrl.getProducts)

// Upload products into the data base

api.post('/products', productCtrl.saveProduct)

// Retrieve a specif products

api.get('/products/:productId', productCtrl.getProduct)

// Update information of a specific product

api.put('/products/:productId', productCtrl.updateProduct)

// Remove an specific product from the data base

api.delete('/products/:productId', productCtrl.removeProduct)

module.exports = api
