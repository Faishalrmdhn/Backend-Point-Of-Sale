const router = require("express").Router();
const {
  registerUser,
  loginUser,
  activateAccount,
} = require("../controller/users");

router.post("/register", registerUser);
router.get("/login", loginUser);
router.patch("/admin", activateAccount);

module.exports = router;
