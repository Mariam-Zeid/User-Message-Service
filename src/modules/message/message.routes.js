import { Router } from "express";
import { validate } from "../../middlewares/validation.js";
import { messageValidationSchema } from "./message.validations.js";
import { auth } from "../../middlewares/auth.middlewares.js";
import {
  deleteMessage,
  getMessages,
  sendMessage,
} from "./message.controllers.js";

const messageRouter = Router();

messageRouter
  .route("/")
  .all(auth)
  .get(getMessages)
  .post(validate(messageValidationSchema), sendMessage);

messageRouter.route("/:messageId").all(auth).delete(deleteMessage);
export default messageRouter;
