function errorHandler(err, req, res, next) {
  console.error(err, "<======================== error"); // ntr dulu

  let status = 500;
  let message = "Internal Server Error";
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeForeignKeyConstraintError":
      status = 400;
      message = "Your FK id User/Category is not define";
      break;
    case "BadRequest":
      status = 400;
      message = err.message;
      break;
    case "Unauthorized":
      status = 401;
      message = err.message;
      break;
    case "Forbidden":
    case "OtpExpired":
      status = 403;
      message = err.message;
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
    case "NotFound":
      status = 404;
      message = err.message;
      break;
    default:
      break;
  }
  res.status(status).json({ message: message });
}

module.exports = errorHandler;
