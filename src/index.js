// Kumpulan middleware utk mengakses route di postman
const route = require("express").Router()

// import route di sini
const product = require('./routes/product')
const category = require('./routes/category')

// buat middle
route.use('/product', product)//path/url endpoint untuk mengelola "product"
route.use('/category', category)
//input middle tiap table di sini

module.exports = route