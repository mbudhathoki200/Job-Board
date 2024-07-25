import { Schema } from "joi";

export function validateForm(formData: any, schema: Schema) {
  const { error } = schema.validate(formData, { abortEarly: false });
  return error ? error.details : null;
}
