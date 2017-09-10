const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    picture: String,
    price: {type:Number, default: 0},
    category: {type: String, enum: ['computers','laptop','phones','accesories']},
    description: String,
    isFeatured: {type: Boolean, default: false}
})

module.exports = mongoose.model('Product', ProductSchema)