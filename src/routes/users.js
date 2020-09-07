const router = require("express").Router();
const {
  registerUser,
  loginUser,
  activateAccount,
} = require("../controller/users");

const { authorizationSuperAdmin } = require("../middleware/auth");

router.post("/register", registerUser);
router.get("/login", loginUser);
router.patch("/admin", authorizationSuperAdmin, activateAccount); //

module.exports = router;
