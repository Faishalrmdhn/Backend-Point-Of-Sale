const router = require("express").Router();
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");
const { authorization } = require("../middleware/auth");
const {
  getCategoryByIdRedis,
  clearDataCategoryRedis,
  getCategoryRedis,
} = require("../middleware/redis");

router.get("/", getCategoryRedis, getAllCategory); //authorization
router.get("/:id",  getCategoryByIdRedis, getCategoryById); //authorization

router.post("/",  postCategory); //authorization

router.patch("/:id",  clearDataCategoryRedis, patchCategory); //authorization

router.delete("/:id", clearDataCategoryRedis, deleteCategory); //authorization

module.exports = router;
