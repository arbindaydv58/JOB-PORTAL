const pool = require("../data/db");
const { CustomError } = require("../middlewares/errorHandler.middleare");

const { asyncHandler } = require("../utils/asynce-handler.utils");

// Get all jobs (with admin name)
const getJobs = asyncHandler(async (req, res) => {
  const result = await pool.query(`
    SELECT jobs.*, users.full_name AS posted_by_name
    FROM jobs
    JOIN users ON jobs.posted_by = users.id
    ORDER BY jobs.created_at DESC
  `);

  res.json(result.rows);
});

// Get job by id
const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT jobs.*, users.full_name AS posted_by_name 
     FROM jobs
     JOIN users ON jobs.posted_by = users.id
     WHERE jobs.id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new CustomError("Job not found", 404);
  }

  res.json(result.rows[0]);
});

// Create a job
const createJob = asyncHandler(async (req, res) => {
  const { title, description, company, location, salary_range } = req.body;

  if (!title || !description || !company) {
    throw new CustomError("Missing required fields", 400);
  }

  const result = await pool.query(
    `INSERT INTO jobs (title, description, company, salary_range, location, posted_by)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, company, salary_range, location, req.user.id]
  );

  res.status(201).json({
    success: true,
    job: result.rows[0],
  });
});

// Update a job (only owner admin can update)
const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, salary_range } = req.body;

  // Check if job exists
  const jobCheck = await pool.query(`SELECT * FROM jobs WHERE id = $1`, [id]);

  if (jobCheck.rows.length === 0) {
    throw new CustomError("Job not found", 404);
  }

  // Check if current user is the owner
  if (jobCheck.rows[0].posted_by !== req.user.id) {
    throw new CustomError(
      "Unauthorized: you can only update your own jobs",
      403
    );
  }

  // Update job
  const result = await pool.query(
    `UPDATE jobs 
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         company = COALESCE($3, company),
         location = COALESCE($4, location),
         salary_range = COALESCE($5, salary_range),
         updated_at = NOW()
     WHERE id = $6 RETURNING *`,
    [title, description, company, location, salary_range, id]
  );

  res.json({
    success: true,
    job: result.rows[0],
  });
});

// Delete a job (only owner admin can delete)
const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if job exists
  const jobCheck = await pool.query(`SELECT * FROM jobs WHERE id = $1`, [id]);

  if (jobCheck.rows.length === 0) {
    throw new CustomError("Job not found", 404);
  }

  // Check if the logged-in admin is the owner
  if (jobCheck.rows[0].posted_by !== req.user.id) {
    throw new CustomError(
      "Unauthorized: you can only delete your own jobs",
      403
    );
  }

  // Delete job
  await pool.query(`DELETE FROM jobs WHERE id = $1`, [id]);

  res.json({
    success: true,
    message: "Job deleted successfully",
  });
});

// Search Job
const searchJobs = asyncHandler(async (req, res) => {
  let { query, location } = req.query;

  // If both are empty, throw error
  if (!query && !location) {
    throw new CustomError("Search query or location is required", 400);
  }

  // Use '%' if missing so it matches everything
  query = query ? `%${query}%` : '%';
  location = location ? `%${location}%` : '%';

  const sql = `
    SELECT jobs.*, users.full_name AS posted_by_name
    FROM jobs
    JOIN users ON jobs.posted_by = users.id
    WHERE (jobs.title ILIKE $1 OR jobs.description ILIKE $1 OR jobs.company ILIKE $1)
      AND jobs.location ILIKE $2
    ORDER BY jobs.created_at DESC
  `;

  const values = [query, location];

  const result = await pool.query(sql, values);

  res.json({
    success: true,
    data: result.rows,
  });
});


module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs
};
