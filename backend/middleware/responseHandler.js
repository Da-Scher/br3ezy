exports.responseHandler = (req, res, next) => {
  res.sendSuccess = function (status, data) {
    console.log(`Success on ${req.method} ${req.url}`);
    res.status(status).json({
      success: true,
      data: data,
    });
  };

  res.sendError = function (status, error) {
    console.error(`Error in ${req.method} ${req.url}: ${error.message}`);
    res.status(status).json({
      success: false,
      error: error.message,
    });
  };

  next();
};
