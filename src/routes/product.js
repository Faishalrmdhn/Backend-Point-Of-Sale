//Berisi data semua endpoint
const router = require("express").Router() 
const {getAllProduct,getProductById,postProduct,patchProduct,deleteProduct,getProductByName} = require('../controller/product');

// [GET]
router.get("/", getAllProduct )
router.get("/id", getProductById ) 
router.get("/search", getProductByName)
// [POST]
router.post('/', postProduct)

// [PATCH/PUT]
router.patch('/:id', patchProduct) 

// [DELETE]
router.delete('/:id', deleteProduct ) 

module.exports = router;