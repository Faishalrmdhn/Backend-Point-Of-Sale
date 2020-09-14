const router = require("express").Router();
const {
  registerUser,
  loginUser,
  activateAccount,
  getAllUser,
} = require("../controller/users");

const { authorizationSuperAdmin } = require("../middleware/auth");

router.get("/", getAllUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/admin", authorizationSuperAdmin, activateAccount);

module.exports = router;
