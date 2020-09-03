const router = require("express").Router();
const {
  getAllOrders,
  getOrdersById,
  postOrders,
} = require("../controller/orders");
const { authorization } = require("../middleware/auth");

router.get("/", authorization, getAllOrders);
router.get("/:id", authorization, getOrdersById);

router.post("/", authorization, postOrders);

module.exports = router;
