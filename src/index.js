// Kumpulan middleware utk mengakses route di postman
const route = require("express").Router()

// import route di sini
const product = require('./routes/product')
const category = require('./routes/category')
const history = require('./routes/history')
const orders = require('./routes/orders')


// buat middle
route.use('/product', product)//path/url endpoint untuk mengelola "product"
route.use('/category', category)
route.use('/history', history)
route.use('/orders', orders)



module.exports = route