import Joi from "joi";

export const jobBodySchema = Joi.object({
  title: Joi.string().min(3).messages({
    "any.required": "Title is required",
    "string.min": "Title must be atleast 3 characters long",
  }),
  description: Joi.string().min(3).max(600).messages({
    "any.required": "description is required",
    "string.min": "Description must be atleast 3 characters long",
    "string.max": "Description shouldnot exceed 600 characters",
  }),
  requirements: Joi.string().min(3).max(600).messages({
    "any.required": "requirements is required",
    "string.min": "requirements must be atleast 3 characters long",
    "string.max": "requirements shouldnot exceed 600 characters",
  }),
  location: Joi.string().min(3).messages({
    "any.required": "location is required",
    "string.min": "requirement must be atleast 3 characters long",
  }),
  salaryMin: Joi.number().positive().messages({
    "any.required": "salaryMin is required",
    "number.positive": "Salary must be a positive value",
  }),
  salaryMax: Joi.number().positive().messages({
    "any.required": "salaryMax is required",
    "number.positive": "salaryMax be a positive value",
  }),
  expiryDate: Joi.date().iso().messages({
    "date.base": "Expiry date must be a valid date",
    "date.format": "Expiry date must be in ISO 8601(e.g:'2023-04-15) format",
    "date.min": "Expiry date must be in the future",
    "any.required": "Expiry date is required",
  }),
  openings: Joi.string().messages({
    "any.required": "openings is required",
  }),
  experience: Joi.string().min(2).messages({
    "any.required": "experience is required",
    "string.min": "experience should be atleast 2 charactes long",
  }),
  level: Joi.string().min(2).messages({
    "any.required": "level is required",
    "string.min": "level should be atleast 2 charactes long",
  }),
  type: Joi.string().min(2).messages({
    "any.required": "type is required",
    "string.min": "level should be atleast 2 charactes long",
  }),
  companyId: Joi.string().messages({
    "any.required": "companyId is required",
  }),
  categoryId: Joi.string().messages({
    "any.required": "categoryId is required",
  }),
}).options({
  stripUnknown: true,
});

export const getJobQuerySchema = Joi.object({
  title: Joi.string().optional(),
  category: Joi.string().optional(),
  location: Joi.string().optional(),
  type: Joi.string().optional(),
  salary: Joi.string().optional(),
  page: Joi.number()
    .min(1)
    .optional()
    .messages({
      "number.base": "Page must be a number",
      "number.min": "Size must be greater than or equal to 1",
    })
    .default(1),
  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "Size must be a number",
      "number.min": "Size must be greater than or equal to 1",
      "number.max": "Size must be less than or equal to 10",
    })
    .default(10),
}).options({
  stripUnknown: true,
});

export const updateJobBodySchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.min": "Title must be atleast 3 characters long",
  }),
  description: Joi.string().min(3).max(600).optional().messages({
    "string.min": "Description must be atleast 3 characters long",
    "string.max": "Description shouldnot exceed 600 characters",
  }),
  requirements: Joi.string().min(3).max(600).optional().messages({
    "string.min": "requirements must be atleast 3 characters long",
    "string.max": "requirements shouldnot exceed 600 characters",
  }),
  location: Joi.string().min(3).optional().messages({
    "string.min": "requirement must be atleast 3 characters long",
  }),
  salaryMin: Joi.number().positive().optional().messages({
    "number.positive": "Salary must be a positive value",
  }),
  salaryMax: Joi.number().positive().optional().messages({
    "number.positive": "salaryMax be a positive value",
  }),

  expiryDate: Joi.date().iso().optional().messages({
    "date.base": "Expiry date must be a valid date",
    "date.format": "Expiry date must be in ISO 8601(e.g:'2023-04-15) format",
    "date.min": "Expiry date must be in the future",
  }),
  openings: Joi.string().optional().messages({
    "any.required": "openings is required",
  }),
  experience: Joi.string().min(2).optional().messages({
    "string.min": "experience should be atleast 2 charactes long",
  }),
  level: Joi.string().min(2).optional().messages({
    "string.min": "level should be atleast 2 charactes long",
  }),
  type: Joi.string().min(2).required().messages({
    "any.required": "type is required",
    "string.min": "level should be atleast 2 charactes long",
  }),
  companyId: Joi.string().optional(),
  categoryId: Joi.string().optional(),
}).options({
  stripUnknown: true,
});
