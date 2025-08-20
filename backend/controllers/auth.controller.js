const bcrypt = require("bcrypt");
const pool = require("../data/db");

const { generateToken } = require("../utils/jwt.utils");
const { asyncHandler } = require("../utils/asynce-handler.utils");
const { CustomError } = require("../middlewares/errorHandler.middleare");

const SALT_ROUNDS = 10;

// -------- REGISTER --------
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, full_name, user_type } = req.body;

  if (!email || !password || !full_name || !user_type) {
    throw new CustomError("All fields are required", 400);
  }

  if (!["admin", "jobseeker"].includes(user_type)) {
    throw new CustomError("Invalid user_type", 400);
  }

  // Check if email exists
  const exists = await pool.query("SELECT id FROM users WHERE email=$1", [
    email,
  ]);
  if (exists.rows.length) {
    throw new CustomError("Email already registered", 400);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    `INSERT INTO users (email, password, full_name, user_type) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, email, full_name, user_type`,
    [email, hashedPassword, full_name, user_type]
  );

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: result.rows[0],
  });
});

// -------- LOGIN --------
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password, user_type } = req.body;

  if (!email || !password || !user_type) {
    throw new CustomError("All fields are required", 400);
  }

  if (!["admin", "jobseeker"].includes(user_type)) {
    throw new CustomError("Invalid user_type", 400);
  }

  const result = await pool.query(
    `SELECT id, email, full_name, user_type, password 
     FROM users 
     WHERE email = $1 AND user_type = $2`,
    [email, user_type]
  );

  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invalid email or password", 401);
  }

  const token = generateToken(user);

  // Set cookie
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3600000, // 1 hour
  });

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      user_type: user.user_type,
    },
  });
});

// -------- CHANGE PASSWORD (logged-in user) --------
const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // from auth middleware

  if (!oldPassword || !newPassword) {
    throw new CustomError("Old and new passwords are required", 400);
  }

  const result = await pool.query("SELECT password FROM users WHERE id=$1", [userId]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    return next(new CustomError("Old password is incorrect", 400));
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await pool.query("UPDATE users SET password=$1 WHERE id=$2", [hashedPassword, userId]);

  res.status(200).json({ message: "Password changed successfully" });
});

module.exports = { registerUser, loginUser ,changePassword };
