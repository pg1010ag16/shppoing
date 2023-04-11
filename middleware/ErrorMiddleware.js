const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    code: err.statusCode,
    res: err.data,
    stack: err.stack,
    err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    // send errors to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      code: err.statusCode,
      res: err.data,
    });
  } else {
    // get actual error
    console.log("Error 💥", err);

    // send a genric res to client
    res.status(500).json({
      status: "error",
      message: "Something went wrong...",
      code: 500,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Internal Server Error";

  //  JOI Error Details Handler
  if (err.data) {
    err.data = err.data.map((err) => err.message);
  }

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else {
    sendProdError(err, res);
  }
};
