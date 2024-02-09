const Joi = require('joi');

exports.putValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    price: Joi.number().required().min(0),
  });

  return schema.validate(data);
};
