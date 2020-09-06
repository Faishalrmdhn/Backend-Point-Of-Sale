const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductByName,
} = require("../controller/product");
// const { authorization } = require("../middleware/auth");
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedis,
} = require("../middleware/redis");
const uploadImage = require("../middleware/multer");

router.get("/", getAllProduct); //authorization, getProductRedis
router.get("/:id", getProductByIdRedis, getProductById); //authorization
router.get("/search/name", getProductByName); //authorization

router.post("/", uploadImage, postProduct); //authorization

router.patch("/:id", uploadImage, clearDataProductRedis, patchProduct); //authorization

router.delete("/:id", clearDataProductRedis, deleteProduct); //authorization

module.exports = router;
