import Joi from "joi";

export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.min": "Password must be atleast 8 characters long.",
      "password.uppercase":
        "password must contain atleast one uppercase character",
      "password.lowecase":
        "password must contain atlease one lowercase character",
      "password.special":
        "password must contain atleast one special character(!@#$%)",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
  permissions: Joi.string().optional(),
}).options({
  stripUnknown: true,
});

export const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "email must be in valid format",
    "any.required": "email is required",
  }),

  password: Joi.string().required().messages({
    "any.required": "password is required",
  }),
}).options({
  stripUnknown: true,
});

export const RefreshSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "refreshToken is required",
  }),
});
