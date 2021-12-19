function validate(schema) {
  return (req, _res, next) => {
    req.validation = {};
    schema
      .validateAsync(req.body, { abortEarly: false })
      .then((value) => (req.validation = { isValid: true, value }))
      .catch((error) => (req.validation.errors = error))
      .finally(next);
  };
}

module.exports = validate;
