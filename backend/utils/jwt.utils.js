const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;
let JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Validate format (1h, 60, 2d, etc.)
if (!/^\d+$/.test(JWT_EXPIRES_IN) && !/^\d+[smhd]$/.test(JWT_EXPIRES_IN)) {
  console.warn(
    `[WARNING] Invalid JWT_EXPIRES_IN="${JWT_EXPIRES_IN}". Using default "1h".`
  );
  JWT_EXPIRES_IN = "1h";
}

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, user_type: user.user_type }, // keep payload minimal
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN, algorithm: "HS256" }
  );
};

const verifyToken = (token) => {
  try {
    return { valid: true, decoded: jwt.verify(token, JWT_SECRET) };
  } catch (err) {
    return { valid: false, error: err.message };
  }
};

module.exports = { generateToken, verifyToken };
