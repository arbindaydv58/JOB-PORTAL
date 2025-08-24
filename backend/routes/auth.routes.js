const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,

} = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password",authenticate(), changePassword);
router.post("/logout", logoutUser);

module.exports = router;
