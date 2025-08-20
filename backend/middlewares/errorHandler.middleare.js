class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.success = false;
    Error.captureStackTrace(this, CustomError);
  }
}

const errorHandler = (error, req, res, next) => {
  const statusCode = error?.statusCode || 500;
  const success = error?.success || false;
  const status = error?.status || "error";
  const message = error?.message || "Inteenal Server Error";

  res.status(statusCode).json({
    message,
    success,
    status,
    data: null,
  });
};

module.exports = { CustomError, errorHandler };
