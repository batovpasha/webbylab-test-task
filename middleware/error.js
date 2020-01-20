// Simple catch-all middleware for error handling
module.exports = (err, req, res, next) => {
  console.error(err);
  console.log(res);
  res
    .status(500)
    .json({ error: err.toString() });
};