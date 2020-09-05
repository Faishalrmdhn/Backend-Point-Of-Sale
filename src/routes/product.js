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
  clearAllDataProductRedis,
  clearRedisById,
} = require("../middleware/redis");
const uploadImage = require("../middleware/multer");

// [GET]
router.get("/", authorization, getAllProduct);
router.get("/:id", authorization, getProductByIdRedis, getProductById);
router.get("/search/name", getProductByName);
// [POST]
router.post("/", authorization, uploadImage, postProduct);

// [PATCH/PUT]
router.patch("/:id", authorization, uploadImage, clearRedisById, patchProduct);

// [DELETE]
router.delete("/:id", authorization, clearRedisById, deleteProduct); //clearAllDataProductRedis);

module.exports = router;
