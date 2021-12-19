function validate(schema) {
  return async (req, _res, next) => {
    try {
      req.validation = {};
      const value = await schema.validateAsync(req.body, { abortEarly: false });
      req.validation = { isValid: true, value };
    } catch (error) {
      req.validation.errors = error;
    } finally {
      next();
    }
  };
}

module.exports = validate;
