const router = require("express").Router()
const {getAllOrders,getOrdersById,postOrders} = require('../controller/orders');

router.get("/", getAllOrders)
router.get("/:id", getOrdersById)

router.post("/", postOrders)

module.exports = router;