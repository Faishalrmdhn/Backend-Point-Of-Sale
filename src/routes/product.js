const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductByName,
} = require("../controller/product");
const { authorization } = require("../middleware/auth");
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedis,
} = require("../middleware/redis");
const uploadImage = require("../middleware/multer");

router.get("/",authorization, getProductRedis, getAllProduct); 
router.get("/:id", authorization,getProductByIdRedis, getProductById); 
router.get("/search/name", authorization,getProductByName); 

router.post("/",authorization,uploadImage, postProduct); 

router.patch("/:id", authorization,uploadImage, clearDataProductRedis, patchProduct); 

router.delete("/:id", authorization,clearDataProductRedis, deleteProduct); 

module.exports = router;
