module.exports = {
  ...require('./auth')
}

module.exports.notFound = (req, res, next) => {
  const err = new Error (`Not found - ${req.originalUrl}`);
  err.status = 404; // or res.status(404)
  next(err);
}

module.exports.errors = (err, req, res, next) => {
  res.status(err.status || 400).json({ // 500 means our server is broken
    err: err.message || "Something went wrong"
  })
}