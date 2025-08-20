const jwt = require("jsonwebtoken");

// Read env variables and set defaults
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
let JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Ensure expiresIn is a valid type (number or string)
if (!/^\d+$/.test(JWT_EXPIRES_IN) && !/^\d+[smhd]$/.test(JWT_EXPIRES_IN)) {
  console.warn(
    `[WARNING] JWT_EXPIRES_IN="${JWT_EXPIRES_IN}" is invalid. Using default "1h".`
  );
  JWT_EXPIRES_IN = "1h";
}

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      user_type: user.user_type,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; // invalid or expired token
  }
};

module.exports = { generateToken, verifyToken };
