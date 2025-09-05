const { CustomError } = require("./errorHandler.middleare");
const { verifyToken } = require("../utils/jwt.utils");
const pool = require("../data/db");

const authenticate = (roles = []) => {
  return async (req, res, next) => {
    try {
      const access_token = req.cookies?.access_token;
      if (!access_token) throw new CustomError("No token provided", 401);

      const { valid, decoded, error } = verifyToken(access_token);
      if (!valid) throw new CustomError(error || "Invalid token", 401);

      const {
        rows: [user],
      } = await pool.query(
        "SELECT id, email, full_name, user_type FROM users WHERE id = $1",
        [decoded.id]
      );
      if (!user) throw new CustomError("User not found", 401);

      if (roles.length && !roles.includes(user.user_type)) {
        throw new CustomError("Forbidden: Insufficient permissions", 403);
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { authenticate };
