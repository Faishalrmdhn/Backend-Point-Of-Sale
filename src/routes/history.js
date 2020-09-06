const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  postHistory,
  CheckOut,
  patchHistory,
} = require("../controller/history");
const { authorization } = require("../middleware/auth");
const {
  getHistoryByIdRedis,
  clearDataHistoryRedis,
  getHistoryRedis,
} = require("../middleware/redis");

// [GET]
router.get("/", getAllHistory); //authorization getHistoryRedis
router.get("/:id", getHistoryByIdRedis, getHistoryById); //authorization

// [POST]
router.post("/", postHistory);  //authorization
router.post("/CheckOut", CheckOut); // authorization
// [PATCH/PUT]
router.patch("/:id", clearDataHistoryRedis, patchHistory);//authorization

module.exports = router;
