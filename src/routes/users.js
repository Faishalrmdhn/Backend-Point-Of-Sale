const router = require("express").Router();
const {
  registerUser,
  loginUser,
  activateAccount,
} = require("../controller/users");

const {authorization} =require('../middleware/auth')

router.post("/register", registerUser);
router.get("/login", loginUser);
router.patch("/admin", activateAccount);//authorization

module.exports = router;
