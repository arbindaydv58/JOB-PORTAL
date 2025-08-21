const express = require("express");
const {
  createApplication,
  getApplication,
  updateApplication,
  withdrawApplication,
} = require("../controllers/application.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Jobseeker → apply
router.post(
  "/createApplication",
  authenticate(["jobseeker"]),
  createApplication
);
router.get(
  "/getApplication",
  authenticate(["admin", "jobseeker"]),
  getApplication
);

router.patch("/:appId", authenticate(["admin"]), updateApplication);
router.delete("/:appId", authenticate(["jobseeker"]), withdrawApplication);

module.exports = router;
