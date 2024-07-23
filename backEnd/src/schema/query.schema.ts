import Joi from "joi";

export const getQuerySchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "Id is required in params",
  }),
}).options({
  stripUnknown: true,
});
