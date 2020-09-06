const router = require("express").Router();
const {
  getAllOrders,
  getOrdersById,
  postOrders,
} = require("../controller/orders");
const { authorization } = require("../middleware/auth");
const { getOrdersRedis } = require("../middleware/redis");

router.get("/", getOrdersRedis, getAllOrders); //authorization
router.get("/:id", getOrdersById); //authorization

router.post("/", postOrders); //authorization

module.exports = router;
