import Joi from "joi";

export const createCompanySchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.min": "Name link Should be at least 3 character long",
  }),
  description: Joi.string().min(10).max(600).messages({
    "string.min": "Description Should be at least 10 character long",
    "string.max": "Description Should not exceed 600 characters",
  }),
  website: Joi.string().min(5).messages({
    "string.min": "website link Should be at least 5 character long",
  }),
}).options({
  stripUnknown: true,
});
