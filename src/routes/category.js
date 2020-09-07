const router = require("express").Router();
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");
const {
  authorization,
  authorizationSuperAdmin,
} = require("../middleware/auth");
const {
  getCategoryByIdRedis,
  clearDataCategoryRedis,
  getCategoryRedis,
} = require("../middleware/redis");

router.get("/", authorization, getCategoryRedis, getAllCategory);
router.get("/:id", authorization, getCategoryByIdRedis, getCategoryById);

router.post("/", authorization, postCategory);

router.patch(
  "/:id",
  authorizationSuperAdmin,
  clearDataCategoryRedis,
  patchCategory
);

router.delete(
  "/:id",
  authorizationSuperAdmin,
  clearDataCategoryRedis,
  deleteCategory
);

module.exports = router;
