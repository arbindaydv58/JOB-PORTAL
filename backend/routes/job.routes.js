const express = require("express");
const {
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
} = require("../controllers/job.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/search", searchJobs);
router.get("/", getJobs);
router.get("/:id", getJobById);

// Admin-only route
router.post("/createjobs", authenticate(["admin"]), createJob);
router.put("/:id", authenticate(["admin"]), updateJob);
router.delete("/:id", authenticate(["admin"]), deleteJob);

module.exports = router;
