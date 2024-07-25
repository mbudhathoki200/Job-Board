import Joi from "joi";

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "email must be in valid format",
      "any.required": "email is required",
    }),

  password: Joi.string().required().messages({
    "any.required": "password is required",
  }),
}).options({
  stripUnknown: true,
});
