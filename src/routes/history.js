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
router.get("/", authorization,getHistoryRedis,getAllHistory); 
router.get("/:id", authorization,getHistoryByIdRedis, getHistoryById); 

// [POST]
router.post("/", authorization,postHistory);  
router.post("/CheckOut", authorization,CheckOut);  
// [PATCH/PUT]
router.patch("/:id",authorization, clearDataHistoryRedis, patchHistory);

module.exports = router;
