const errorHandler = (err, req, res, next) => {
  console.log(err, "<<< error");
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
    // res.status(400).json({ message: error.errors[0].message });
    // error.errors[0].map((el) => el.message)
  } else if (err.name === "Invalid_credentials") {
    code = 401;
    message = "error email or password";
  } else if (err.name === "email required") {
    code = 400;
    message = "Email required";
  } else if (err.name === "password required") {
    code = 400;
    message = "Password required";
  } else if (err.name === "invalid token" || err.name === "JsonWebTokenError") {
    //JsonWebTokenError dari verify token di authentication
    code = 401;
    message = "Invalid token";
  } else if (err.name === "Genre not found") {
    code = 404;
    message = "Genre not found";
  } else if (err.name === "Error not found") {
    code = 404;
    message = "Movie not found";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
