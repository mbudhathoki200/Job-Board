import Joi from "joi";

export const createCompanySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  description: Joi.string().min(10).max(600).required().messages({
    "any.required": "description is required",
    "string.min": "Description Should be at least 10 character long",
    "string.max": "Description Should not exceed 600 characters",
  }),
  website: Joi.string().required().messages({
    "any.required": "website is required",
  }),
}).options({
  stripUnknown: true,
});
