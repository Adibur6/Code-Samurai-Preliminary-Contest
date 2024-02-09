const Joi = require('joi');

exports.bookValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    price: Joi.number().required().min(0),
  });

  return schema.validate(data);
};
