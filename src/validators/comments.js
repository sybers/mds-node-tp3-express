const Joi = require("joi");

const create = Joi.object({
  content: Joi.string().required(),
});

module.exports = {
  create,
};
