const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  postHistory,
  CheckOut,
  patchHistory,
  getHistoryOrder,
  getMonthHistory,
} = require("../controller/history");
const {
  authorization,
  authorizationSuperAdmin,
} = require("../middleware/auth");
const {
  getHistoryByIdRedis,
  clearDataHistoryRedis,
  getHistoryRedis,
} = require("../middleware/redis");

router.get("/", authorization, getHistoryRedis, getAllHistory);
router.get("/:id", authorization, getHistoryByIdRedis, getHistoryById);
router.get("/order/total", getHistoryOrder);
// router.get("/income/month", getMonthHistory);

router.post("/", authorization, postHistory);
router.post("/CheckOut", authorization, CheckOut);

router.patch(
  "/:id",
  authorizationSuperAdmin,
  clearDataHistoryRedis,
  patchHistory
);

module.exports = router;
