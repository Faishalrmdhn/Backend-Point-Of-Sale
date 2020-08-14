//Berisi data semua endpoint
const router = require("express").Router() //import, untuk menandakan isi file ini merupakan router
const {getAllProduct,getProductById,postProduct,patchProduct,deleteProduct} = require('../controller/product');

// [GET]
router.get("/", getAllProduct )
router.get("/:id", getProductById )//:id ->menandakan id yg dijalankan pada query param 

// [POST]
router.post('/', postProduct)

// [PATCH/PUT]
router.patch('/:id', patchProduct)//:id ->menandakan id yg dijalankan pada query param 

// [DELETE]
router.delete('/:id', deleteProduct )//:id ->menandakan id yg dijalankan pada query param 

module.exports = router;