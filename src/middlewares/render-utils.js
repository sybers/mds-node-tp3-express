function truncate(str, n) {
  if (str.length <= n) return str;
  return `${str.substr(0, n - 1)}...`;
}

function renderUtils(req, res, next) {
  res.locals.truncate = truncate;
  next();
}

module.exports = renderUtils;
