const Joi = require("joi");

const create = Joi.object({
  title: Joi.string().min(3).max(2000).required(),
  body: Joi.string().required(),
});

const update = Joi.object({
  title: Joi.string().min(3).max(2000),
  body: Joi.string(),
  isPublished: Joi.any(), // just check for the presence of the field
});

module.exports = {
  create,
  update,
};
