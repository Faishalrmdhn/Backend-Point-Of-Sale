const router = require("express").Router();
const {
  getAllOrders,
  getOrdersById,
  postOrders,
} = require("../controller/orders");
const { authorization } = require("../middleware/auth");
const { getOrdersRedis } = require("../middleware/redis");

router.get("/", authorization, getOrdersRedis, getAllOrders);
router.get("/:id", authorization, getOrdersById);

router.post("/", authorization, postOrders);

module.exports = router;
