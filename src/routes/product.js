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
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (reques, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (request, file, callback) => {
    // console.log(file);
    callback(
      null,
      file.fieldname +
        "-" +
        new Date().toISOString().replace(/:/g, "-") +
        "-" +
        file.originalname
    );
  },
});
let upload = multer({ storage: storage });

// [GET]
router.get("/", authorization, getAllProduct);
router.get("/:id", authorization, getProductByIdRedis, getProductById);
router.get("/search/name", getProductByName);
// [POST]
router.post("/", authorization, upload.single("product_image"), postProduct);

// [PATCH/PUT]
router.patch("/:id", authorization, clearRedisById, patchProduct);

// [DELETE]
router.delete("/:id", authorization, clearRedisById, deleteProduct); //clearAllDataProductRedis);

module.exports = router;
