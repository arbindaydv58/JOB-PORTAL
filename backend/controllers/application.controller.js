const pool = require("../data/db");
const { CustomError } = require("../middlewares/errorHandler.middleare");
const { asyncHandler } = require("../utils/asynce-handler.utils");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Setup Cloudinary storage for CVs
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jobportal/cvs",
    resource_type: "raw", // for PDF/DOC files
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const upload = multer({ storage });

// Middleware to handle single CV file
const uploadCV = upload.single("cv");

// create application (jobseeker only)
const createApplication = asyncHandler(async (req, res) => {
  const { job_id, cover_letter } = req.body;
  const applicant_id = req.user.id;

  // Only jobseekers can apply
  if (req.user.user_type !== "jobseeker") {
    throw new CustomError("Only jobseekers can apply for jobs", 403);
  }

  // Prevent duplicate applications
  const existing = await pool.query(
    `SELECT 1 FROM applications WHERE job_id = $1 AND applicant_id = $2`,
    [job_id, applicant_id]
  );
  if (existing.rows.length > 0) {
    throw new CustomError("You have already applied for this job", 400);
  }

  // Check if CV file uploaded
  if (!req.file) {
    throw new CustomError("Please upload your CV", 400);
  }

  const cv_file = req.file.path; // Cloudinary URL

  // Insert new application
  const inserted = await pool.query(
    `INSERT INTO applications (job_id, applicant_id, cover_letter, cv_file, status, applied_at) 
     VALUES ($1, $2, $3, $4, 'pending', NOW()) 
     RETURNING id`,
    [job_id, applicant_id, cover_letter, cv_file]
  );

  const applicationId = inserted.rows[0].id;

  // Fetch application with user's full_name
  const result = await pool.query(
    `SELECT a.*, u.full_name 
     FROM applications a
     JOIN users u ON a.applicant_id = u.id
     WHERE a.id = $1`,
    [applicationId]
  );

  res.status(201).json({
    success: true,
    data: result.rows[0],
  });
});


//get application (admin and jobs)
const getApplication = asyncHandler(async (req, res) => {
  let result;

  if (req.user.user_type === "admin") {
    result = await pool.query(
      `SELECT a.*, j.title AS job_title, u.full_name AS applicant_name, u.email AS applicant_email
         FROM applications a
         JOIN jobs j ON a.job_id = j.id
         JOIN users u ON a.applicant_id = u.id
         WHERE j.posted_by = $1
         ORDER BY a.applied_at DESC`,
      [req.user.id]
    );
  } else {
    result = await pool.query(
      `SELECT a.*, j.title AS job_title
         FROM applications a
         JOIN jobs j ON a.job_id = j.id
         WHERE a.applicant_id = $1
         ORDER BY a.applied_at DESC`,
      [req.user.id]
    );
  }

  res.json({
    success: true,
    data: result.rows,
  });
});

// update application (admin only)
const updateApplication = asyncHandler(async (req, res) => {
  // Only admin can update applications
  if (req.user.user_type !== "admin") {
    throw new CustomError("Only admins can update application", 403);
  }

  const { appId } = req.params; // Application ID from URL
  const status = req.body.status || req.params.status; // Status from body

  // Validate status
  const validStatuses = ["pending", "reviewed", "accepted", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new CustomError("Invalid status value", 400);
  }

  // Check if application exists and get job owner
  const ownershipCheck = await pool.query(
    `
    SELECT j.posted_by
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.id = $1
    `,
    [appId]
  );

  if (ownershipCheck.rows.length === 0) {
    throw new CustomError("Application not found", 404);
  }

  const jobOwnerId = ownershipCheck.rows[0].posted_by;
  if (jobOwnerId !== req.user.id) {
    throw new CustomError("Unauthorized to update this application", 403);
  }

  // Update application status
  const result = await pool.query(
    `UPDATE applications SET status = $1 WHERE id = $2 RETURNING *`,
    [status, appId]
  );

  res.json({
    success: true,
    data: result.rows[0],
  });
});

//Withdraw Application

const withdrawApplication = asyncHandler(async (req, res) => {
  if (req.user.user_type !== "jobseeker") {
    throw new CustomError("Only jobseekers can withdraw applications", 403);
  }
  const { appId } = req.params;

  const check = await pool.query(
    `SELECT * FROM applications WHERE id = $1 AND applicant_id = $2`,
    [appId, req.user.id]
  );
  if (check.rows.length === 0) {
    throw new CustomError("Application not found or not owned by you", 404);
  }

  await pool.query(`DELETE FROM applications WHERE id = $1`, [appId]);

  res.json({
    success: true,
    message: "Application withdrawn successfully",
  });
});

module.exports = {
  createApplication,
  getApplication,
  updateApplication,
  withdrawApplication,
  uploadCV
};

