const bcrypt = require("bcrypt");
const pool = require("../data/db");
const { generateToken } = require("../utils/jwt.utils");
const { asyncHandler } = require("../utils/asynce-handler.utils");
const { CustomError } = require("../middlewares/errorHandler.middleare");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../utils/emailServices");

const SALT_ROUNDS = 10;

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, full_name, user_type } = req.body;

  if (!email || !password || !full_name || !user_type) {
    throw new CustomError("All fields are required", 400);
  }
  if (!["admin", "jobseeker"].includes(user_type)) {
    throw new CustomError("Invalid user_type", 400);
  }

  const exists = await pool.query("SELECT id FROM users WHERE email=$1", [
    email,
  ]);
  if (exists.rows.length)
    throw new CustomError("Email already registered", 400);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    `INSERT INTO users (email, password, full_name, user_type, is_verified) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, email, full_name, user_type, is_verified`,
    [email, hashedPassword, full_name, user_type, false]
  );

  const user = result.rows[0];
  const verificationToken = generateToken({
    id: user.id,
    user_type: user.user_type,
  });

  await sendVerificationEmail(user.email, verificationToken, user.full_name);

  res.status(201).json({
    message:
      "User registered successfully. Please check your email for verification.",
    success: true,
    user,
  });
});

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, user_type } = req.body;

  if (!email || !password || !user_type) {
    throw new CustomError("All fields are required", 400);
  }

  const result = await pool.query(
    `SELECT id, email, full_name, user_type, password, is_verified 
     FROM users WHERE email=$1 AND user_type=$2`,
    [email, user_type]
  );
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invalid email or password", 401);
  }
  if (!user.is_verified) {
    throw new CustomError("Please verify your email before logging in", 403);
  }

  const token = generateToken(user);

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
  });

  res.status(200).json({
    message: "Login successful",
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      user_type: user.user_type,
    },
  });
});

// VERIFY EMAIL
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) throw new CustomError("Token missing", 400);

  const { valid, decoded } = require("../utils/jwt.utils").verifyToken(token);
  if (!valid) throw new CustomError("Invalid or expired token", 400);

  await pool.query("UPDATE users SET is_verified=$1 WHERE id=$2", [
    true,
    decoded.id,
  ]);

  const {
    rows: [user],
  } = await pool.query("SELECT email, full_name FROM users WHERE id=$1", [
    decoded.id,
  ]);
  await sendWelcomeEmail(user.email, user.full_name);

  res.json({ message: "Email verified successfully. You can now log in." });
});

// CHANGE PASSWORD
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!oldPassword || !newPassword) {
    throw new CustomError("Old and new passwords are required", 400);
  }

  const {
    rows: [user],
  } = await pool.query("SELECT password FROM users WHERE id=$1", [userId]);
  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    throw new CustomError("Old password is incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await pool.query("UPDATE users SET password=$1 WHERE id=$2", [
    hashedPassword,
    userId,
  ]);

  res.json({ message: "Password changed successfully" });
});

// LOGOUT
const logoutUser = (req, res) => {
  res.cookie("access_token", "", { maxAge: 0 });
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  changePassword,
  logoutUser,
};
