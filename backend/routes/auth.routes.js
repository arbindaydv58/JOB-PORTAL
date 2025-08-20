const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,

} = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password",authenticate(), changePassword);

module.exports = router;
