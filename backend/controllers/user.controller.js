const pool = require("../data/db");
const { asyncHandler } = require("../utils/asynce-handler.utils");

const getAllUser = asyncHandler(async (req, res) => {
  const users = await getUsers();
  res.status(200).json({
    message: "Users fetched successfully",
    success: true,
    data: users,
  });
});

async function getUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

module.exports = {
  getAllUser,
};
