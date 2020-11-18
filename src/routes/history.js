const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  postHistory,
  CheckOut,
  patchHistory,
  getHistoryOrder,
  getMonthHistory,
  getTodayIncome,
  getYearIncome,
  getRecentOrders
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

router.get("/", authorization,getAllHistory); 
router.get("/:id", authorization, getHistoryByIdRedis, getHistoryById);
router.get("/order/total", authorization, getHistoryOrder);
router.get("/income/today", authorization, getTodayIncome);
router.get("/income/year", getYearIncome);
router.get('/order/recent', getRecentOrders)

router.post("/", authorization, postHistory);
router.post("/CheckOut", authorization, CheckOut);

router.patch(
  "/:id",
  authorizationSuperAdmin,
  clearDataHistoryRedis,
  patchHistory
);

module.exports = router;
