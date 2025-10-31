const express = require("express");
// const pool = require("./data/db");
const app = express();
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const { errorHandler } = require("./middlewares/errorHandler.middleare");
const jobsRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `https://job-portal-2-byi8.onrender.com`, // frontend URL
    credentials: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    messageg: "Server is working",
    timestamp: new Date().toISOString(),
  });
});

//users route
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Job routes
app.use("/api/jobs", jobsRoutes);

//Application routes
app.use("/api/application", applicationRoutes);

app.all("/{*all}", (req, res, next) => {
  const message = `Can not ${req.method} on ${req.originalUrl}`;
  const err = new CustomError(message, 404);

  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
