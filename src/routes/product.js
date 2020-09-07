const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductByName,
} = require("../controller/product");
const {
  authorization,
  authorizationSuperAdmin,
} = require("../middleware/auth");
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedis,
} = require("../middleware/redis");
const uploadImage = require("../middleware/multer");

router.get("/", authorization, getProductRedis, getAllProduct);
router.get("/:id", authorization, getProductByIdRedis, getProductById);
router.get("/search/name", authorization, getProductByName);

router.post("/", authorization, uploadImage, postProduct);

router.patch(
  "/:id",
  authorizationSuperAdmin,
  uploadImage,
  clearDataProductRedis,
  patchProduct
);

router.delete(
  "/:id",
  authorizationSuperAdmin,
  clearDataProductRedis,
  deleteProduct
);

module.exports = router;
