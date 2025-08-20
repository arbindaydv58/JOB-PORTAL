const { CustomError } = require("./errorHandler.middleare");
const { verifyToken } = require("../utils/jwt.utils");
const pool = require("../data/db");

const authenticate = (roles) => {
  return async (req, res, next) => {
    try {
      // ✅ token comes from cookie (cookie-parser is handling parsing)
      const access_token = req.cookies?.access_token;

      if (!access_token) {
        throw new CustomError("Unauthorized. Access denied.", 401);
      }

      const decodedData = verifyToken(access_token);

      if (!decodedData) {
        throw new CustomError("Invalid token. Access denied.", 401);
      }

      if (Date.now() > decodedData.exp * 1000) {
        throw new CustomError("Session expired. Access Denied", 401);
      }

      const result = await pool.query(
        "SELECT id, email, full_name, user_type FROM users WHERE id = $1",
        [decodedData.id]
      );

      const user = result.rows[0];

      if (!user) {
        throw new CustomError("Unauthorized. Access denied.", 401);
      }

      if (roles && !roles.includes(user.user_type)) {
        throw new CustomError("Unauthorized. Access denied.", 403);
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { authenticate };
