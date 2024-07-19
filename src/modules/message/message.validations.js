import Joi from "joi";

export const messageValidationSchema = Joi.object({
  content: Joi.string().required(),
  receiverId: Joi.string().required(),
});
