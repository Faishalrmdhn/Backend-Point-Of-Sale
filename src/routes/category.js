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
  clearCategoryRedisById,
} = require("../middleware/redis");

router.get("/", authorization, getAllCategory);
router.get("/:id", authorization, getCategoryByIdRedis, getCategoryById);

router.post("/", authorization, postCategory);

router.patch("/:id", authorization, clearCategoryRedisById, patchCategory);

router.delete("/:id", authorization, clearCategoryRedisById, deleteCategory);

module.exports = router;
