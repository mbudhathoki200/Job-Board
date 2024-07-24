import Joi from "joi";

export const jobBodySchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "any.required": "Title is required",
    "string.min": "Title must be atleast 3 characters long",
  }),
  description: Joi.string().min(3).max(600).required().messages({
    "any.required": "description is required",
    "string.min": "Description must be atleast 3 characters long",
    "string.max": "Description shouldnot exceed 600 characters",
  }),
  requirements: Joi.string().min(3).max(600).required().messages({
    "any.required": "requirements is required",
    "string.min": "requirements must be atleast 3 characters long",
    "string.max": "requirements shouldnot exceed 600 characters",
  }),
  location: Joi.string().min(3).required().messages({
    "any.required": "location is required",
    "string.min": "requirement must be atleast 3 characters long",
  }),
  salaryMin: Joi.number().positive().required().messages({
    "any.required": "salaryMin is required",
    "number.positive": "Salary must be a positive value",
  }),
  salaryMax: Joi.number().positive().required().messages({
    "any.required": "salaryMax is required",
    "number.positive": "salaryMax be a positive value",
  }),
  postDate: Joi.date().iso().required().messages({
    "date.base": "Post date must be a valid date",
    "date.format": "Post date must be in ISO 8601 format(e.g:'2023-04-15)",
    "date.min": "Post date cannot be in the past",
    "any.required": "Post date is required",
  }),
  expiryDate: Joi.date().iso().required().messages({
    "date.base": "Expiry date must be a valid date",
    "date.format": "Expiry date must be in ISO 8601(e.g:'2023-04-15) format",
    "date.min": "Expiry date must be in the future",
    "any.required": "Expiry date is required",
  }),
  openings: Joi.string().required().messages({
    "any.required": "openings is required",
  }),
  experience: Joi.string().min(2).required().messages({
    "any.required": "experience is required",
    "string.min": "experience should be atleast 2 charactes long",
  }),
  level: Joi.string().min(2).required().messages({
    "any.required": "level is required",
    "string.min": "level should be atleast 2 charactes long",
  }),
  companyId: Joi.string().required().messages({
    "any.required": "companyId is required",
  }),
  categoryId: Joi.string().required().messages({
    "any.required": "categoryId is required",
  }),
}).options({
  stripUnknown: true,
});
